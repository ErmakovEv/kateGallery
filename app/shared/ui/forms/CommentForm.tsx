'use client';

import { useActionState, useRef } from 'react';
import { sendComment } from '../../lib/actions';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import { Send } from 'lucide-react';

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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '120px';
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '90px';
    }
  };

  console.log(authorId);

  return (
    <form action={formAction}>
      <input type="hidden" name="workId" value={workId} />
      <input type="hidden" name="authorId" value={authorId} />
      <div className="flex flex-col gap-2">
        <div className="rounded-2xl p-6 bg-sky-300">
          <textarea
            ref={inputRef}
            name="comment"
            placeholder="Написать комментарий"
            className="w-full rounded border border-gray-400 p-4 pt-6 focus:outline-none focus:ring-1 focus:border-none focus:ring-white-400 transition-all duration-300"
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ resize: 'none' }}
          />
        </div>
        <div className="flex justify-end">
          <Button
            aria-disabled={!authorId || isPending}
            label="Отправить"
            icon={<Send />}
            variant="secondary"
            disabled={!authorId}
          />
        </div>

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
