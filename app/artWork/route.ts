import { NextResponse } from 'next/server';
import sql from '../shared/lib/db';
import { TArtWork } from '../shared/types';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') ?? 0);
    const limit = Number(url.searchParams.get('limit') ?? 10);

    const data: TArtWork[] = await sql`
      SELECT 
        a.id,
        a.name,
        a.description,
        a."imageUrls",
        a.year,
        a."createdAt",
        c.name AS category_name,
        (SELECT COUNT(*) FROM "Like" l WHERE l."workId" = a.id) AS likes_count,
        (SELECT COUNT(*) FROM "Comment" cm WHERE cm."workId" = a.id) AS comments_count
      FROM "ArtWork" a
      JOIN "Category" c ON a."categoryId" = c.id
      ORDER BY a."id" ASC
      LIMIT ${limit} OFFSET ${page * limit}
    `;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}
