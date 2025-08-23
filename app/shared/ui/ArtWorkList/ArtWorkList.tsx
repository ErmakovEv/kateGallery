'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { TArtWork } from '../../types';

const PAGE_SIZE = 5;

export function ArtWorkList() {
  const [images, setImages] = useState<TArtWork[]>([]);
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
      { threshold: 1.0 }
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
        <div key={item.id} className="flex flex-col lg:flex-row gap-4  p-4">
          <div className="w-full">
            <Image
              src={item.imageUrls[0]}
              alt={item.description || 'рисунок'}
              className="object-cover"
              width={1000}
              height={600}
            />
          </div>

          <div className="w-full lg:w-1/3 p-4">
            <div className="lg:sticky lg:top-10">
              <p className="text-xl text-white-400">{item.name}</p>
              <p className="text-marshmallow-400">{item.description}</p>
            </div>
          </div>
        </div>
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
