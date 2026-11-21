import fs from 'fs';
import path from 'path';
import type { Event } from './microcms';

const ACTIVITIES_DIR = path.join(process.cwd(), 'content/activities');

function getAllEvents(): Event[] {
  if (!fs.existsSync(ACTIVITIES_DIR)) return [];
  const files = fs.readdirSync(ACTIVITIES_DIR).filter((f) => f.endsWith('.json'));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(ACTIVITIES_DIR, f), 'utf-8');
    return JSON.parse(raw) as Event;
  });
}

export async function getEvents(status?: 'upcoming' | 'past') {
  const all = getAllEvents();
  const filtered = status ? all.filter((e) => e.status.includes(status)) : all;
  const sorted = filtered.sort((a, b) => {
    if (status === 'upcoming') return new Date(a.date).getTime() - new Date(b.date).getTime();
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return { contents: sorted, totalCount: sorted.length, offset: 0, limit: 100 };
}

export async function getEvent(id: string) {
  const all = getAllEvents();
  const event = all.find((e) => e.id === id);
  if (!event) throw new Error(`Event not found: ${id}`);
  return event;
}
