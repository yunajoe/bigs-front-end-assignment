import { create } from "zustand";

interface BoardState {
  isWriteModalOpen: boolean;
  openWriteModal: () => void;
  closeWriteModal: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  isWriteModalOpen: false,
  openWriteModal: () => set({ isWriteModalOpen: true }),
  closeWriteModal: () => set({ isWriteModalOpen: false }),
}));
