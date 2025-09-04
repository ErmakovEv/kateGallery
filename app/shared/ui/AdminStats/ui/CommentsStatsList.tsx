import { TFullCommentWithArtWork } from '@/app/shared/types';
import { CommentStatsCard } from './CommentStatsCard';

type TCommentsStatsListProps = {
  comments: TFullCommentWithArtWork[];
};

export const CommentsStatsList = ({ comments }: TCommentsStatsListProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-lg">
        Комментарии{' '}
        <span className="bg-white border-1 border-gray-300 px-2 py-1 text-sky-500 rounded-xl">
          {comments.length}
        </span>
      </p>
      <div className="grid grid-cols-3 gap-2">
        {comments.map((comment) => (
          <CommentStatsCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
