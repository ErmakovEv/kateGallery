'use client';

import { Session } from 'next-auth';
import { useActionState, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageUp, Save } from 'lucide-react';
import { Button } from '../Button';
import { changeAvatar } from '../../lib/actions';

export default function ChangeAvatarForm({ session }: { session: Session }) {
  const avatarUrl = session.user.avatarUrl;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    avatarUrl || '/panda.svg'
  );

  const [errorMessage, formAction, isPending] = useActionState<
    undefined,
    FormData
  >(async (_prevState, formData) => {
    await changeAvatar(formData);
    return undefined;
  }, undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && Array.from(e.target.files).length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  };

  return (
    <form action={formAction} encType={'multipart/form-data'}>
      <input type="hidden" name="userId" value={session.user.id} />
      <div className="flex flex-col items-center justify-center gap-4">
        {previewUrl && (
          <div className="p-4 flex justify-center rounded-full">
            <Image
              src={previewUrl}
              alt={`avatar`}
              className="rounded-full"
              width={100}
              height={100}
            />
          </div>
        )}
        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-cotton-500 text-white rounded hover:bg-cotton-400 transition-all duration-300">
            Загрузить изображение
            <ImageUp />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleFileChange}
              required
              className="hidden"
            />
          </label>
          <Button
            aria-disabled={isPending}
            label="Отправить"
            icon={<Save />}
            variant="secondary"
          />
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </form>
  );
}
