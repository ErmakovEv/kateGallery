import ChangeAvatarForm from '@/app/shared/ui/forms/ChangeAvatarForm';
import { auth } from '@/auth';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="max-container min-h-screen">
      Настройки
      {session && <ChangeAvatarForm session={session} />}
    </div>
  );
};

export default SettingsPage;
