import { auth } from '@/auth';
import { ArtWorkList } from './shared/ui/ArtWorkList/ArtWorkList';

export default async function Gallery() {
  const session = await auth();
  return (
    <main>
      <div className="max-container">
        <ArtWorkList session={session} />
      </div>
    </main>
  );
}
