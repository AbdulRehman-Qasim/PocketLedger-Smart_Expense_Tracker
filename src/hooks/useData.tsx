import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, Transaction, Category, Budget, Settings } from '../types';
import { loadData, saveData, INITIAL_DATA } from '../storage';
import * as Crypto from 'expo-crypto';
let Notifications: any = null;
import { Platform } from 'react-native';

try {
  Notifications = require('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (e) {
  console.warn('expo-notifications is not available (likely running in Expo Go).');
}
interface DataContextType extends AppData {
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setBudget: (budget: Budget) => void;
  resetData: () => void;
  isLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData().then((d) => {
      setData(d);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    
    if (data.settings.notificationsEnabled && Notifications) {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      Notifications.requestPermissionsAsync().then(({ status }: any) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync().then(() => {
            Notifications.scheduleNotificationAsync({
              content: { title: "PocketLedger", body: "Don't forget to track today's spending!" },
              trigger: { hour: 20, minute: 0, repeats: true } as any,
            });
          });
        }
      });
    } else if (Notifications) {
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [data.settings.notificationsEnabled, isLoaded]);

  const updateAndSave = (newData: AppData) => {
    setData(newData);
    saveData(newData);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    updateAndSave({
      ...data,
      transactions: [{ ...tx, id: Crypto.randomUUID() }, ...data.transactions],
    });
  };

  const updateTransaction = (tx: Transaction) => {
    updateAndSave({
      ...data,
      transactions: data.transactions.map((t) => (t.id === tx.id ? tx : t)),
    });
  };

  const deleteTransaction = (id: string) => {
    updateAndSave({
      ...data,
      transactions: data.transactions.filter((t) => t.id !== id),
    });
  };

  const addCategory = (cat: Omit<Category, 'id'>) => {
    updateAndSave({
      ...data,
      categories: [...data.categories, { ...cat, id: Crypto.randomUUID() }],
    });
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    updateAndSave({
      ...data,
      settings: { ...data.settings, ...newSettings },
    });
  };

  const setBudget = (budget: Budget) => {
    const existing = data.budgets.find(b => b.month === budget.month);
    let newBudgets;
    if (existing) {
      newBudgets = data.budgets.map(b => b.month === budget.month ? budget : b);
    } else {
      newBudgets = [...data.budgets, { ...budget, id: Crypto.randomUUID() }];
    }
    updateAndSave({ ...data, budgets: newBudgets });
  };

  const resetData = () => {
    updateAndSave(INITIAL_DATA);
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        updateSettings,
        setBudget,
        resetData,
        isLoaded,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
