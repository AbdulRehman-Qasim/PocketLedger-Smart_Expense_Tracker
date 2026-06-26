import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TermsAndConditions() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>
          1. App Usage
          PocketLedger is designed for personal expense tracking. The app is provided "as is" without any warranties.
          
          2. Financial Disclaimer
          This application does not provide financial, accounting, tax, or investment advice. The information is for personal tracking purposes only.
          
          3. Data Responsibility
          Since all data is stored locally on your device, you are solely responsible for maintaining backups. We are not liable for any data loss.
          
          4. Intellectual Property
          All content, design, and functionality of PocketLedger are the property of the respective developers and are protected by copyright laws.
          
          5. Limitation of Liability
          In no event shall the developers be liable for any damages arising out of the use or inability to use the application.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  text: { fontSize: 16, lineHeight: 28 },
});
