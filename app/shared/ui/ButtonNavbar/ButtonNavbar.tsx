'use client';

import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Avatar from '../Avatar/Avatar';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutHandler } from '../../lib/actions';

function ButtonNavbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  if (session?.user && pathname === '/admin')
    return (
      <div className="bg-white rounded-full shadow-lg transform transition-all duration-300 relative overflow-hidden w-[100px] h-[100px] hover:-translate-y-1 hover:shadow-xl custom-ring">
        <button
          className="w-full h-full flex items-center justify-center"
          onClick={logoutHandler}
        >
          <LogOut size={48} />
        </button>
      </div>
    );

  if (session?.user)
    return (
      <Link href={'/admin'}>
        <Avatar src={session.user.avatarUrl || '/panda.svg'} />
      </Link>
    );

  return (
    <button className="w-[100px] h-[100px] py-4 bg-white rounded-full text-white text-lg font-bold shadow-lg transform hover:-translate-y-1 transition-all duration-300 border-2 border-white relative overflow-hidden">
      <Link href="/login">
        <span className="relative z-10 text-2xl text-cotton-400">Войти 🌈</span>
        <div className="absolute inset-0 bg-rainbow opacity-30"></div>
      </Link>
    </button>
  );
}

export default ButtonNavbar;
