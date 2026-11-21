import fs from 'fs';
import path from 'path';
import type { Article } from './microcms';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

function readArticle(filename: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf-8');
  return JSON.parse(raw) as Article;
}

function getAllArticles(): Article[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.json'));
  return files
    .map((f) => readArticle(f))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticles(limit = 10): Promise<{ contents: Article[]; totalCount: number }> {
  const all = getAllArticles();
  const contents = all.slice(0, limit);
  return { contents, totalCount: all.length };
}

export async function getArticle(id: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) throw new Error(`Article not found: ${id}`);
  return readArticle(`${id}.json`);
}
