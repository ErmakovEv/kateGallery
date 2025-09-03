import { auth } from '@/auth';

import Image from 'next/image';
import { ButtonLike } from '../shared/ui/ButtonLike';
import { Comments } from '../shared/ui/Comments';

export default async function Page(props: {
  searchParams?: Promise<{
    imageUrl?: string;
    name?: string;
    description?: string;
    categoryName?: string;
    likesCount?: string;
    id?: string;
  }>;
}) {
  const session = await auth();
  const searchParams = await props.searchParams;
  const imageUrl = searchParams?.imageUrl || '';
  const name = searchParams?.name || '';
  const description = searchParams?.description || '';
  const categoryName = searchParams?.categoryName || '';
  const likesCount = searchParams?.likesCount;
  const id = searchParams?.id;

  return (
    <main>
      <div className="max-container">
        <div className="h-full flex flex-col items-center gap-4 p-4 w-full bg-block">
          <div className="w-full max-w-[1000px] flex flex-col ">
            <div className="flex justify-center items-center">
              <Image
                src={imageUrl || '/card.jpg'}
                alt={'рисунок'}
                className="object-contain"
                width={1000}
                height={600}
              />
            </div>
            <div className="w-full p-4 gap-6 flex flex-col items-center block-bg ">
              <div className="w-full flex items-center justify-between">
                <p className="text-xl text-white-400">{name}</p>
                <div>
                  {id && (
                    <ButtonLike
                      workId={+id}
                      session={session}
                      likesCount={likesCount ? +likesCount : 0}
                      size={20}
                      hasCount={false}
                    />
                  )}
                </div>
              </div>
              <p className="w-full text-marshmallow-400">{description}</p>
              <div className="w-full flex justify-end">
                <p className=" text-marshmallow-400">{categoryName}</p>
              </div>
              {id && <Comments workId={id} authorId={session?.user.id} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
