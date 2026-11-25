'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/LangContext';

type Comment = { id: string; name: string | null; body: string; createdAt: string };

const TEXT = {
  ja: {
    like: 'この記事にいいね',
    unlike: 'いいねを取り消す',
    likes: (n: number) => `${n}人がいいねしました`,
    comments: 'コメント',
    empty: 'まだコメントはありません。最初のコメントを書いてみませんか？',
    anonymous: '匿名',
    name: 'お名前（任意）',
    namePlaceholder: '空欄の場合は「匿名」と表示されます',
    body: 'コメント',
    bodyPlaceholder: '記事の感想や質問などをお寄せください',
    submit: 'コメントを投稿',
    sending: '送信中…',
    published: 'コメントを投稿しました。',
    pending: 'コメントを受け付けました。内容を確認したあとに表示されます。',
    rejected: 'このコメントは投稿できませんでした。他の方への攻撃や誹謗中傷にあたる表現がないか見直してください。',
    rateLimited: '短時間に続けて投稿されています。少し時間をおいてからお試しください。',
    error: '送信に失敗しました。時間をおいて再度お試しください。',
    note: '投稿されたコメントは自動チェックを行い、必要に応じて管理者が確認してから公開します。',
  },
  en: {
    like: 'Like this article',
    unlike: 'Remove like',
    likes: (n: number) => `${n} ${n === 1 ? 'person likes' : 'people like'} this`,
    comments: 'Comments',
    empty: 'No comments yet. Be the first to leave one.',
    anonymous: 'Anonymous',
    name: 'Name (optional)',
    namePlaceholder: 'Shown as “Anonymous” if left blank',
    body: 'Comment',
    bodyPlaceholder: 'Share your thoughts or questions about this article',
    submit: 'Post comment',
    sending: 'Sending…',
    published: 'Your comment has been posted.',
    pending: 'Thanks! Your comment will appear after review.',
    rejected: 'This comment could not be posted. Please make sure it does not attack or defame anyone.',
    rateLimited: 'You are posting too quickly. Please wait a moment and try again.',
    error: 'Something went wrong. Please try again later.',
    note: 'Comments are checked automatically and may be reviewed by an administrator before they appear.',
  },
};

const MAX_NAME = 30;
const MAX_BODY = 1000;

