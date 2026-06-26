import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Text } from '../../components/StyledText';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import { TransactionItem } from '../../components/TransactionItem';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export default function Transactions() {
  const { colors } = useTheme();
  const { transactions } = useData();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => 
    t.note?.toLowerCase().includes(search.toLowerCase()) || 
    t.amount.toString().includes(search)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={[styles.header, { color: colors.text }]}>Transactions</Text>
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search amount or note..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>No transactions found.</Text>}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 16 },
  list: { paddingBottom: 100 },
});
