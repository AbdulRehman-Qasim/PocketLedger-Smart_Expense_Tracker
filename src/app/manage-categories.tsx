import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import { useAlert } from '../hooks/useAlert';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TransactionType } from '../types';
import Animated, { SlideInDown, FadeInDown } from 'react-native-reanimated';
import { ScreenWrapper } from '../components/ScreenWrapper';

const ICONS = ['fast-food-outline', 'car-outline', 'cart-outline', 'home-outline', 'cash-outline', 'gift-outline', 'heart-outline', 'airplane-outline', 'game-controller-outline'];
const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#64748B'];

export default function ManageCategories() {
  const { colors } = useTheme();
  const { categories, addCategory } = useData();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    addCategory({ name: name.trim(), type, icon: selectedIcon, color: selectedColor });
    showAlert('Success', 'Category added successfully!');
    setName('');
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Manage Categories</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={SlideInDown.duration(400).springify()}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Add New Category</Text>
        
        <View style={[styles.typeSelector, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity style={[styles.typeButton, type === 'expense' && { backgroundColor: colors.expense }]} onPress={() => setType('expense')}>
            <Text style={[styles.typeText, type === 'expense' ? { color: '#fff' } : { color: colors.textSecondary }]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.typeButton, type === 'income' && { backgroundColor: colors.success }]} onPress={() => setType('income')}>
            <Text style={[styles.typeText, type === 'income' ? { color: '#fff' } : { color: colors.textSecondary }]}>Income</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="Category Name"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.label, { color: colors.text }]}>Icon</Text>
        <View style={styles.grid}>
          {ICONS.map(icon => (
            <TouchableOpacity key={icon} style={[styles.gridItem, selectedIcon === icon && { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.card }]} onPress={() => setSelectedIcon(icon)}>
              <Ionicons name={icon as any} size={24} color={colors.text} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Color</Text>
        <View style={styles.grid}>
          {COLORS.map(color => (
            <TouchableOpacity key={color} style={[styles.colorItem, { backgroundColor: color }, selectedColor === color && { borderWidth: 3, borderColor: colors.text }]} onPress={() => setSelectedColor(color)} />
          ))}
        </View>

          <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Category</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 40 }]}>Existing Categories</Text>
        {categories.map((cat, index) => (
          <Animated.View key={cat.id} entering={FadeInDown.delay(100 + index * 50).duration(300)}>
            <View style={[styles.catRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.catIconContainer, { backgroundColor: cat.color }]}>
                <Ionicons name={cat.icon as any} size={20} color="#fff" />
              </View>
              <Text style={[styles.catName, { color: colors.text }]}>{cat.name}</Text>
              <Text style={{ color: colors.textSecondary, textTransform: 'capitalize' }}>{cat.type}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  typeSelector: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 16 },
  typeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  typeText: { fontWeight: 'bold', fontSize: 14 },
  input: { borderWidth: 1, borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  gridItem: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent' },
  colorItem: { width: 40, height: 40, borderRadius: 20 },
  saveButton: { padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  catRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  catIconContainer: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  catName: { flex: 1, fontSize: 16, fontWeight: '500' },
});