export default function ArticleEngagement({ articleId }: { articleId: string }) {
  const { lang } = useLang();
  const tx = TEXT[lang];

  const [enabled, setEnabled] = useState(true);
  const [likes, setLikes] = useState<{ count: number; liked: boolean } | null>(null);
  const [likeBusy, setLikeBusy] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [website, setWebsite] = useState(''); // ボット対策（非表示）
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'warn' | 'error'; text: string } | null>(null);

  const base = `/api/articles/${encodeURIComponent(articleId)}`;

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${base}/likes`, { cache: 'no-store' }).then((r) => r.json()),
      fetch(`${base}/comments`, { cache: 'no-store' }).then((r) => r.json()),
    ])
      .then(([l, c]) => {
        if (cancelled) return;
        if (l.enabled === false || c.enabled === false || l.error || c.error) {
          setEnabled(false);
          return;
        }
        setLikes({ count: l.count ?? 0, liked: !!l.liked });
        setComments(c.comments ?? []);
      })
      .catch(() => {
        if (!cancelled) setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base]);

  async function toggleLike() {
    if (!likes || likeBusy) return;
    setLikeBusy(true);
    // 押した直後に表示を変える（失敗したら戻す）
    const prev = likes;
    setLikes({ count: prev.count + (prev.liked ? -1 : 1), liked: !prev.liked });
    try {
      const res = await fetch(`${base}/likes`, { method: 'POST' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLikes({ count: data.count, liked: data.liked });
    } catch {
      setLikes(prev);
    } finally {
      setLikeBusy(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    setNotice(null);
    try {
      const res = await fetch(`${base}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, body, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) {
        setNotice({ kind: 'error', text: tx.rateLimited });
      } else if (data.status === 'published' && data.comment) {
        setComments((cs) => [...cs, data.comment]);
        setBody('');
        setNotice({ kind: 'ok', text: tx.published });
      } else if (data.status === 'pending') {
        setBody('');
        setNotice({ kind: 'warn', text: tx.pending });
      } else if (data.status === 'rejected') {
        setNotice({ kind: 'error', text: tx.rejected });
      } else {
        setNotice({ kind: 'error', text: tx.error });
      }
    } catch {
      setNotice({ kind: 'error', text: tx.error });
    } finally {
      setSending(false);
    }
  }

  if (!enabled) return null;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  return (
    <section className="max-w-2xl mx-auto px-6 lg:px-8 pb-16" aria-label={tx.comments}>
      {/* いいね */}
      <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
        <button
          type="button"
          onClick={toggleLike}
          disabled={!likes || likeBusy}
          aria-pressed={likes?.liked ?? false}
          aria-label={likes?.liked ? tx.unlike : tx.like}
          className={`group inline-flex items-center justify-center w-12 h-12 rounded-full border transition-colors disabled:opacity-60 ${
            likes?.liked
              ? 'border-rose-200 bg-rose-50 text-rose-500'
              : 'border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-500'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 transition-transform group-active:scale-90"
            fill={likes?.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        <p className="text-sm text-slate-500" aria-live="polite">
          {likes ? tx.likes(likes.count) : ' '}
        </p>
      </div>

      {/* コメント一覧 */}
      <h2 className="mt-12 text-[11px] tracking-[0.25em] uppercase font-bold text-slate-900">
        {tx.comments}{comments.length > 0 && <span className="ml-2 text-slate-400">{comments.length}</span>}
      </h2>
      <ul className="mt-6 space-y-6">
        {comments.length === 0 && <li className="text-sm text-slate-400">{tx.empty}</li>}
        {comments.map((c) => (
          <li key={c.id} className="border-l-2 border-slate-100 pl-4">
            <p className="text-xs text-slate-500">
              <span className="font-bold text-slate-700">{c.name ?? tx.anonymous}</span>
              <span className="mx-2">·</span>
              <time dateTime={c.createdAt}>{formatDate(c.createdAt)}</time>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap break-words">{c.body}</p>
          </li>
        ))}
      </ul>

      {/* 投稿フォーム */}
      <form onSubmit={submit} className="mt-10 space-y-4 bg-slate-50 border border-slate-100 rounded-sm p-5">
        <div>
          <label htmlFor="comment-name" className="block text-xs font-bold text-slate-700 mb-1">{tx.name}</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            maxLength={MAX_NAME}
            onChange={(e) => setName(e.target.value)}
            placeholder={tx.namePlaceholder}
            className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
          />
        </div>
        <div>
          <label htmlFor="comment-body" className="block text-xs font-bold text-slate-700 mb-1">{tx.body}</label>
          <textarea
            id="comment-body"
            value={body}
            required
            rows={4}
            maxLength={MAX_BODY}
            onChange={(e) => setBody(e.target.value)}
            placeholder={tx.bodyPlaceholder}
            className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed focus:outline-none focus:border-slate-400"
          />
          <p className="mt-1 text-right text-[11px] text-slate-400">{body.length} / {MAX_BODY}</p>
        </div>
        {/* ボット対策：人には見えない欄 */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
        </div>
        {notice && (
          <p role="status" className={`text-sm ${notice.kind === 'ok' ? 'text-emerald-700' : notice.kind === 'warn' ? 'text-amber-700' : 'text-rose-700'}`}>
            {notice.text}
          </p>
        )}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-slate-400 leading-relaxed">{tx.note}</p>
          <button
            type="submit"
            disabled={sending || !body.trim()}
            className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white text-[11px] tracking-widest uppercase font-bold rounded-sm hover:bg-slate-700 transition-colors disabled:opacity-40"
          >
            {sending ? tx.sending : tx.submit}
          </button>
        </div>
      </form>
    </section>
  );
}
