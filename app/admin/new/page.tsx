import { Manager } from '@/app/shared/ui/Manager';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const NewPage = async () => {
  const session = await auth();

  const isAdmin = session?.user.role === 'ADMIN';

  if (!isAdmin) redirect('/admin');

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl mb-2">Управление работами</h2>
      <Manager />
    </div>
  );
};

export default NewPage;
