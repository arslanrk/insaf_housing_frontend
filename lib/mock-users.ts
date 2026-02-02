export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  salary?: number;
}

export const MOCK_USERS: User[] = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@example.com", phone: "+92 300 1234567", status: "active", salary: 85000 },
  { id: "2", name: "Sara Ali", email: "sara@example.com", phone: "+92 321 9876543", status: "active", salary: 72000 },
  { id: "3", name: "Usman Malik", email: "usman@example.com", phone: "+92 333 5551234", status: "inactive", salary: 65000 },
  { id: "4", name: "Fatima Noor", email: "fatima@example.com", phone: "+92 345 7778899", status: "active", salary: 90000 },
  { id: "5", name: "Hassan Raza", email: "hassan@example.com", phone: "+92 302 4445566", status: "inactive", salary: 55000 },
  { id: "6", name: "Ayesha Siddiqui", email: "ayesha@example.com", phone: "+92 333 1112233", status: "active", salary: 78000 },
  { id: "7", name: "Omar Farooq", email: "omar@example.com", phone: "+92 321 6667788", status: "active", salary: 82000 },
  { id: "8", name: "Zainab Hussain", email: "zainab@example.com", phone: "+92 300 9998877", status: "inactive", salary: 68000 },
  { id: "9", name: "Bilal Ahmed", email: "bilal@example.com", phone: "+92 345 3334455", status: "active", salary: 75000 },
  { id: "10", name: "Mariam Khan", email: "mariam@example.com", phone: "+92 302 2223344", status: "active", salary: 71000 },
  { id: "11", name: "Imran Sheikh", email: "imran@example.com", phone: "+92 333 8889900", status: "inactive", salary: 60000 },
  { id: "12", name: "Nadia Akhtar", email: "nadia@example.com", phone: "+92 321 4445566", status: "active", salary: 88000 },
];

export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}
