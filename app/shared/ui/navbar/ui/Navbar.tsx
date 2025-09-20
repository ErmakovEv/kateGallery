import React from 'react';
import { auth } from '@/auth';
import ButtonNavbar from '../../ButtonNavbar/ButtonNavbar';
import { Logo } from '../../Logo';

export async function Navbar() {
  const session = await auth();

  return (
    <div className="flex gap-2 justify-between items-center p-4 block-bg">
      <Logo />
      <h3 className="max-sm:text-lg text-3xl font-kablammo text-cotton-500">
        💖 Катин домик 💖
      </h3>
      <div className="flex justify-center items-center">
        <ButtonNavbar session={session} />
      </div>
    </div>
  );
}
