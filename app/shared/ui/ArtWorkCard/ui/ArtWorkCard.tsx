'use client';

import { Session } from 'next-auth';

import Image from 'next/image';
import { ButtonLike } from '../../ButtonLike';
import { TransitionLink } from '@/app/shared/utils/TransitionLink';
import { ButtonComment } from '../../ButtonComment';

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
    description: description || '',
    categoryName: categoryName || '',
    likesCount: `${likesCount || 0}`,
    id: `${id}`,
  });

  return (
    <div className="flex flex-col lg:flex-row justify-center m-4 border-16 border-cotton-500 rounded-3xl">
      <div className="w-full">
        <Image
          src={imageUrl || '/card.jpg'}
          alt={description || 'рисунок'}
          className="object-cover block w-full"
          width={1000}
          height={600}
        />
      </div>

      <div className="w-full lg:w-1/3 p-4 block-bg">
        <div className="lg:sticky lg:top-10">
          <TransitionLink href={`/${id}?${params.toString()}`}>
            <p className="text-3xl text-white-400 font-kablammo text-center">
              {name}
            </p>
          </TransitionLink>
          <p className="text-marshmallow-400">{description}</p>
          <p className="text-marshmallow-400">{categoryName}</p>

          <ButtonLike workId={id} session={session} likesCount={likesCount} />
          <ButtonComment
            id={id}
            params={params}
            commentsCount={commentsCount}
            session={session}
          />
        </div>
      </div>
    </div>
  );
}
