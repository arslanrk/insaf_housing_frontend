import { create } from "zustand";
import type { ClientTableRow } from "./client-form-store";

export type ClientStatus = "active" | "inactive";

interface ChangeStatusClientState {
  open: boolean;
  client: ClientTableRow | null;
  newStatus: ClientStatus | null;
  openModal: (client: ClientTableRow) => void;
  closeModal: () => void;
}

export const useChangeStatusClientStore = create<ChangeStatusClientState>((set) => ({
  open: false,
  client: null,
  newStatus: null,

  openModal: (client) => {
    const newStatus: ClientStatus = client.status === "active" ? "inactive" : "active";
    set({ open: true, client, newStatus });
  },

  closeModal: () => {
    set({ open: false, client: null, newStatus: null });
  },
}));
