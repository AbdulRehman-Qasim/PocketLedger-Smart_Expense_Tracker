import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';

const POLICY_ITEMS = [
  {
    id: 1,
    icon: 'server-outline' as any,
    title: 'Local Data Storage',
    content: 'All your financial data, including income and expense records, are stored strictly locally on your device. We do not transmit any of this data to external servers or the cloud.'
  },
  {
    id: 2,
    icon: 'person-outline' as any,
    title: 'No Account Required',
    content: 'You do not need to create an account or sign in to use PocketLedger. We do not collect personal information such as your name, email, or phone number.'
  },
  {
    id: 3,
    icon: 'key-outline' as any,
    title: 'Minimal Permissions',
    content: 'PocketLedger requires absolutely minimal permissions to operate. We do not request unnecessary access to your contacts, location tracking, camera, or microphone.'
  },
  {
    id: 4,
    icon: 'analytics-outline' as any,
    title: 'No Third-Party Tracking',
    content: 'PocketLedger operates entirely offline and does not integrate any third-party analytics, ad networks, or tracking services that harvest your personal behavior data.'
  },
  {
    id: 5,
    icon: 'options-outline' as any,
    title: 'Full Data Control',
    content: 'You have complete control over your data footprint. You can export your financial records at any time or permanently erase everything instantly using the "Reset Data" option.'
  }
];

export default function PrivacyPolicy() {
  const { colors, themeMode } = useTheme();

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(400).springify()}>
          <LinearGradient
            colors={themeMode === 'dark' ? ['#1E293B', '#0F172A'] : ['#2563EB', '#1D4ED8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <Ionicons name="shield-checkmark" size={48} color="#ffffff" style={{ marginBottom: 12 }} />
            <Text style={styles.heroTitle}>Your Privacy Matters</Text>
            <Text style={styles.heroText}>We built PocketLedger with a privacy-first approach. Your financial data is yours alone.</Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.sectionsContainer}>
          {POLICY_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.id} 
              entering={FadeInDown.delay(100 + index * 100).duration(400).springify()}
              style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.sectionTextContainer}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>{item.content}</Text>
              </View>
            </Animated.View>
          ))}
        </View>
        
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>Last updated: October 2023</Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backButton: { padding: 8, marginLeft: -8, borderRadius: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 100 },
  heroCard: { borderRadius: 24, padding: 28, marginBottom: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  heroTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  heroText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  sectionsContainer: { gap: 16 },
  sectionCard: { flexDirection: 'row', padding: 20, borderRadius: 20, borderWidth: 1, alignItems: 'flex-start' },
  iconContainer: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  sectionTextContainer: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  sectionContent: { fontSize: 15, lineHeight: 22 },
  footerText: { textAlign: 'center', marginTop: 32, fontSize: 13, opacity: 0.6 }
});
