import HomeClient from './HomeClient';
import { getArticles } from '@/lib/localArticles';

export const revalidate = 60;

export default async function Home() {
  const { contents: articles } = await getArticles(3);
  return <HomeClient articles={articles} />;
}
