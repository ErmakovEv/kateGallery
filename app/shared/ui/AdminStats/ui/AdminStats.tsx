import { getUserComments, getUserLikes } from '@/app/shared/lib/data';
import { Session } from 'next-auth';
import { CommentsStatsList } from './CommentsStatsList';
import { LikesStatsList } from './LikesStatsList';

type TAdminStatsProps = {
  session: Session | null;
  isAdmin: boolean;
};

export default async function AdminStats({
  session,
  isAdmin,
}: TAdminStatsProps) {
  const userId = session?.user.id;

  const comments = await getUserComments(isAdmin ? '' : userId);
  const likes = await getUserLikes(isAdmin ? '' : userId);
  return (
    <>
      <CommentsStatsList comments={comments} />
      <LikesStatsList likes={likes} />
    </>
  );
}
