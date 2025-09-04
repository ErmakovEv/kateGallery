'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useActionState, useRef, useState } from 'react';
import { createWork } from '../../lib/actions';

export default function ManagerForm() {
  const [errorMessage, formAction, isPending] = useActionState<
    undefined,
    FormData
  >(async (_prevState, formData) => {
    await createWork(formData);
    return undefined;
  }, undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && Array.from(e.target.files).length) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    }
  };

  return (
    <form action={formAction} encType={'multipart/form-data'}>
      <div className="w-full ">
        <div className="flex flex-col items-center justify-center bg-marshmallow-200 padding border-10 border-marshmallow-400 rounded-2xl">
          <div>
            <label htmlFor="email">Название работы</label>
            <div className="relative">
              <input
                name="name"
                required
                placeholder="Введите название"
                className="border-b border-marshmallow-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Год создания работы</label>
            <div className="relative">
              <input
                name="year"
                type="number"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Категория *</label>
            <select
              name="categoryId"
              required
              className="w-full p-2 border rounded"
            >
              <option value="1">ART</option>
              <option value="2">SCULPTURE</option>
              <option value="3">CRAFT</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Описание</label>
            <textarea
              name="description"
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Фотографии работы *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="images"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded"
            />
            {previewUrl && (
              <div className="p-4 flex justify-center items-center border-amber-100 border-2">
                <Image
                  src={previewUrl}
                  alt={`Preview`}
                  className="w-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            )}
          </div>
        </div>
        <button className="mt-4 w-full bg-marshmallow-400 p-2 rounded-2xl">
          Сохранить
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
