import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '../../components/StyledText';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import { TransactionItem } from '../../components/TransactionItem';
import { formatCurrency, formatDate } from '../../utils/format';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export default function Calendar() {
  const { colors } = useTheme();
  const { transactions } = useData();

  const grouped = transactions.reduce((acc, tx) => {
    const dateStr = new Date(tx.date).toLocaleDateString();
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(tx);
    return acc;
  }, {} as Record<string, typeof transactions>);

  const dates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={[styles.header, { color: colors.text }]}>Calendar</Text>
      <FlatList
        data={dates}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          const dayTxs = grouped[item];
          const totalIncome = dayTxs.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
          const totalExpense = dayTxs.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

          return (
            <View style={{ marginBottom: 24 }}>
              <View style={styles.dayHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{item}</Text>
                <View style={{ alignItems: 'flex-end' }}>
                  {totalIncome > 0 && <Text style={{ color: colors.success }}>+{formatCurrency(totalIncome)}</Text>}
                  {totalExpense > 0 && <Text style={{ color: colors.expense }}>-{formatCurrency(totalExpense)}</Text>}
                </View>
              </View>
              {dayTxs.map(tx => (
                <TransactionItem key={tx.id} transaction={tx} />
              ))}
            </View>
          );
        }}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>No transactions found.</Text>}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  list: { paddingBottom: 100 },
});
