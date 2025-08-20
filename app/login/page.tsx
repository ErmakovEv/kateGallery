import LoginForm from '../shared/ui/forms/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
