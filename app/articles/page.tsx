import ArticlesClient from './ArticlesClient';
import { getArticles } from '@/lib/localArticles';

export const revalidate = 60;

export default async function ArticlesPage() {
  const { contents: articles } = await getArticles(20);
  return <ArticlesClient articles={articles} />;
}
