import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import { Text } from '../../components/StyledText';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import { useAlert } from '../../hooks/useAlert';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export default function Settings() {
  const { colors, themeMode } = useTheme();
  const { settings, updateSettings, resetData, transactions } = useData();
  const { showAlert } = useAlert();
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const CURRENCIES = ['$', '€', '£', '¥', '₹', '₽', 'PKR', 'Rs', 'A$', 'C$', 'CHF', '元', '₩', '₺', '₦', '฿', '₫'];

  const handleExport = async () => {
    try {
      const csv = ['Date,Type,Amount,Category,Note'];
      transactions.forEach(t => {
        csv.push(`${t.date},${t.type},${t.amount},${t.categoryId},${t.note || ''}`);
      });
      const fileUri = (FileSystem as any).documentDirectory + 'export.csv';
      await FileSystem.writeAsStringAsync(fileUri, csv.join('\n'));
      await Sharing.shareAsync(fileUri);
    } catch (e) {
      showAlert('Export Failed', 'There was an error exporting your data.');
    }
  };

  const handleResetData = () => {
    showAlert(
      'Reset Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: () => resetData() 
        }
      ]
    );
  };

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : settings.theme === 'dark' ? 'system' : 'light';
    updateSettings({ theme: nextTheme });
  };

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.header, { color: colors.text }]}>Settings</Text>

        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingItem icon="moon-outline" label="Theme" value={settings.theme} onPress={toggleTheme} colors={colors} />
          <SettingItem icon="cash-outline" label="Currency" value={settings.currency} onPress={() => setCurrencyModalVisible(true)} colors={colors} />
          <SettingItem icon="grid-outline" label="Manage Categories" onPress={() => router.push('/manage-categories')} colors={colors} />
          <SettingItem icon="notifications-outline" label="Daily Reminder" rightElement={<Switch value={settings.notificationsEnabled} onValueChange={(val) => updateSettings({ notificationsEnabled: val })} />} colors={colors} />
          <SettingItem icon="download-outline" label="Export Data" onPress={handleExport} colors={colors} />
          <SettingItem icon="document-text-outline" label="Privacy Policy" onPress={() => router.push('/privacy')} colors={colors} />
          <SettingItem icon="reader-outline" label="Terms & Conditions" onPress={() => router.push('/terms')} colors={colors} />
          <SettingItem icon="trash-outline" label="Reset Data" onPress={handleResetData} colors={colors} isDestructive />
        </View>
      </ScrollView>

      <Modal visible={currencyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View entering={ZoomIn.duration(300).springify()} style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Currency</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {CURRENCIES.map(c => (
                <TouchableOpacity key={c} style={[styles.currencyBtn, { borderColor: colors.border, backgroundColor: settings.currency === c ? colors.primary : colors.background }]} onPress={() => { updateSettings({ currency: c }); setCurrencyModalVisible(false); }}>
                  <Text style={{ fontSize: 24, color: settings.currency === c ? '#fff' : colors.text }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={{ marginTop: 24, padding: 12 }} onPress={() => setCurrencyModalVisible(false)}>
              <Text style={{ color: colors.primary, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const SettingItem = ({ icon, label, value, onPress, rightElement, colors, isDestructive = false }: any) => (
  <TouchableOpacity style={[styles.item, { borderBottomColor: colors.border }]} onPress={onPress} disabled={!onPress}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name={icon} size={24} color={isDestructive ? colors.expense : colors.primary} style={{ marginRight: 16 }} />
      <Text style={{ fontSize: 16, color: isDestructive ? colors.expense : colors.text }}>{label}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {value && <Text style={{ color: colors.textSecondary, marginRight: rightElement ? 8 : 0, textTransform: 'capitalize' }}>{value}</Text>}
      {rightElement}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 20, paddingBottom: 100 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  section: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', borderRadius: 20, padding: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  currencyBtn: { width: 64, height: 64, borderRadius: 32, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
});
