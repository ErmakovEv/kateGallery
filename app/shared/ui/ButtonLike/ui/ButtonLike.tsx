import { likeAddHandler, likeDelHandler } from '@/app/shared/lib/actions';
import { Heart } from 'lucide-react';
import { Session } from 'next-auth';
import { useState } from 'react';

export const ButtonLike = ({
  workId,
  likesCount,
  session,
}: {
  workId: number;
  session: Session | null;
  likesCount?: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount ? +likesCount : 0);

  const likeHandler = async () => {
    if (isLiked) {
      await likeDelHandler(workId);
      setLikes((prev) => prev - 1);
    } else {
      await likeAddHandler(workId);
      setLikes((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex gap-1">
      <button
        onClick={likeHandler}
        disabled={!session?.user}
        className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 ${
          isLiked
            ? 'bg-red-100 hover:bg-red-200'
            : 'bg-gray-100 hover:bg-gray-200'
        } ${
          !session?.user
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:scale-110'
        }`}
      >
        <Heart
          size={64}
          className={`transition-colors duration-200 ${
            isLiked ? 'text-red-600 fill-current' : 'text-red-600 opacity-60'
          }`}
          fill={isLiked ? 'currentColor' : 'none'}
        />
      </button>
      <span>{likes}</span>
    </div>
  );
};
