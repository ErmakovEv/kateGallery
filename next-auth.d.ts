import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string;
    avatarUrl?: string; // Добавляем поле avatarUrl
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
      avatarUrl?: string; // Добавляем поле avatarUrl
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string;
    avatarUrl?: string; // Добавляем поле avatarUrl
    role?: string;
  }
}
