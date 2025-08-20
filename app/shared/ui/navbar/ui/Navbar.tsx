import React from 'react';

export function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 ">
      <div className="border-2 border-marshmallow-300 rounded-full w-[50px] h-[50px] bg-cotton-500 flex justify-center items-center">
        Logo
      </div>
      <h3 className="text-3xl font-kablammo text-cotton-500">Катин домик</h3>
      <div className="border-2 border-marshmallow-300 rounded-full w-[50px] h-[50px] bg-cotton-500 flex justify-center items-center">
        |||
      </div>
    </div>
  );
}
