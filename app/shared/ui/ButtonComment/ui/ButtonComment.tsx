'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { Session } from 'next-auth';
import React, { useRef } from 'react';

import msgAnimation from '@/public/lottieMsg.json';
import { useRouter } from 'next/navigation';

type TButtonCommentProps = {
  id: number;
  params: URLSearchParams;
  session: Session | null;
  commentsCount?: number;
};

export function ButtonComment({
  id,
  params,
  session,
  commentsCount,
}: TButtonCommentProps) {
  const router = useRouter();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const commentHandler = () => {
    lottieRef.current?.stop();
    lottieRef.current?.play();

    setTimeout(() => {
      router.push(`/${id}?${params.toString()}`);
    }, 1000);
  };

  return (
    <div className="flex gap-1 relative justify-center">
      <button
        onClick={commentHandler}
        disabled={!session?.user}
        style={{
          width: 200,
          height: 200,
          cursor: 'pointer',
          filter: !session?.user ? 'grayscale(100%)' : 'none',
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={msgAnimation}
          loop={false}
          autoplay={false}
        />
      </button>

      {commentsCount && (
        <span className=" absolute right-[50px] bg-cotton-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {commentsCount}
        </span>
      )}
    </div>
  );
}
