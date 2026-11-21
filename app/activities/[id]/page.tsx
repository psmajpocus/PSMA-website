import { getEvent, getEvents } from '@/lib/localActivities';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const { contents } = await getEvents();
  return contents.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id).catch(() => null);
  if (!event) notFound();
  return <EventDetailClient event={event} />;
}
