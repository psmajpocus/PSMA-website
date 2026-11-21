import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// ── 型定義 ────────────────────────────────────────────────

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title_ja: string;
  title_en: string;
  excerpt_ja: string;
  excerpt_en: string;
  body_ja: string;
  body_en: string;
  category: ('interview' | 'report' | 'tips' | 'news')[];
  thumbnail?: { url: string; width: number; height: number };
};

export type Organization = {
  id: string;
  name_ja: string;
  name_en: string;
  organization_ja: string;
  organization_en: string;
  prefecture: string;
  lat: number;
  lng: number;
  description_ja?: string;
  description_en?: string;
  photo?: { url: string };
};

export type Event = {
  id: string;
  title_ja: string;
  title_en: string;
  date: string;
  type: ('seminar' | 'workshop' | 'conference' | 'other')[];
  status: ('upcoming' | 'past')[];
  description_ja?: string;
  description_en?: string;
  thumbnail?: { url: string; width: number; height: number };
};

// ── データ取得関数 ────────────────────────────────────────

export async function getArticles(limit = 10) {
  return client.getList<Article>({
    endpoint: 'articles',
    queries: { limit, orders: '-publishedAt' },
  });
}

export async function getArticle(id: string) {
  return client.get<Article>({ endpoint: 'articles', contentId: id });
}

export async function getEvent(id: string) {
  return client.get<Event>({ endpoint: 'events', contentId: id });
}

export async function getOrganizations() {
  return client.getList<Organization>({
    endpoint: 'organizations',
    queries: { limit: 100 },
  });
}

export async function getEvents(status?: 'upcoming' | 'past') {
  return client.getList<Event>({
    endpoint: 'events',
    queries: {
      limit: 100,
      filters: status ? `status[contains]${status}` : undefined,
      orders: status === 'upcoming' ? 'date' : '-date',
    },
  });
}
