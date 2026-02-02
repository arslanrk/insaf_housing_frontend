export interface Client {
  id: string;
  clientName: string;
  cnic: string;
  status: "active" | "inactive";
  bookingDate: string;
  houseSize: string;
  societyName: string;
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    clientName: "Shoukat Ali s/o Irshad ul Haq",
    cnic: "35201-1234567-1",
    status: "active",
    bookingDate: "20-08-2024",
    houseSize: "2 marla single story",
    societyName: "Insaf Housing Scheme",
  },
  {
    id: "2",
    clientName: "Mujeeb Ur Rahman s/o Ali Raza",
    cnic: "35202-9876543-2",
    status: "active",
    bookingDate: "22-08-2024",
    houseSize: "2 marla single story",
    societyName: "Insaf Housing Scheme",
  },
  {
    id: "3",
    clientName: "Sana Mahmood d/o Ahmed Khan",
    cnic: "35203-5551234-3",
    status: "inactive",
    bookingDate: "15-07-2024",
    houseSize: "5 marla double story",
    societyName: "Green Valley",
  },
  {
    id: "4",
    clientName: "Rashid Ahmed s/o Muhammad Hussain",
    cnic: "35204-1112233-4",
    status: "active",
    bookingDate: "01-09-2024",
    houseSize: "3 marla single story",
    societyName: "Insaf Housing Scheme",
  },
  {
    id: "5",
    clientName: "Fatima Noor d/o Usman Malik",
    cnic: "35205-4445566-5",
    status: "inactive",
    bookingDate: "10-06-2024",
    houseSize: "2 marla single story",
    societyName: "Sunrise Society",
  },
  {
    id: "6",
    clientName: "Ali Hassan s/o Bilal Ahmed",
    cnic: "35206-7778899-6",
    status: "active",
    bookingDate: "05-08-2024",
    houseSize: "4 marla single story",
    societyName: "Insaf Housing Scheme",
  },
];

export function getClientById(id: string): Client | undefined {
  return MOCK_CLIENTS.find((c) => c.id === id);
}
