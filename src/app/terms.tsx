import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';

const TERMS_ITEMS = [
  {
    id: 1,
    icon: 'phone-portrait-outline' as any,
    title: 'App Usage',
    content: 'PocketLedger is uniquely designed for personal expense and budget tracking. The application is provided "as is" without any explicit or implicit warranties regarding uptime or device compatibility.'
  },
  {
    id: 2,
    icon: 'warning-outline' as any,
    title: 'Financial Disclaimer',
    content: 'This application does not provide certified financial, accounting, tax, or investment advice. All insights and metrics are for personal educational and tracking purposes only.'
  },
  {
    id: 3,
    icon: 'save-outline' as any,
    title: 'Data Responsibility',
    content: 'Since all records are strictly stored locally on your physical device, you are solely responsible for maintaining external backups. We cannot recover lost data.'
  },
  {
    id: 4,
    icon: 'document-lock-outline' as any,
    title: 'Intellectual Property',
    content: 'All visual content, design elements, UI aesthetics, and underlying functionality of PocketLedger are the exclusive property of the developers and protected by international copyright.'
  },
  {
    id: 5,
    icon: 'shield-outline' as any,
    title: 'Limitation of Liability',
    content: 'In no event shall the PocketLedger developers or affiliates be liable for any direct or indirect damages arising out of the use or inability to correctly use the application.'
  }
];

export default function TermsAndConditions() {
  const { colors, themeMode } = useTheme();

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
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
            <Ionicons name="reader" size={48} color="#ffffff" style={{ marginBottom: 12 }} />
            <Text style={styles.heroTitle}>Usage Terms</Text>
            <Text style={styles.heroText}>Please read these terms carefully before using PocketLedger as your daily financial companion.</Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.sectionsContainer}>
          {TERMS_ITEMS.map((item, index) => (
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
        
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>Effective Date: October 2023</Text>
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
