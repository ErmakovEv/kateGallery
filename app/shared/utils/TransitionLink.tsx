'use client';

import { useTransitionStore } from '@/app/store/transitionStore';
import Link from 'next/link';

export const TransitionLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { setState, setNextHref } = useTransitionStore();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setNextHref(href); // запоминаем куда переходим
    setState({ phase: 'expand', scale: 2.5, opacity: 1 }); // запускаем анимацию
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};
