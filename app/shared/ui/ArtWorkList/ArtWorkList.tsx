'use client';

import React, { useEffect, useRef, useState } from 'react';

import { TFullArtWork } from '../../types';
import { ArtWorkCard } from '../ArtWorkCard/ui/ArtWorkCard';
import { Session } from 'next-auth';

const PAGE_SIZE = 5;

export function ArtWorkList({ session }: { session: Session | null }) {
  const [images, setImages] = useState<TFullArtWork[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchPhotos = async (pageNumber: number) => {
    setIsLoading(true);

    const res = await fetch(`/artWork?page=${pageNumber}&limit=${PAGE_SIZE}`);
    if (!res.ok) throw new Error('Ошибка при получении данных');
    const data = await res.json();

    setImages((prev) => [...prev, ...data]);
    setHasMore(data.length >= PAGE_SIZE);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0, rootMargin: '100px' }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  return (
    <div className="flex flex-col gap-4 justify-center ">
      {images.map((item) => (
        <ArtWorkCard
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrls.length ? item.imageUrls[0] : null}
          description={item.description}
          name={item.name}
          likesCount={item.likesCount}
          commentsCount={item.commentsCount}
          categoryName={item.categoryName}
          year={item.year}
          createdAt={item.createdAt}
          session={session}
        />
      ))}

      {hasMore && (
        <div ref={loaderRef} className="text-center py-8">
          {isLoading ? 'Загружаю ещё...' : 'Прокрути вниз 👇'}
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 text-gray-500">Больше фото нет 🦄</div>
      )}
    </div>
  );
}
