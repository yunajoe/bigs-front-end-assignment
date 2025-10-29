import { PostItem } from "@/shared/types/board";
import { create } from "zustand";

interface BoardState {
  isWriteModalOpen: boolean;
  openWriteModal: () => void;
  closeWriteModal: () => void;

  editingPost: PostItem | null;
  setEditingPost: (post: PostItem) => void;
  clearEditingPost: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  isWriteModalOpen: false,
  openWriteModal: () => set({ isWriteModalOpen: true }),
  closeWriteModal: () => set({ isWriteModalOpen: false }),

  editingPost: null,
  setEditingPost: (post) => set({ editingPost: post }),
  clearEditingPost: () => set({ editingPost: null }),
}));
