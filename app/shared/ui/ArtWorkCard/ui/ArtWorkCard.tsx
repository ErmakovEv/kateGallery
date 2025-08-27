'use client';

import { Session } from 'next-auth';
import { MessageSquareHeart } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { ButtonLike } from '../../ButtonLike';

export type TArtWorkCardProps = {
  id: number;
  imageUrl: string | null;
  description?: string;
  name: string;
  likesCount?: number;
  commentsCount?: number;
  categoryName?: string;
  year?: number;
  createdAt?: Date;
  session: Session | null;
};

export function ArtWorkCard(props: TArtWorkCardProps) {
  const {
    id,
    imageUrl,
    description = '',
    name,
    likesCount,
    commentsCount,
    categoryName,
    session,
  } = props;

  const params = new URLSearchParams({
    imageUrl: `${imageUrl}`,
    name: name,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-4  p-4">
      <div className="w-full">
        <Image
          src={imageUrl || '/card.jpg'}
          alt={description || 'рисунок'}
          className="object-cover"
          width={1000}
          height={600}
        />
      </div>

      <div className="w-full lg:w-1/3 p-4">
        <div className="lg:sticky lg:top-10">
          <Link href={`/${id}?${params.toString()}`}>
            <p className="text-xl text-white-400">{name}</p>
          </Link>
          <p className="text-marshmallow-400">{description}</p>
          <p className="text-marshmallow-400">{categoryName}</p>
          <div className="flex gap-3">
            <ButtonLike workId={id} session={session} likesCount={likesCount} />
            <div className="flex gap-1">
              <MessageSquareHeart size={64} color="#b0a0a0" />
              <span>{commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
