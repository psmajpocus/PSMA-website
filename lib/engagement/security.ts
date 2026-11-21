import { createHash, createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.ENGAGEMENT_SECRET ?? process.env.ADMIN_PASSWORD ?? 'psma-dev-secret';

/** IP アドレスはそのまま保存せず、ハッシュ化して連投制限にだけ使う */
export function hashIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return createHash('sha256').update(`${SECRET}:${ip}`).digest('hex').slice(0, 32);
}

export const ADMIN_COOKIE = 'psma_admin';

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function adminSessionValue() {
  return createHmac('sha256', SECRET).update(`admin:${process.env.ADMIN_PASSWORD ?? ''}`).digest('hex');
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAdminRequest(cookieValue: string | undefined) {
  return isAdminConfigured() && !!cookieValue && safeEqual(cookieValue, adminSessionValue());
}

/** 記事IDは content/articles のファイル名と同じ形式だけ受け付ける */
export function isValidArticleId(id: string) {
  return /^[a-z0-9][a-z0-9-]{0,99}$/.test(id);
}
