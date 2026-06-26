import { Category } from '../types';
import * as Crypto from 'expo-crypto';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: Crypto.randomUUID(), name: 'Food', icon: 'fast-food-outline', color: '#EF4444', type: 'expense' },
  { id: Crypto.randomUUID(), name: 'Transport', icon: 'car-outline', color: '#F59E0B', type: 'expense' },
  { id: Crypto.randomUUID(), name: 'Shopping', icon: 'cart-outline', color: '#3B82F6', type: 'expense' },
  { id: Crypto.randomUUID(), name: 'Bills', icon: 'receipt-outline', color: '#8B5CF6', type: 'expense' },
  { id: Crypto.randomUUID(), name: 'Salary', icon: 'cash-outline', color: '#22C55E', type: 'income' },
  { id: Crypto.randomUUID(), name: 'Freelance', icon: 'laptop-outline', color: '#10B981', type: 'income' },
];
