import { create } from "zustand";
import type { UserTableRow } from "./user-form-store";

export type UserStatus = "active" | "inactive";

interface ChangeStatusState {
  open: boolean;
  user: UserTableRow | null;
  newStatus: UserStatus | null;
  openModal: (user: UserTableRow) => void;
  closeModal: () => void;
}

export const useChangeStatusStore = create<ChangeStatusState>((set) => ({
  open: false,
  user: null,
  newStatus: null,

  openModal: (user) => {
    const newStatus: UserStatus = user.status === "active" ? "inactive" : "active";
    set({ open: true, user, newStatus });
  },

  closeModal: () => {
    set({ open: false, user: null, newStatus: null });
  },
}));
