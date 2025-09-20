'use client';

import { TransitionLink } from '@/app/shared/utils/TransitionLink';
import Lottie from 'lottie-react';
import unicornAnimation from '@/public/lottieUnicorn.json';

export function Logo() {
  return (
    <div className=" w-[100px] h-[100px] flex justify-center items-center rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 custom-ring">
      <TransitionLink href={'/'}>
        {/* <Image
            src="/logo2.svg"
            width={100}
            height={100}
            alt="logo"
            className=""
          /> */}
        <Lottie animationData={unicornAnimation} loop={true} autoplay={true} />
      </TransitionLink>
    </div>
  );
}
