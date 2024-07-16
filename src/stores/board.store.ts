import { create } from 'zustand';

interface BoardStore {
    title: string;
    content: string;
    price: string;
    tradeLocation: string;
    boardImageFileList: File[];
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setPrice: (price: string) => void;
    setTradeLocation: (tradeLocation: string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
};

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    price: '',
    tradeLocation: '',
    boardImageFileList: [],
    setTitle: (title) => set(state => ({ ...state, title })),
    setContent: (content) => set(state => ({ ...state, content })),
    setPrice: (price) => set(state => ({ ...state, price })),
    setTradeLocation: (tradeLocation) => set(state => ({ ...state, tradeLocation })),
    setBoardImageFileList: (boardImageFileList) => set(state => ({ ...state, boardImageFileList })),
    resetBoard: () => set(state => ({ ...state, title: '', content: '',  tradeLocation: '', price: '',boardImageFileList: []})),
}));

export default useBoardStore;