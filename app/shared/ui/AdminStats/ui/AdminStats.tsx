import { getUserComments, getUserLikes } from '@/app/shared/lib/data';

import { CommentsStatsList } from './CommentsStatsList';
import { LikesStatsList } from './LikesStatsList';
import { auth } from '@/auth';

export default async function AdminStats() {
  const session = await auth();

  const isAdmin = session?.user.role === 'ADMIN';

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
