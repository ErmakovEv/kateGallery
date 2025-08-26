'use client';

import { Session } from 'next-auth';
import { MessageSquareHeart, Heart } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { likeAddHandler, likeDelHandler } from '@/app/shared/lib/actions';

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

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount ? +likesCount : 0);

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
            <div className="flex gap-1">
              <button
                onClick={async () => {
                  if (isLiked) {
                    await likeDelHandler(id);
                    setLikes((prev) => prev - 1);
                  } else {
                    await likeAddHandler(id);
                    setLikes((prev) => prev + 1);
                  }

                  setIsLiked((prev) => !prev);
                }}
                disabled={!session?.user}
                className={`
    p-2 rounded-full transition-all duration-200
    ${isLiked ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'}
    ${
      !session?.user
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer hover:scale-110'
    }
    focus:outline-none focus:ring-2 focus:ring-red-500
  `}
              >
                <Heart
                  size={64}
                  className={`
      transition-colors duration-200
      ${isLiked ? 'text-red-600 fill-current' : 'text-red-600 opacity-60'}
    `}
                  fill={isLiked ? 'currentColor' : 'none'}
                />
              </button>
              <span>{likes}</span>
            </div>
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
