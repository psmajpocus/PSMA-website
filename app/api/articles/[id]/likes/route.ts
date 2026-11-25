import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { getArticle } from '@/lib/localArticles';
import { ensureSchema, getSql, isDbConfigured } from '@/lib/engagement/db';
import { hashIp, isValidArticleId } from '@/lib/engagement/security';

const VISITOR_COOKIE = 'psma_vid';

async function articleExists(id: string) {
  return isValidArticleId(id) && (await getArticle(id).then(() => true).catch(() => false));
}

async function countLikes(id: string, visitorId: string | undefined) {
  const sql = getSql();
  const [row] = (await sql`
    SELECT count(*) AS count,
           bool_or(visitor_id = ${visitorId ?? ''}) AS liked
    FROM article_likes WHERE article_id = ${id}
  `) as { count: string; liked: boolean | null }[];
  return { count: Number(row.count), liked: Boolean(row.liked) };
}

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/articles/[id]/likes'>) {
  const { id } = await ctx.params;
  if (!isDbConfigured()) return Response.json({ count: 0, liked: false, enabled: false });
  if (!(await articleExists(id))) return Response.json({ error: 'not_found' }, { status: 404 });
  await ensureSchema();
  const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
  return Response.json({ ...(await countLikes(id, visitorId)), enabled: true });
}

/** ハートを押す／取り消す（同じブラウザからは1記事1回まで） */
export async function POST(req: NextRequest, ctx: RouteContext<'/api/articles/[id]/likes'>) {
  const { id } = await ctx.params;
  if (!isDbConfigured()) return Response.json({ error: 'disabled' }, { status: 503 });
  if (!(await articleExists(id))) return Response.json({ error: 'not_found' }, { status: 404 });
  await ensureSchema();

  const cookieStore = await cookies();
  let visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
  if (!visitorId || !/^[0-9a-f-]{36}$/.test(visitorId)) {
    visitorId = randomUUID();
    cookieStore.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365 * 2,
      path: '/',
    });
  }

  const sql = getSql();
  const ipHash = hashIp(req);

  const removed = (await sql`
    DELETE FROM article_likes WHERE article_id = ${id} AND visitor_id = ${visitorId} RETURNING 1
  `) as unknown[];

  if (removed.length === 0) {
    // 同じ回線からの極端な連打を防ぐ（Cookie を消して押し直すケース対策）
    const [recent] = (await sql`
      SELECT count(*) AS n FROM article_likes
      WHERE ip_hash = ${ipHash} AND article_id = ${id} AND created_at > now() - interval '1 hour'
    `) as { n: string }[];
    if (Number(recent.n) >= 20) {
      return Response.json({ error: 'rate_limited' }, { status: 429 });
    }
    await sql`
      INSERT INTO article_likes (article_id, visitor_id, ip_hash) VALUES (${id}, ${visitorId}, ${ipHash})
      ON CONFLICT DO NOTHING
    `;
  }

  return Response.json(await countLikes(id, visitorId));
}
