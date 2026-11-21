import { getArticle, getArticles } from '@/lib/localArticles';
import ArticleDetailClient from './ArticleDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents } = await getArticles(100);
  return contents.map((a) => ({ id: a.id }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id).catch(() => null);
  if (!article) notFound();
  return <ArticleDetailClient article={article} />;
}
