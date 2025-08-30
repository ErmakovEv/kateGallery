import { formatDate } from '@/app/shared/lib/common';
import { TFullComment } from '@/app/shared/types';
import Image from 'next/image';

export const CommentItem = async (props: TFullComment) => {
  const { avatarUrl, fullName, createdAt, text } = props;

  return (
    <div className="flex flex-col gap-3 border-cotton-400 border-2 rounded-2xl px-3 py-3">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <Image
            src={avatarUrl || '/panda.svg'}
            width={30}
            height={30}
            alt="avatar"
          />
          <p className="font-bold">{fullName}</p>
        </div>
        <p className="text-gray-400">{formatDate(createdAt)}</p>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};
