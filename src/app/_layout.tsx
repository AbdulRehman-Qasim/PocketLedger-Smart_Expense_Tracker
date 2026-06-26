import { Stack } from 'expo-router';
import { DataProvider } from '../hooks/useData';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../hooks/useTheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { AlertProvider } from '../hooks/useAlert';

function RootLayoutNav() {
  const { themeMode, colors } = useTheme();
  
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  if (!fontsLoaded) return null;
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="add-transaction" options={{ presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <DataProvider>
      <AlertProvider>
        <RootLayoutNav />
      </AlertProvider>
    </DataProvider>
  );
}
