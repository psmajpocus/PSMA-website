import fs from 'fs';
import path from 'path';
import type { Organization } from './microcms';

const ORGS_DIR = path.join(process.cwd(), 'content/organizations');

export async function getOrganizations() {
  if (!fs.existsSync(ORGS_DIR)) return { contents: [], totalCount: 0, offset: 0, limit: 100 };
  const files = fs.readdirSync(ORGS_DIR).filter((f) => f.endsWith('.json'));
  const contents = files.map((f) => {
    const raw = fs.readFileSync(path.join(ORGS_DIR, f), 'utf-8');
    return JSON.parse(raw) as Organization;
  });
  return { contents, totalCount: contents.length, offset: 0, limit: 100 };
}
