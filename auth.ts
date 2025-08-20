import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { TUser } from './app/shared/types';
import bcrypt from 'bcrypt';
import sql from './app/shared/lib/db';

// email: 'user@test.ru',
//         password: hashSync('111111', 10),

async function getUser(email: string) {
  try {
    console.log('email', email);
    const user = await sql<
      TUser[]
    >`SELECT * FROM "User" WHERE "email"=${email}`;
    console.log('user', user);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatched = await bcrypt.compare(password, user.password);
          if (passwordMatched) return user;
        }
        return null;
      },
    }),
  ],
});
