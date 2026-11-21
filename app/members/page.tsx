import MembersClient from './MembersClient';
import { getOrganizations } from '@/lib/localOrganizations';

export const revalidate = 60;

export default async function MembersPage() {
  const { contents: organizations } = await getOrganizations();
  return <MembersClient organizations={organizations} />;
}
