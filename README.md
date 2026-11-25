This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 特集記事のコメント・いいね

各特集記事（`/articles/[id]`）の下に、ハート（いいね）とコメント欄が表示されます。

### 必要な環境変数（Vercel の Project Settings → Environment Variables）

| 変数 | 必須 | 内容 |
| --- | --- | --- |
| `DATABASE_URL` | ○ | Postgres の接続文字列。Vercel の Storage から Neon を追加すると自動で設定されます。未設定のときはコメント欄・ハートは表示されません。 |
| `ADMIN_PASSWORD` | ○ | コメント管理ページ（`/api/admin/comments`）のログインパスワード。 |
| `ANTHROPIC_API_KEY` | 推奨 | AI（Claude）による文脈判定に使います。未設定のときはワードリストだけで判定します。 |
| `NOTIFY_WEBHOOK_URL` | 推奨 | 保留・拒否のコメントを通知する Slack / Discord の Webhook URL。 |
| `ENGAGEMENT_SECRET` | 任意 | IP アドレスのハッシュ化などに使う秘密の文字列。未設定のときは `ADMIN_PASSWORD` を使います。 |
| `SITE_URL` | 任意 | 通知に載せる管理ページの URL のベース（例: `https://example.com`）。 |
| `MODERATION_MODEL` | 任意 | 判定に使う Claude のモデル。既定は `claude-opus-5-5`。 |

テーブルは初回アクセス時に自動で作られます（内容は `db/schema.sql`）。

### コメントのチェックの流れ

医療系サイトなので「死」「死亡」「脳死」などの単語だけでは弾きません（`lib/engagement/moderation.ts`）。

1. ワードリストで、相手に向けた攻撃表現（「死ね」「殺すぞ」「消えろ」など）、侮辱語、URL を検出します。
2. AI が「医療系サイトである」ことを前提に文脈で判定し、**公開** / **保留**（管理者が確認） / **拒否** に分けます。
3. 攻撃表現に当たったものは AI が問題なしと判定しても保留にします。AI の呼び出しに失敗したときも保留にします。
4. 保留・拒否になったコメントは `NOTIFY_WEBHOOK_URL` に通知され、`/api/admin/comments` で承認・拒否・削除できます。

いいねはブラウザごと（Cookie）に1記事1回で、もう一度押すと取り消せます。
