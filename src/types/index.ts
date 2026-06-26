export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType | 'both';
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string; // ISO String
  note?: string;
  paymentMethod?: string;
}

export interface Budget {
  id: string;
  amount: number;
  month: string; // YYYY-MM
}

export interface Settings {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface AppData {
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  settings: Settings;
}
