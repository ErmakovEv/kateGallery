import {
  TArtWork,
  TFullComment,
  TFullCommentWithArtWork,
  TLikeWithUserArtWork,
} from '../types';
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

export async function fetchWorkComments(workId: string) {
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

export async function getUserComments(userId: string) {
  let sqlReq;

  if (userId !== '') {
    sqlReq = sql<TFullCommentWithArtWork[]>`
      SELECT 
        c.id,
        c.text,
        c."createdAt",
        c."authorId",
        c."workId",
        u."fullName",
        u."avatarUrl",
        a."name"
      FROM "Comment" c
      JOIN "User" u ON c."authorId" = u.id
      JOIN "ArtWork" a ON c."workId" = a.id
      WHERE c."authorId" = ${+userId}
      ORDER BY c."createdAt" DESC
    `;
  } else {
    sqlReq = sql<TFullCommentWithArtWork[]>`
      SELECT 
        c.id,
        c.text,
        c."createdAt",
        c."authorId",
        c."workId",
        u."fullName",
        u."avatarUrl",
        a."name"
      FROM "Comment" c
      JOIN "User" u ON c."authorId" = u.id
      JOIN "ArtWork" a ON c."workId" = a.id
      ORDER BY c."createdAt" DESC
    `;
  }

  try {
    const data = await sqlReq;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось получить комментарии');
  }
}

export async function getUserLikes(userId: string) {
  let sqlReq;

  if (userId !== '') {
    sqlReq = sql<TLikeWithUserArtWork[]>`
      SELECT 
        c.id,
        c."createdAt",
        c."authorId",
        c."workId",
        u."fullName",
        u."avatarUrl",
        a."name"
      FROM "Like" c
      JOIN "User" u ON c."authorId" = u.id
      JOIN "ArtWork" a ON c."workId" = a.id
      WHERE c."authorId" = ${+userId}
      ORDER BY c."createdAt" DESC
    `;
  } else {
    sqlReq = sql<TLikeWithUserArtWork[]>`
      SELECT 
        c.id,
        c."createdAt",
        c."authorId",
        c."workId",
        u."fullName",
        u."avatarUrl",
        a."name"
      FROM "Like" c
      JOIN "User" u ON c."authorId" = u.id
      JOIN "ArtWork" a ON c."workId" = a.id
      ORDER BY c."createdAt" DESC
    `;
  }

  try {
    const data = await sqlReq;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось получить комментарии');
  }
}
