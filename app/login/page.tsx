'use client';

import FogotPasswordForm from '../shared/ui/forms/FogotPasswordForm';
import LoginForm from '../shared/ui/forms/LoginForm';
import { useState } from 'react';
import RegisterForm from '../shared/ui/forms/RegisterForm';
import { Suspense } from 'react';

enum EFormKey {
  register = 'register',
  login = 'login',
  fogot = 'fogot',
}

export default function LoginPage() {
  const [activeKey, setActiveKey] = useState<EFormKey>(EFormKey.login);

  const renderForm = (key: EFormKey) => {
    switch (key) {
      case EFormKey.register:
        return <RegisterForm />;
      case EFormKey.fogot:
        return <FogotPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  const loginFogotButtonHandler = () => {
    if (activeKey === EFormKey.login) {
      setActiveKey(EFormKey.fogot);
      return;
    } else {
      setActiveKey(EFormKey.login);
      return;
    }
  };

  return (
    <Suspense>
      <main className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-md h-md bg-marshmallow-200 border-10 border-marshmallow-400 rounded-2xl flex flex-col">
            <div className="w-full flex-1 padding">{renderForm(activeKey)}</div>

            <div className="flex justify-between p-2">
              <button onClick={() => setActiveKey(EFormKey.register)}>
                <p className="text-marshmallow-400 hover:text-marshmallow-300">
                  Регистрация
                </p>
              </button>
              <button onClick={loginFogotButtonHandler}>
                <p className="text-sky-500 hover:text-sky-300">
                  {activeKey === EFormKey.login ? 'Забыли пароль?' : '<- Назад'}
                </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
