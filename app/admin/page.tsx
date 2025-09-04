import { auth } from '@/auth';
import { Suspense } from 'react';
import { Manager } from '../shared/ui/Manager';
import AdminStats from '../shared/ui/AdminStats/ui/AdminStats';
import { AdminStatsSkeleton } from '../shared/ui/Skeletons/AdminStatsSkeleton';

export default async function LoginPage() {
  const session = await auth();

  const isAdmin = session?.user.role === 'ADMIN';

  return (
    <main>
      <div className="max-container min-h-screen">
        <div>
          <div className="flex flex-col items-center gap-4 p-4 w-full bg-block">
            <h1 className="text-2xl mb-4">Панель администратора</h1>
            <Suspense fallback={<AdminStatsSkeleton />}>
              <AdminStats session={session} isAdmin={isAdmin} />
            </Suspense>

            {isAdmin && (
              <div className="mt-6">
                <h2 className="text-xl mb-2">Управление работами</h2>
                <Manager />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
