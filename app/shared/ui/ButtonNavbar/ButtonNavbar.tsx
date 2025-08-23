import Link from 'next/link';
import React from 'react';

function ButtonNavbar() {
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
