import RegisterForm from '../shared/ui/forms/RegisterForm';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
