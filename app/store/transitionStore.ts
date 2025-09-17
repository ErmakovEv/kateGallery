import { create } from 'zustand';

interface AnimateState {
  phase: 'idle' | 'expand' | 'shrink';
  scale: number;
  opacity: number;
}

interface TransitionStore {
  state: AnimateState;
  setState: (state: AnimateState) => void;
  nextHref: string | null;
  setNextHref: (href: string | null) => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  state: { phase: 'idle', scale: 0, opacity: 0 },
  setState: (state) => set({ state }),
  nextHref: null,
  setNextHref: (href) => set({ nextHref: href }),
}));
