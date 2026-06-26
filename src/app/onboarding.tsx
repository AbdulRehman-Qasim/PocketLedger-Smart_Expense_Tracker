import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function Onboarding() {
  const { colors } = useTheme();
  const { updateSettings } = useData();

  const handleFinish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    updateSettings({ onboardingCompleted: true });
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Ionicons name="wallet" size={100} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Welcome to PocketLedger</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Track Every Penny. Build Better Habits.
        </Text>
        
        <View style={styles.features}>
          <FeatureItem icon="pie-chart" title="Track Spending" desc="See where your money goes" colors={colors} />
          <FeatureItem icon="notifications" title="Stay Alert" desc="Get daily reminders" colors={colors} />
          <FeatureItem icon="shield-checkmark" title="100% Private" desc="All data is stored locally" colors={colors} />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.primary }]} 
        onPress={handleFinish}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const FeatureItem = ({ icon, title, desc, colors }: any) => (
  <View style={styles.featureItem}>
    <View style={[styles.iconContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons name={icon} size={24} color={colors.primary} />
    </View>
    <View style={styles.featureText}>
      <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 24, textAlign: 'center' },
  subtitle: { fontSize: 16, marginTop: 8, textAlign: 'center', marginBottom: 40 },
  features: { width: '100%', paddingHorizontal: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  featureText: { marginLeft: 16, flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600' },
  featureDesc: { fontSize: 14, marginTop: 4 },
  button: { padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
