import { after, type NextRequest } from 'next/server';
import { getArticle } from '@/lib/localArticles';
import { ensureSchema, getSql, isDbConfigured, type CommentRow } from '@/lib/engagement/db';
import { moderateComment } from '@/lib/engagement/moderation';
import { notifyModeration } from '@/lib/engagement/notify';
import { hashIp, isValidArticleId } from '@/lib/engagement/security';

const MAX_NAME = 30;
const MAX_BODY = 1000;

type PublicComment = { id: string; name: string | null; body: string; createdAt: string };

function toPublic(row: Pick<CommentRow, 'id' | 'author_name' | 'body' | 'created_at'>): PublicComment {
  return { id: String(row.id), name: row.author_name, body: row.body, createdAt: new Date(row.created_at).toISOString() };
}

async function findArticle(id: string) {
  if (!isValidArticleId(id)) return null;
  return getArticle(id).catch(() => null);
}

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/articles/[id]/comments'>) {
  const { id } = await ctx.params;
  if (!isDbConfigured()) return Response.json({ comments: [], enabled: false });
  if (!(await findArticle(id))) return Response.json({ error: 'not_found' }, { status: 404 });

  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, author_name, body, created_at FROM article_comments
    WHERE article_id = ${id} AND status = 'published'
    ORDER BY created_at ASC LIMIT 300
  `) as CommentRow[];
  return Response.json({ comments: rows.map(toPublic), enabled: true });
}

export async function POST(req: NextRequest, ctx: RouteContext<'/api/articles/[id]/comments'>) {
  const { id } = await ctx.params;
  if (!isDbConfigured()) return Response.json({ error: 'disabled' }, { status: 503 });
  const article = await findArticle(id);
  if (!article) return Response.json({ error: 'not_found' }, { status: 404 });

  let payload: { name?: unknown; body?: unknown; website?: unknown };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  // ボット対策のダミー欄（人には見えない）。入力されていたら成功したふりをして捨てる
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return Response.json({ status: 'pending' });
  }

  const rawName = typeof payload.name === 'string' ? payload.name.normalize('NFKC').trim() : '';
  const body = typeof payload.body === 'string' ? payload.body.trim() : '';
  const name = rawName === '' || rawName === '匿名' ? null : rawName;

  if (body.length === 0) return Response.json({ error: 'empty_body' }, { status: 400 });
  if (body.length > MAX_BODY) return Response.json({ error: 'body_too_long', max: MAX_BODY }, { status: 400 });
  if (name && name.length > MAX_NAME) return Response.json({ error: 'name_too_long', max: MAX_NAME }, { status: 400 });

  await ensureSchema();
  const sql = getSql();
  const ipHash = hashIp(req);

  const [recent] = (await sql`
    SELECT
      count(*) FILTER (WHERE created_at > now() - interval '30 seconds') AS last_30s,
      count(*) FILTER (WHERE created_at > now() - interval '1 day') AS last_day
    FROM article_comments WHERE ip_hash = ${ipHash}
  `) as { last_30s: string; last_day: string }[];
  if (Number(recent.last_30s) >= 1 || Number(recent.last_day) >= 30) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  const moderation = await moderateComment({ authorName: name, body, articleTitle: article.title_ja });
  const status = moderation.decision === 'publish' ? 'published' : moderation.decision === 'review' ? 'pending' : 'rejected';

  const [row] = (await sql`
    INSERT INTO article_comments (article_id, author_name, body, status, moderation_source, moderation_reason, ip_hash)
    VALUES (${id}, ${name}, ${body}, ${status}, ${moderation.source}, ${moderation.reason}, ${ipHash})
    RETURNING id, author_name, body, created_at
  `) as CommentRow[];

  if (status !== 'published') {
    const siteUrl = process.env.SITE_URL ?? req.nextUrl.origin;
    after(() =>
      notifyModeration({
        commentId: String(row.id),
        articleId: id,
        articleTitle: article.title_ja,
        authorName: name,
        body,
        status,
        moderation,
        siteUrl,
      }),
    );
  }

  if (status === 'rejected') return Response.json({ status }, { status: 422 });
  if (status === 'pending') return Response.json({ status });
  return Response.json({ status, comment: toPublic(row) }, { status: 201 });
}
