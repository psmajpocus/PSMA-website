import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Vercel の Neon 連携は DATABASE_URL（または POSTGRES_URL）を自動で設定します。
const DATABASE_URL = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

let client: NeonQueryFunction<false, false> | null = null;

export function isDbConfigured() {
  return Boolean(DATABASE_URL);
}

export function getSql() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  client ??= neon(DATABASE_URL);
  return client;
}

// db/schema.sql と同じ内容。初回アクセス時に一度だけ実行します。
const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS article_comments (
    id                BIGSERIAL PRIMARY KEY,
    article_id        TEXT        NOT NULL,
    author_name       TEXT,
    body              TEXT        NOT NULL,
    status            TEXT        NOT NULL CHECK (status IN ('published', 'pending', 'rejected')),
    moderation_source TEXT,
    moderation_reason TEXT,
    ip_hash           TEXT,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    reviewed_at       TIMESTAMPTZ
  )`,
  `CREATE INDEX IF NOT EXISTS article_comments_article_idx
    ON article_comments (article_id, status, created_at)`,
  `CREATE INDEX IF NOT EXISTS article_comments_ip_idx
    ON article_comments (ip_hash, created_at)`,
  `CREATE TABLE IF NOT EXISTS article_likes (
    article_id TEXT        NOT NULL,
    visitor_id TEXT        NOT NULL,
    ip_hash    TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (article_id, visitor_id)
  )`,
  `CREATE INDEX IF NOT EXISTS article_likes_ip_idx
    ON article_likes (ip_hash, created_at)`,
];

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
  schemaReady ??= (async () => {
    const sql = getSql();
    for (const stmt of SCHEMA_STATEMENTS) {
      await sql.query(stmt);
    }
  })().catch((err) => {
    schemaReady = null; // 次のリクエストで再試行
    throw err;
  });
  return schemaReady;
}

export type CommentStatus = 'published' | 'pending' | 'rejected';

export type CommentRow = {
  id: string;
  article_id: string;
  author_name: string | null;
  body: string;
  status: CommentStatus;
  moderation_source: string | null;
  moderation_reason: string | null;
  created_at: string;
};
