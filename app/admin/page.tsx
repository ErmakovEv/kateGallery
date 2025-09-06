import { Suspense } from 'react';
import AdminStats from '../shared/ui/AdminStats/ui/AdminStats';
import { AdminStatsSkeleton } from '../shared/ui/Skeletons/AdminStatsSkeleton';

export default async function LoginPage() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 p-4 w-full bg-block">
        <Suspense fallback={<AdminStatsSkeleton />}>
          <AdminStats />
        </Suspense>
      </div>
    </div>
  );
}
