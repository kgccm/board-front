// src/stores/board-type.store.ts
import { create } from 'zustand';

type BoardType = 'community' | 'recipe' | 'trade';

interface BoardTypeStore {
  boardType: BoardType;
  setBoardType: (type: BoardType) => void;
}

const useBoardTypeStore = create<BoardTypeStore>((set) => ({
  boardType: 'community', // default value
  setBoardType: (boardType: BoardType) => set({ boardType }),
}));

export default useBoardTypeStore;
