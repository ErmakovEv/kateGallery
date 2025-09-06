import { ImageUp, Settings, Sparkles } from 'lucide-react';
import { Button } from '../../Button';
import Link from 'next/link';
import { auth } from '@/auth';

export const AdminNavbar = async () => {
  const session = await auth();

  const isAdmin = session?.user.role === 'ADMIN';

  return (
    <div className="flex flex-col w-full mb-4">
      <div>
        <h1 className="text-2xl mb-4">Панель администратора</h1>
      </div>
      <div className="flex gap-2">
        <Link href="/admin">
          <Button label={'Ваша статистика'} icon={<Sparkles />} size="small" />
        </Link>
        <Link href="/admin/settings">
          <Button
            label={'Настройки аккаунта'}
            icon={<Settings />}
            size="small"
          />
        </Link>
        {isAdmin && (
          <Link href="/admin/new">
            <Button label={'Новая работа'} icon={<ImageUp />} size="small" />
          </Link>
        )}
      </div>
    </div>
  );
};
