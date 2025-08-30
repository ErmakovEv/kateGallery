'use server';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

import sql from '@/app/shared/lib/db';
import { TComment, TUser } from '../types';
import z from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function getUser(email: string) {
  try {
    const user = await sql<
      TUser[]
    >`SELECT * FROM "User" WHERE "email"=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function setUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await sql<TUser[]>`
  INSERT INTO "User" ("email", "fullName", "password", "createdAt", "updatedAt")
  VALUES (
    ${email},
    ${name},
    ${hashedPassword},
    NOW(),
    NOW()
  )
  RETURNING *
`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    throw error;
  }
}
export const sendComment = async (
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> => {
  try {
    const parsed = z
      .object({
        comment: z.string().min(1),
        authorId: z.string(),
        workId: z.string(),
      })
      .safeParse({
        comment: formData.get('comment'),
        authorId: formData.get('authorId'),
        workId: formData.get('workId'),
      });

    if (!parsed.success) return 'Не удалось сохранить комментарий1';

    const { comment, authorId, workId } = parsed.data;

    await sql<TComment[]>`
      INSERT INTO "Comment" ("text", "authorId", "workId", "createdAt", "updatedAt")
      VALUES (${comment}, ${+authorId}, ${+workId}, NOW(), NOW())
      RETURNING *
    `;

    return 'Комментарий успешно сохранен';
  } catch (error) {
    console.error(error);
    return 'Не удалось сохранить комментарий2';
  }
};

export const logoutHandler = async () => {
  await signOut({ redirect: true, redirectTo: '/' });
};

export async function registartion(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
      })
      .safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
      });

    if (!parsedCredentials.success) return;

    const { name, email, password } = parsedCredentials.data;
    const user = await getUser(email);
    if (user) {
      throw new Error('Пользователь с таким e-mail уже зарегистрирован');
    }

    const newUser = await setUser(name, email, password);
    console.log('Пользователь успешно зарегистрирован', newUser);
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });
    redirect('/admin');
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    throw error;
  }
}

export const likeAddHandler = async (workId: number) => {
  const session = await auth();
  if (!session?.user) return;

  await sql`INSERT INTO "Like" ("authorId", "workId","createdAt", "updatedAt")
  VALUES (
    ${session.user.id},
    ${workId},
    NOW(),
    NOW()
  )`;
};

export const likeDelHandler = async (workId: number) => {
  const session = await auth();
  if (!session?.user) return;

  await sql`
    DELETE FROM "Like"
    WHERE "authorId" = ${session.user.id} AND "workId" = ${workId}
  `;
};
