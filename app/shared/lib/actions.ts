'use server';
import { put } from '@vercel/blob';

import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

import sql from '@/app/shared/lib/db';
import { TComment, TUser } from '../types';
import z from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { generateTempPassword } from './common';

import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Галерея Катюши" <ej-88@ya.ru>`,
      to,
      subject,
      text,
    });

    return { success: true };
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return { success: false, error: 'Ошибка отправки' };
  }
}

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

export const createWork = async (formData: FormData) => {
  try {
    const parsedData = z
      .object({
        name: z.string(),
        year: z.coerce.number(),
        categoryId: z.coerce.number(),
        description: z.string(),
        images: z.any(),
      })
      .safeParse({
        name: formData.get('name'),
        year: formData.get('year'),
        categoryId: formData.get('categoryId'),
        description: formData.get('description'),
        images: formData.getAll('images'),
      });

    if (!parsedData.success) {
      throw new Error('Ошибка валидации формы');
    }

    const { name, year, categoryId, description, images } = parsedData.data;

    const imageUrls: string[] = [];

    for (const file of images as File[]) {
      const blob = await put(file.name, file, { access: 'public' });
      imageUrls.push(blob.url);
    }

    const newWork = await sql`
      INSERT INTO "ArtWork" ("imageUrls", "categoryId", "description", "name", "year", "createdAt", "updatedAt")
      VALUES (${imageUrls}, ${categoryId}, ${description}, ${name}, ${year}, NOW(), NOW())
      RETURNING *;
    `;

    return {
      success: true,
      data: newWork,
      message: 'Работа успешно сохранена',
    };
  } catch (error) {
    console.error('createWork error', error);
    throw error;
  }
};

export const deleteComment = async (id: number) => {
  try {
    await sql`DELETE FROM "Comment" WHERE id = ${id}`;
    revalidatePath('/admin');
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
    throw new Error('Не удалось удалить комментарий');
  }
};

export const changeAvatar = async (formData: FormData) => {
  try {
    const parsedData = z
      .object({
        userId: z.string(),
        avatar: z.instanceof(File),
      })
      .safeParse({
        userId: formData.get('userId'),
        avatar: formData.get('avatar'),
      });

    if (!parsedData.success) {
      throw new Error('Ошибка валидации формы');
    }

    const avatarFile = parsedData.data.avatar as File;

    const blob = await put(avatarFile.name, avatarFile, { access: 'public' });
    const avatarUrl = blob.url;

    await sql`
      UPDATE "User" SET "avatarUrl" = ${avatarUrl}, "updatedAt" = NOW()
      WHERE id = ${parsedData.data.userId}
    `;

    return {
      success: true,
      message: 'Новый аватар успешно сохранена',
    };
  } catch (error) {
    console.error('Ошибка при загрузки нового аватара', error);
    throw new Error();
  }
};

export async function fogotPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const parsedData = z.object({ email: z.string() }).safeParse({
      email: formData.get('email'),
    });
    if (!parsedData.success) {
      throw new Error('Ошибка валидации формы');
    }

    const user = await sql<
      TUser[]
    >`SELECT * FROM "User" WHERE email = ${parsedData.data.email}`;

    const tempPassword = generateTempPassword();
    const hashed = await bcrypt.hash(tempPassword, 10);

    await sql`
    UPDATE "User" SET password = ${hashed}, "updatedAt" = NOW()
    WHERE email = ${user[0].email}
  `;

    await sendEmail({
      to: user[0].email,
      subject: 'Временный пароль для входа',
      text: `Ваш временный пароль: ${tempPassword}`,
    });

    return 'Мы отправили новый пароль на указанный почтовый ящик';
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
