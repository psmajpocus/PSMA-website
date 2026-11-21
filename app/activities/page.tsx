import ActivitiesClient from './ActivitiesClient';
import { getEvents } from '@/lib/localActivities';

export const revalidate = 60;

export default async function ActivitiesPage() {
  const [{ contents: upcoming }, { contents: past }] = await Promise.all([
    getEvents('upcoming'),
    getEvents('past'),
  ]);
  return <ActivitiesClient upcoming={upcoming} past={past} />;
}
