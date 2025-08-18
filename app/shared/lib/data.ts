import { TArtWork } from '../types';
import sql from './db';

export async function fetchArtWorks() {
  try {
    const data = await sql<TArtWork[]>`SELECT * FROM "ArtWork"`;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch revenue data.');
  }
}
