import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, Settings } from '../types';
import { DEFAULT_CATEGORIES } from '../constants/Categories';

const DATA_KEY = '@pocketledger_data';

export const DEFAULT_SETTINGS: Settings = {
  currency: '$',
  theme: 'system',
  language: 'en',
  notificationsEnabled: false,
  onboardingCompleted: false,
};

export const INITIAL_DATA: AppData = {
  transactions: [],
  categories: DEFAULT_CATEGORIES,
  budgets: [],
  settings: DEFAULT_SETTINGS,
};

export const loadData = async (): Promise<AppData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATA_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.error('Error loading data', e);
  }
  return INITIAL_DATA;
};

export const saveData = async (data: AppData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(DATA_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving data', e);
  }
};
