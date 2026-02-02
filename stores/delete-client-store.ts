import { create } from "zustand";
import type { ClientTableRow } from "./client-form-store";

interface DeleteClientState {
  open: boolean;
  client: ClientTableRow | null;
  openModal: (client: ClientTableRow) => void;
  closeModal: () => void;
}

export const useDeleteClientStore = create<DeleteClientState>((set) => ({
  open: false,
  client: null,

  openModal: (client) => {
    set({ open: true, client });
  },

  closeModal: () => {
    set({ open: false, client: null });
  },
}));
