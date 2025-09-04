'use client';

import { TFullCommentWithArtWork } from '@/app/shared/types';
import { Button } from '../../Button';
import { Trash2 } from 'lucide-react';
import { formatShortData } from '@/app/shared/lib/common';
import { deleteComment } from '@/app/shared/lib/actions';

type TCommentStatsCardProps = {
  comment: TFullCommentWithArtWork;
};

export const CommentStatsCard = ({ comment }: TCommentStatsCardProps) => {
  const deleteCommentHandler = async (id: number) => {
    await deleteComment(id);
  };

  return (
    <div className="p-2 border-2 border-marshmallow-400 bg-marshmallow-200 rounded-2xl w-full flex flex-col justify-between gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center flex-wrap">
          <p>{comment.fullName}</p>
          <div>{formatShortData(comment.createdAt)}</div>
        </div>

        <p>{comment.text}</p>
      </div>

      <div className="flex justify-between items-center flex-wrap">
        <p>{comment.name}</p>
        <Button
          icon={<Trash2 />}
          label={'Удалить'}
          size="small"
          onClick={() => deleteCommentHandler(+comment.id)}
        />
      </div>
    </div>
  );
};
