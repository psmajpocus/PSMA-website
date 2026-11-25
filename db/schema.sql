-- 特集記事のコメント・いいね用テーブル
-- lib/engagement/db.ts が初回アクセス時に同じ内容を自動実行します（手動実行も可）。

CREATE TABLE IF NOT EXISTS article_comments (
  id                BIGSERIAL PRIMARY KEY,
  article_id        TEXT        NOT NULL,
  author_name       TEXT,                     -- NULL のときは「匿名」と表示
  body              TEXT        NOT NULL,
  status            TEXT        NOT NULL CHECK (status IN ('published', 'pending', 'rejected')),
  moderation_source TEXT,                     -- 'ai' | 'wordlist' | 'fallback' | 'admin'
  moderation_reason TEXT,
  ip_hash           TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at       TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS article_comments_article_idx
  ON article_comments (article_id, status, created_at);

CREATE INDEX IF NOT EXISTS article_comments_ip_idx
  ON article_comments (ip_hash, created_at);

CREATE TABLE IF NOT EXISTS article_likes (
  article_id TEXT        NOT NULL,
  visitor_id TEXT        NOT NULL,
  ip_hash    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (article_id, visitor_id)
);

CREATE INDEX IF NOT EXISTS article_likes_ip_idx
  ON article_likes (ip_hash, created_at);
