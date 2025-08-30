'use client';

import { useActionState, useRef } from 'react';
import { sendComment } from '../../lib/actions';
import { useRouter } from 'next/navigation';

export default function CommentForm({
  workId,
  authorId,
}: {
  workId: string;
  authorId: string;
}) {
  const [errorMessage, formAction, isPending] = useActionState(
    async (prevState: string | undefined, formData: FormData) => {
      const result = await sendComment(prevState, formData);
      router.refresh();
      return result;
    },
    undefined
  );

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '80px';
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="workId" value={workId} />
      <input type="hidden" name="authorId" value={authorId} />
      <div>
        <div className="rounded-2xl p-6 bg-sky-300 ">
          <input
            ref={inputRef}
            name="comment"
            placeholder="Написать комментарий"
            className="w-full rounded border border-white-400 p-4 pt-6 focus:outline-none focus:ring-2 focus:border-none focus:ring-blue-400 transition-all duration-300"
            style={{ height: '40px' }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <button
          className="mt-4 w-full bg-marshmallow-400 p-2 rounded-2xl"
          aria-disabled={isPending}
        >
          Отправить комментарий
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
