import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/StyledText';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import { PieChart } from 'react-native-gifted-charts';
import { Card } from '../../components/Card';
import { formatCurrency } from '../../utils/format';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export default function Statistics() {
  const { colors, themeMode } = useTheme();
  const { transactions, categories, settings } = useData();

  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.categoryId] = (acc[tx.categoryId] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

  const pieData = Object.keys(categoryTotals).map(catId => {
    const cat = categories.find(c => c.id === catId);
    const value = categoryTotals[catId];
    const percentage = totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(1) : '0';

    return {
      value,
      color: cat?.color || colors.expense,
      text: cat?.name || 'Other',
      icon: cat?.icon,
      percentage,
    };
  }).sort((a, b) => b.value - a.value); // Sort by highest expense

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.header, { color: colors.text }]}>Statistics</Text>
        
        <Card style={styles.chartCard}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Expenses by Category</Text>
          {pieData.length > 0 ? (
            <>
              <View style={{ alignItems: 'center', marginVertical: 32 }}>
                <PieChart
                  data={pieData}
                  donut
                  radius={120}
                  innerRadius={80}
                  innerCircleColor={colors.card}
                  centerLabelComponent={() => {
                    return (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 4 }}>Total</Text>
                        <Text style={{ fontSize: 24, color: colors.text, fontWeight: 'bold' }}>
                          {formatCurrency(totalExpense, settings.currency)}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>

              <View style={styles.legendContainer}>
                {pieData.map((item, index) => (
                  <View key={index} style={[styles.legendRow, { borderBottomColor: colors.border, borderBottomWidth: index === pieData.length - 1 ? 0 : StyleSheet.hairlineWidth }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                        <Ionicons name={item.icon as any || 'help'} size={20} color={item.color} />
                      </View>
                      <View style={{ marginLeft: 16 }}>
                        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 2 }}>{item.text}</Text>
                        <Text style={{ color: colors.textSecondary, fontSize: 13 }}>{item.percentage}%</Text>
                      </View>
                    </View>
                    <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>
                      {formatCurrency(item.value, settings.currency)}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center', marginVertical: 40 }}>
              <Ionicons name="pie-chart-outline" size={64} color={colors.border} style={{ marginBottom: 16 }} />
              <Text style={{ color: colors.textSecondary, textAlign: 'center', fontSize: 16 }}>
                No expenses to analyze yet.
              </Text>
            </View>
          )}
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 20, paddingBottom: 100 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  chartCard: { padding: 20 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  legendContainer: { marginTop: 10 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, alignItems: 'center' },
  iconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});
