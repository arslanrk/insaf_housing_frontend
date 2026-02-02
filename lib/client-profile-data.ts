import type { Client } from "./mock-clients";
import { getClientById } from "./mock-clients";

/** Full client profile for profile page tabs */
export interface ClientProfileData extends Client {
  registrationNo: string;
  address: string;
  mobile: string;
  email: string;
  blockNumber: string;
  housePlotNo: string;
  type: string;
  streetNo: string;
  houseSizeMarla: string;
  story: string;
  societyName: string;
  netPrice: number;
  totalReceivedPercent: number;
  outstandingAmount: number;
  receivedAmount: number;
  overDueSurchargeAmount: number;
  netPriceSurchargeAmount: number;
  houseNetSaleAmount: number;
  houseTotalExpenses: number;
  netProfit: number;
  commissionDetails: { userName: string; amount: number }[];
}

export interface PaymentLedgerEntry {
  paymentDescription: string;
  installNo: string;
  date: string;
  dueAmount: number;
  receivedAmount: number;
  outstandingAmount: number;
  bookNo: string;
  receiptNo: string;
  paymentMode: string;
  paidDate: string;
  paidAmount: number;
}

const PROFILE_OVERLAY: Record<string, Partial<ClientProfileData>> = {
  "1": {
    registrationNo: "REG-2024-001",
    address: "123 Main Street, Lahore",
    mobile: "+92 300 1234567",
    email: "shoukat.ali@example.com",
    blockNumber: "A",
    housePlotNo: "A-101",
    type: "Residential",
    streetNo: "1",
    houseSizeMarla: "2",
    story: "Single",
    societyName: "Insaf Housing Scheme",
    netPrice: 3500000,
    totalReceivedPercent: 45,
    outstandingAmount: 1925000,
    receivedAmount: 1575000,
    overDueSurchargeAmount: 0,
    netPriceSurchargeAmount: 3500000,
    houseNetSaleAmount: 3500000,
    houseTotalExpenses: 3200000,
    netProfit: 300000,
    commissionDetails: [{ userName: "Ahmed Khan", amount: 87500 }],
  },
  "2": {
    registrationNo: "REG-2024-002",
    address: "456 Park Road, Lahore",
    mobile: "+92 321 9876543",
    email: "mujeeb.rahman@example.com",
    blockNumber: "B",
    housePlotNo: "B-205",
    type: "Residential",
    streetNo: "2",
    houseSizeMarla: "2",
    story: "Single",
    societyName: "Insaf Housing Scheme",
    netPrice: 3500000,
    totalReceivedPercent: 30,
    outstandingAmount: 2450000,
    receivedAmount: 1050000,
    overDueSurchargeAmount: 25000,
    netPriceSurchargeAmount: 3525000,
    houseNetSaleAmount: 3500000,
    houseTotalExpenses: 3180000,
    netProfit: 320000,
    commissionDetails: [{ userName: "Sara Ali", amount: 87500 }],
  },
};

const PAYMENT_LEDGER_MOCK: Record<string, PaymentLedgerEntry[]> = {
  "1": [
    {
      paymentDescription: "Booking",
      installNo: "1",
      date: "20-08-2024",
      dueAmount: 350000,
      receivedAmount: 350000,
      outstandingAmount: 0,
      bookNo: "B-001",
      receiptNo: "R-1001",
      paymentMode: "Bank Transfer",
      paidDate: "20-08-2024",
      paidAmount: 350000,
    },
    {
      paymentDescription: "1st Installment",
      installNo: "2",
      date: "20-09-2024",
      dueAmount: 350000,
      receivedAmount: 350000,
      outstandingAmount: 0,
      bookNo: "B-001",
      receiptNo: "R-1002",
      paymentMode: "Cash",
      paidDate: "22-09-2024",
      paidAmount: 350000,
    },
    {
      paymentDescription: "2nd Installment",
      installNo: "3",
      date: "20-10-2024",
      dueAmount: 350000,
      receivedAmount: 200000,
      outstandingAmount: 150000,
      bookNo: "B-001",
      receiptNo: "R-1003",
      paymentMode: "Cheque",
      paidDate: "25-10-2024",
      paidAmount: 200000,
    },
  ],
  "2": [
    {
      paymentDescription: "Booking",
      installNo: "1",
      date: "22-08-2024",
      dueAmount: 350000,
      receivedAmount: 350000,
      outstandingAmount: 0,
      bookNo: "B-002",
      receiptNo: "R-2001",
      paymentMode: "Bank Transfer",
      paidDate: "22-08-2024",
      paidAmount: 350000,
    },
  ],
};

const DEFAULT_PROFILE: Partial<ClientProfileData> = {
  registrationNo: "",
  address: "",
  mobile: "",
  email: "",
  blockNumber: "",
  housePlotNo: "",
  type: "",
  streetNo: "",
  houseSizeMarla: "",
  story: "",
  netPrice: 0,
  totalReceivedPercent: 0,
  outstandingAmount: 0,
  receivedAmount: 0,
  overDueSurchargeAmount: 0,
  netPriceSurchargeAmount: 0,
  houseNetSaleAmount: 0,
  houseTotalExpenses: 0,
  netProfit: 0,
  commissionDetails: [],
};

export function getClientProfile(id: string): ClientProfileData | undefined {
  const client = getClientById(id);
  if (!client) return undefined;
  const overlay = PROFILE_OVERLAY[id] ?? {};
  const merged: ClientProfileData = {
    ...client,
    societyName: overlay.societyName ?? client.societyName,
    registrationNo: overlay.registrationNo ?? "",
    address: overlay.address ?? "",
    mobile: overlay.mobile ?? "",
    email: overlay.email ?? "",
    blockNumber: overlay.blockNumber ?? "",
    housePlotNo: overlay.housePlotNo ?? "",
    type: overlay.type ?? "",
    streetNo: overlay.streetNo ?? "",
    houseSizeMarla: overlay.houseSizeMarla ?? "",
    story: overlay.story ?? "",
    netPrice: overlay.netPrice ?? 0,
    totalReceivedPercent: overlay.totalReceivedPercent ?? 0,
    outstandingAmount: overlay.outstandingAmount ?? 0,
    receivedAmount: overlay.receivedAmount ?? 0,
    overDueSurchargeAmount: overlay.overDueSurchargeAmount ?? 0,
    netPriceSurchargeAmount: overlay.netPriceSurchargeAmount ?? 0,
    houseNetSaleAmount: overlay.houseNetSaleAmount ?? 0,
    houseTotalExpenses: overlay.houseTotalExpenses ?? 0,
    netProfit: overlay.netProfit ?? 0,
    commissionDetails: overlay.commissionDetails ?? [],
  };
  return merged;
}

export function getClientPaymentLedger(clientId: string): PaymentLedgerEntry[] {
  return PAYMENT_LEDGER_MOCK[clientId] ?? [];
}
