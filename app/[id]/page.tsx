import Image from 'next/image';

export default async function Page(props: {
  searchParams?: Promise<{
    imageUrl?: string;
    name?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const imageUrl = searchParams?.imageUrl || '';
  const name = searchParams?.name || '';

  return (
    <div className="h-screen flex flex-col  lg:flex-row gap-4  p-4">
      <div className="w-full">
        <Image
          src={imageUrl || '/card.jpg'}
          alt={'рисунок'}
          className="object-cover"
          width={1000}
          height={600}
        />
      </div>
      <div className="w-full lg:w-1/3 p-4">
        <p className="text-xl text-white-400">{name}</p>
      </div>
    </div>
  );
}
