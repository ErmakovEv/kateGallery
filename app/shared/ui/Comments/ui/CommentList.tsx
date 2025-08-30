import { fetchComments } from '@/app/shared/lib/data';
import { TFullComment } from '@/app/shared/types';
import { CommentItem } from './CommentItem';

export const CommentList = async ({ workId }: { workId: string }) => {
  const comments: TFullComment[] = await fetchComments(workId);

  return (
    <div className="flex flex-col gap-3">
      {comments.map((item) => (
        <CommentItem key={item.id} {...item} />
      ))}
    </div>
  );
};
