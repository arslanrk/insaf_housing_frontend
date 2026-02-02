import { create } from "zustand";
import type { UserTableRow } from "./user-form-store";

interface DeleteUserState {
  open: boolean;
  user: UserTableRow | null;
  openModal: (user: UserTableRow) => void;
  closeModal: () => void;
}

export const useDeleteUserStore = create<DeleteUserState>((set) => ({
  open: false,
  user: null,

  openModal: (user) => {
    set({ open: true, user });
  },

  closeModal: () => {
    set({ open: false, user: null });
  },
}));
