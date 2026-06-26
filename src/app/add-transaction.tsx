import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../components/StyledText';
import { router } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import { Ionicons } from '@expo/vector-icons';
import { TransactionType } from '../types';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '../components/ScreenWrapper';

export default function AddTransaction() {
  const { colors } = useTheme();
  const { categories, addTransaction } = useData();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [note, setNote] = useState('');

  const filteredCategories = categories.filter(c => c.type === type || c.type === 'both');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || !categoryId) return;
    
    addTransaction({
      amount: Number(amount),
      type,
      categoryId,
      date: new Date().toISOString(),
      note,
    });
    router.back();
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Add Transaction</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={SlideInDown.duration(400).springify()}>
          <View style={[styles.typeSelector, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.typeButton, type === 'expense' && { backgroundColor: colors.expense }]}
            onPress={() => { setType('expense'); setCategoryId(''); }}
          >
            <Text style={[styles.typeText, type === 'expense' ? { color: '#fff' } : { color: colors.textSecondary }]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeButton, type === 'income' && { backgroundColor: colors.success }]}
            onPress={() => { setType('income'); setCategoryId(''); }}
          >
            <Text style={[styles.typeText, type === 'income' ? { color: '#fff' } : { color: colors.textSecondary }]}>Income</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.amountInput, { color: type === 'income' ? colors.success : colors.expense }]}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Category</Text>
        <View style={styles.categories}>
          {filteredCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                { backgroundColor: categoryId === cat.id ? cat.color : colors.card, borderColor: colors.border }
              ]}
              onPress={() => setCategoryId(cat.id)}
            >
              <Ionicons name={cat.icon as any} size={20} color={categoryId === cat.id ? '#fff' : colors.text} />
              <Text style={[styles.categoryText, { color: categoryId === cat.id ? '#fff' : colors.text }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notes (Optional)</Text>
        <TextInput
          style={[styles.noteInput, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="Add a note"
          placeholderTextColor={colors.textSecondary}
          value={note}
          onChangeText={setNote}
        />

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  typeSelector: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 24 },
  typeButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  typeText: { fontWeight: 'bold', fontSize: 16 },
  amountInput: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, marginTop: 16 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, borderWidth: 1 },
  categoryText: { marginLeft: 8, fontWeight: '600' },
  noteInput: { borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
  saveButton: { padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 32 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
