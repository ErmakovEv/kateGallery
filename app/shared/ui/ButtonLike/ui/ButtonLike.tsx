'use client';

import { likeAddHandler } from '@/app/shared/lib/actions';
import { Session } from 'next-auth';
import { useRef, useState } from 'react';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import heartAnimation from '@/public/lottieHeart.json';

export const ButtonLike = ({
  workId,
  likesCount,
  session,
  hasCount = true,
}: {
  workId: number;
  session: Session | null;
  likesCount?: number;
  size?: number;
  hasCount?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount ? +likesCount : 0);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const likeHandler = async () => {
    if (isLiked) return;
    lottieRef.current?.stop();
    lottieRef.current?.play();

    await likeAddHandler(workId);
    setTimeout(() => {
      setLikes((prev) => prev + 1);
      setIsLiked((prev) => !prev);
    }, 3000);
  };

  return (
    <div className="flex gap-1 relative justify-center">
      <button
        onClick={likeHandler}
        disabled={!session?.user}
        style={{
          width: 200,
          height: 200,
          cursor: 'pointer',
          filter: isLiked || !session?.user ? 'grayscale(100%)' : 'none',
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={heartAnimation}
          loop={false}
          autoplay={false}
        />
      </button>
      {hasCount && (
        <span className=" absolute right-[50px] bg-cotton-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {likes}
        </span>
      )}
    </div>
  );
};
