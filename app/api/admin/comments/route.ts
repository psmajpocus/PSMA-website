import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { ensureSchema, getSql, isDbConfigured, type CommentRow } from '@/lib/engagement/db';
import {
  ADMIN_COOKIE,
  adminSessionValue,
  isAdminConfigured,
  isAdminRequest,
  safeEqual,
} from '@/lib/engagement/security';

/**
 * コメント管理ページ（/api/admin/comments）
 * ADMIN_PASSWORD を設定するとログインできます。保留中のコメントを承認・拒否・削除できます。
 */

const esc = (s: string | null | undefined) =>
  (s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const STATUS_LABEL: Record<string, string> = { pending: '保留中', published: '公開中', rejected: '拒否' };

function page(content: string, status = 200) {
  return new Response(
    `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>コメント管理 | PSMA</title>
<style>
body{font-family:system-ui,-apple-system,"Hiragino Sans",sans-serif;background:#f8fafc;color:#0f172a;margin:0;padding:24px 16px}
main{max-width:860px;margin:0 auto}h1{font-size:20px}h2{font-size:16px;margin-top:32px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:14px 16px;margin:10px 0}
.meta{font-size:12px;color:#64748b;margin-bottom:6px}.body{white-space:pre-wrap;word-break:break-word;font-size:14px}
.reason{font-size:12px;color:#b45309;margin-top:6px}.actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
button{font:inherit;font-size:13px;padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer}
.ok{background:#0f172a;color:#fff;border-color:#0f172a}.ng{color:#b91c1c;border-color:#fecaca}
input[type=password]{font:inherit;padding:8px;border:1px solid #cbd5e1;border-radius:4px;width:240px}
.badge{display:inline-block;font-size:11px;padding:1px 6px;border-radius:3px;background:#e2e8f0;margin-right:6px}
</style></head><body><main>${content}</main></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );
}

function loginPage(message = '') {
  return page(`<h1>コメント管理</h1>
${message ? `<p style="color:#b91c1c">${esc(message)}</p>` : ''}
<form method="post"><input type="hidden" name="action" value="login">
<input type="password" name="password" placeholder="管理パスワード" autofocus required>
<button class="ok" type="submit">ログイン</button></form>`);
}

function commentCard(c: CommentRow) {
  const actions: string[] = [];
  if (c.status !== 'published') actions.push(`<button class="ok" name="action" value="approve">承認して公開</button>`);
  if (c.status === 'published') actions.push(`<button name="action" value="hide">非公開にする</button>`);
  if (c.status === 'pending') actions.push(`<button name="action" value="reject">拒否</button>`);
  actions.push(`<button class="ng" name="action" value="delete">削除</button>`);
  return `<div class="card">
<div class="meta"><span class="badge">${STATUS_LABEL[c.status] ?? c.status}</span>
${esc(new Date(c.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }))} ・ 記事: <a href="/articles/${esc(c.article_id)}">${esc(c.article_id)}</a> ・ ${esc(c.author_name ?? '匿名')}</div>
<div class="body">${esc(c.body)}</div>
${c.moderation_reason ? `<div class="reason">判定（${esc(c.moderation_source)}）: ${esc(c.moderation_reason)}</div>` : ''}
<form method="post" class="actions"><input type="hidden" name="id" value="${esc(String(c.id))}">${actions.join('')}</form>
</div>`;
}

export async function GET() {
  if (!isAdminConfigured()) return page('<h1>コメント管理</h1><p>ADMIN_PASSWORD が設定されていません。</p>', 503);
  if (!isDbConfigured()) return page('<h1>コメント管理</h1><p>データベース（DATABASE_URL）が設定されていません。</p>', 503);
  if (!isAdminRequest((await cookies()).get(ADMIN_COOKIE)?.value)) return loginPage();

  await ensureSchema();
  const sql = getSql();
  const pending = (await sql`
    SELECT * FROM article_comments WHERE status = 'pending' ORDER BY created_at ASC LIMIT 200
  `) as CommentRow[];
  const recent = (await sql`
    SELECT * FROM article_comments WHERE status <> 'pending' ORDER BY created_at DESC LIMIT 50
  `) as CommentRow[];

  return page(`<h1>コメント管理</h1>
<h2>承認待ち（${pending.length}件）</h2>
${pending.length ? pending.map(commentCard).join('') : '<p>承認待ちのコメントはありません。</p>'}
<h2>最近のコメント</h2>
${recent.map(commentCard).join('')}
<form method="post" style="margin-top:32px"><button name="action" value="logout">ログアウト</button></form>`);
}

export async function POST(req: NextRequest) {
  if (!isAdminConfigured() || !isDbConfigured()) return GET();

  // 別サイトからのフォーム送信を防ぐ
  const origin = req.headers.get('origin');
  if (origin && origin !== req.nextUrl.origin) return page('<p>不正なリクエストです。</p>', 403);

  const form = await req.formData();
  const action = String(form.get('action') ?? '');
  const cookieStore = await cookies();
  const back = () => Response.redirect(new URL('/api/admin/comments', req.nextUrl.origin), 303);

  if (action === 'login') {
    const password = String(form.get('password') ?? '');
    if (!safeEqual(password, process.env.ADMIN_PASSWORD!)) {
      await new Promise((r) => setTimeout(r, 800));
      return loginPage('パスワードが違います。');
    }
    cookieStore.set(ADMIN_COOKIE, adminSessionValue(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 14,
      path: '/api/admin',
    });
    return back();
  }

  if (!isAdminRequest(cookieStore.get(ADMIN_COOKIE)?.value)) return loginPage();

  if (action === 'logout') {
    cookieStore.delete({ name: ADMIN_COOKIE, path: '/api/admin' });
    return back();
  }

  const id = String(form.get('id') ?? '');
  if (!/^\d+$/.test(id)) return back();
  await ensureSchema();
  const sql = getSql();

  if (action === 'approve') {
    await sql`UPDATE article_comments SET status = 'published', moderation_source = 'admin', reviewed_at = now() WHERE id = ${id}`;
  } else if (action === 'reject' || action === 'hide') {
    await sql`UPDATE article_comments SET status = 'rejected', moderation_source = 'admin', reviewed_at = now() WHERE id = ${id}`;
  } else if (action === 'delete') {
    await sql`DELETE FROM article_comments WHERE id = ${id}`;
  }
  return back();
}
