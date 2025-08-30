import { TArtWork, TFullComment } from '../types';
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

export async function fetchComments(workId: string) {
  try {
    const data = await sql<TFullComment[]>`
      SELECT 
        c.id,
        c.text,
        c."createdAt",
        c."authorId",
        u."fullName",
        u."avatarUrl"
      FROM "Comment" c
      JOIN "User" u ON c."authorId" = u.id
      WHERE c."workId" = ${workId}
      ORDER BY c."createdAt" DESC
    `;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось получить комментарии');
  }
}
