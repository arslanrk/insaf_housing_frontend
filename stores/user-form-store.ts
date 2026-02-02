import { create } from "zustand";

export interface UserTableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  salary?: number;
}

export type UserFormMode = "add" | "edit";

interface UserFormState {
  open: boolean;
  mode: UserFormMode;
  user: UserTableRow | null;
  openModal: (mode: UserFormMode, user?: UserTableRow | null) => void;
  closeModal: () => void;
}

export const useUserFormStore = create<UserFormState>((set) => ({
  open: false,
  mode: "add",
  user: null,

  openModal: (mode, user = null) => {
    set({ open: true, mode, user });
  },

  closeModal: () => {
    set({ open: false, mode: "add", user: null });
  },
}));
