import { Redirect } from 'expo-router';
import { useData } from '../hooks/useData';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { isLoaded, settings } = useData();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!settings.onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
