import { create } from "zustand";

export interface ClientTableRow {
  id: string;
  clientName: string;
  cnic: string;
  status: "active" | "inactive";
  bookingDate: string;
  houseSize: string;
  societyName: string;
}

export type ClientFormMode = "add" | "edit";

interface ClientFormState {
  open: boolean;
  mode: ClientFormMode;
  client: ClientTableRow | null;
  openModal: (mode: ClientFormMode, client?: ClientTableRow | null) => void;
  closeModal: () => void;
}

export const useClientFormStore = create<ClientFormState>((set) => ({
  open: false,
  mode: "add",
  client: null,

  openModal: (mode, client = null) => {
    set({ open: true, mode, client });
  },

  closeModal: () => {
    set({ open: false, mode: "add", client: null });
  },
}));
