// src/stores/board-type.store.ts
import { create } from 'zustand';

interface BoardTypeStore {
  boardType: string;
  setBoardType: (type: string) => void;
}

const useBoardTypeStore = create<BoardTypeStore>((set) => ({
  boardType: 'community', // default value
  setBoardType: (boardType) => set((state) => ({ ...state, boardType })),
}));

export default useBoardTypeStore;
