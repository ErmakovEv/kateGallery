import Image from 'next/image';
import React from 'react';

type TAvatar = {
  src?: string;
};

function Avatar({ src = '/panda.svg' }: TAvatar) {
  return (
    <div className="bg-white rounded-full shadow-lg transform transition-all duration-300 relative overflow-hidden flex items-center justify-center w-[100px] h-[100px] hover:-translate-y-1 hover:shadow-xl custom-ring">
      <div>
        <button className="w-full h-full py-2">
          <Image src={src} width={50} height={50} alt="avatar" />
        </button>
      </div>
    </div>
  );
}

export default Avatar;
