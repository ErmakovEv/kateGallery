import Image from 'next/image';

import React from 'react';
import { auth } from '@/auth';
import ButtonNavbar from '../../ButtonNavbar/ButtonNavbar';
import { TransitionLink } from '@/app/shared/utils/TransitionLink';

export async function Navbar() {
  const session = await auth();

  return (
    <div className="flex gap-2 justify-between items-center p-4 block-bg">
      <div className=" w-[100px] h-[100px] flex justify-center items-center rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 custom-ring">
        <TransitionLink href={'/'}>
          <Image
            src="/logo2.svg"
            width={100}
            height={100}
            alt="logo"
            className=""
          />
        </TransitionLink>
      </div>
      <h3 className="max-sm:text-lg text-3xl font-kablammo text-cotton-500">
        💖 Катин домик 💖
      </h3>
      <div className="flex justify-center items-center">
        <ButtonNavbar session={session} />
      </div>
    </div>
  );
}
