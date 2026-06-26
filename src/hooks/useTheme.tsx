import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { useData } from './useData';

export const useTheme = () => {
  const systemTheme = useColorScheme() ?? 'light';
  const { settings } = useData();
  
  const themeMode = settings?.theme === 'system' 
    ? systemTheme 
    : (settings?.theme || 'light');
    
  return {
    themeMode,
    colors: Colors[themeMode as 'light' | 'dark'],
  };
};
