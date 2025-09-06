import Image from 'next/image';
import React from 'react';

type TAvatar = {
  src?: string;
};

function Avatar({ src = '/panda.svg' }: TAvatar) {
  return (
    <div className="bg-white rounded-full shadow-lg transform transition-all duration-300 relative overflow-hidden w-[100px] h-[100px] hover:-translate-y-1 hover:shadow-xl custom-ring">
      <button className="w-full h-full flex items-center justify-center">
        <Image
          src={src}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full"
        />
      </button>
    </div>
  );
}

export default Avatar;
