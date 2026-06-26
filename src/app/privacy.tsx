import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicy() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>
          1. Local Data Storage
          All your financial data, including income and expense records, are stored locally on your device. We do not transmit any of this data to external servers.
          
          2. No Account Required
          You do not need to create an account to use PocketLedger. We do not collect personal information such as your name, email, or phone number.
          
          3. Permissions
          PocketLedger requires minimal permissions to operate. We do not request access to your contacts, location, camera, or microphone. 
          
          4. Third-Party Services
          PocketLedger operates entirely offline and does not use third-party analytics or tracking services that collect your data.
          
          5. Data Control
          You have full control over your data. You can export your data at any time or completely erase it using the "Reset Data" option in Settings.
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
