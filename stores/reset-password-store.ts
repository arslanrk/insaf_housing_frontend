import { create } from "zustand";
import type { UserTableRow } from "./user-form-store";

interface ResetPasswordState {
  open: boolean;
  user: UserTableRow | null;
  openModal: (user: UserTableRow) => void;
  closeModal: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  open: false,
  user: null,

  openModal: (user) => {
    set({ open: true, user });
  },

  closeModal: () => {
    set({ open: false, user: null });
  },
}));
