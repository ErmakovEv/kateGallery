import { TFullComment } from '@/app/shared/types';
import { CommentItem } from './CommentItem';
import { fetchWorkComments } from '@/app/shared/lib/data';

export const CommentList = async ({ workId }: { workId: string }) => {
  const comments: TFullComment[] = await fetchWorkComments(workId);

  return (
    <div className="flex flex-col gap-3">
      {comments.map((item) => (
        <CommentItem key={item.id} {...item} />
      ))}
    </div>
  );
};
