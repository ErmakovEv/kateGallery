import { TLikeWithUserArtWork } from '@/app/shared/types';
import { LikeStatsCard } from './LikeStatsCard';

type TLikesStatsListProps = {
  likes: TLikeWithUserArtWork[];
};

export const LikesStatsList = ({ likes }: TLikesStatsListProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-lg">
        Лайки{' '}
        <span className="bg-white border-1 border-gray-300 px-2 py-1 text-sky-500 rounded-xl">
          {likes.length}
        </span>
      </p>
      <div className="grid grid-cols-3 gap-2">
        {likes.map((like) => (
          <LikeStatsCard key={like.id} like={like} />
        ))}
      </div>
    </div>
  );
};
