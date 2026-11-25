import type { ModerationResult } from './moderation';

/**
 * 管理者への通知。
 * NOTIFY_WEBHOOK_URL に Slack の Incoming Webhook か Discord の Webhook の URL を設定してください。
 * 未設定のときはサーバーログに出すだけです。
 */
export async function notifyModeration(input: {
  commentId: string;
  articleId: string;
  articleTitle: string;
  authorName: string | null;
  body: string;
  status: 'pending' | 'rejected';
  moderation: ModerationResult;
  siteUrl: string;
}) {
  const label = input.status === 'pending' ? '⚠️ 保留中のコメントがあります（承認待ち）' : '⛔ コメントを拒否しました';
  const excerpt = input.body.length > 300 ? `${input.body.slice(0, 300)}…` : input.body;
  const lines = [
    `${label}`,
    `記事: ${input.articleTitle}`,
    `投稿者: ${input.authorName ?? '匿名'}`,
    `判定理由: ${input.moderation.reason || '（なし）'}`,
    input.moderation.wordlistHits.length ? `ワードリスト: ${input.moderation.wordlistHits.join('、')}` : null,
    '',
    excerpt,
    '',
    `確認ページ: ${input.siteUrl}/api/admin/comments`,
  ].filter((l) => l !== null);
  const text = lines.join('\n');

  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) {
    console.warn('[notify] NOTIFY_WEBHOOK_URL is not set\n' + text);
    return;
  }

  const isDiscord = /discord(app)?\.com\/api\/webhooks/.test(url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isDiscord ? { content: text.slice(0, 1900) } : { text }),
    });
    if (!res.ok) console.error('[notify] webhook failed', res.status, await res.text());
  } catch (err) {
    console.error('[notify] webhook error', err);
  }
}
