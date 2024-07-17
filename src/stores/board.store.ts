import { create } from 'zustand';

interface BoardStore {
    title: string;
    content: string;
    price: number;
    tradeLocation: string;
    boardImageFileList: File[];
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setPrice: (price: number) => void;
    setTradeLocation: (tradeLocation: string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    price: 0,
    tradeLocation: '',
    boardImageFileList: [],
    setTitle: (title) => set(state => ({ ...state, title })),
    setContent: (content) => set(state => ({ ...state, content })),
    setPrice: (price) => set(state => ({ ...state, price })),
    setTradeLocation: (tradeLocation) => set(state => ({ ...state, tradeLocation })),
    setBoardImageFileList: (boardImageFileList) => set(state => ({ ...state, boardImageFileList })),
    resetBoard: () => set(state => ({ ...state, title: '', content: '',  tradeLocation: '', price: 0 ,boardImageFileList: []})),
}));

export default useBoardStore;