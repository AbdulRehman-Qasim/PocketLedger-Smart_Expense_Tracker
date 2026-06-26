import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '../components/ScreenWrapper';

export default function SetBudget() {
  const { colors } = useTheme();
  const { budgets, setBudget } = useData();

  const currentMonth = new Date().toISOString().substring(0, 7);
  const existingBudget = budgets.find(b => b.month === currentMonth);
  
  const [amount, setAmount] = useState(existingBudget?.amount.toString() || '');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) return;
    setBudget({
      id: existingBudget?.id || '',
      month: currentMonth,
      amount: Number(amount),
    });
    router.back();
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Set Budget</Text>
        <View style={{ width: 28 }} />
      </View>
      <Animated.View entering={SlideInDown.duration(400).springify()} style={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>Monthly Budget Amount</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.card, borderColor: colors.border }]}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          autoFocus
        />
        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Budget</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { fontSize: 16, marginBottom: 12, fontWeight: '600' },
  input: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', padding: 20, borderRadius: 16, borderWidth: 1, marginBottom: 24 },
  saveButton: { padding: 18, borderRadius: 16, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
