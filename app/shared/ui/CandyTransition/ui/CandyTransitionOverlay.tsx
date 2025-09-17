'use client';

import { useTransitionStore } from '@/app/store/transitionStore';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { useRouter } from 'next/navigation';

export const CandyTransitionOverlay = () => {
  const { state, setState, nextHref, setNextHref } = useTransitionStore();
  const router = useRouter();

  const variants: Variants = {
    idle: { scale: 0, opacity: 0 },
    expand: {
      scale: 1.5,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    shrink: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  // Когда expand заканчивается → делаем переход и запускаем shrink
  const handleAnimationComplete = () => {
    if (state.phase === 'expand' && nextHref) {
      router.push(nextHref);
      setState({ phase: 'shrink', scale: 0, opacity: 0 });
      setNextHref(null);
    } else if (state.phase === 'shrink') {
      setState({ phase: 'idle', scale: 0, opacity: 0 });
    }
  };

  return (
    <AnimatePresence>
      {state.phase !== 'idle' && (
        <motion.img
          className="w-full h-full fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          initial="idle"
          animate={{ scale: state.scale, opacity: state.opacity }}
          exit="shrink"
          variants={variants}
          onAnimationComplete={handleAnimationComplete}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          src="/candy.svg"
          alt="Candy"
        />
      )}
    </AnimatePresence>
  );
};
