import { TLikeWithUserArtWork } from '@/app/shared/types';
import { Button } from '../../Button';
import { Trash2 } from 'lucide-react';
import { formatShortData } from '@/app/shared/lib/common';

type TLikeStatsCardProps = {
  like: TLikeWithUserArtWork;
};

export const LikeStatsCard = ({ like }: TLikeStatsCardProps) => {
  return (
    <div className="p-2 border-2 border-sky-500 bg-sky-300 rounded-2xl w-full flex justify-between gap-4">
      <div className="flex gap-2">
        <p>{like.fullName}</p>
        <div>{formatShortData(like.createdAt)}</div>
      </div>
      <p>{like.name}</p>
    </div>
  );
};
