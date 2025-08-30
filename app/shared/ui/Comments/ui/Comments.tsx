import CommentForm from '../../forms/CommentForm';
import { CommentList } from './CommentList';

export const Comments = ({
  workId,
  authorId,
}: {
  workId: string;
  authorId: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-2xl text-gray-400">КОММЕНТАРИИ</p>
      <CommentForm workId={workId} authorId={authorId} />
      <CommentList workId={workId} />
    </div>
  );
};
