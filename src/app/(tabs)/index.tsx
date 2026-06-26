import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/StyledText';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import { Card } from '../../components/Card';
import { TransactionItem } from '../../components/TransactionItem';
import { formatCurrency } from '../../utils/format';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  const { colors, themeMode } = useTheme();
  const { transactions, settings, budgets } = useData();

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  const monthlyBudget = budgets.find(b => b.month === currentMonth);
  
  const currentMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const currentMonthExpense = currentMonthTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const budgetProgress = monthlyBudget ? Math.min((currentMonthExpense / monthlyBudget.amount) * 100, 100) : 0;

  const recentTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.header, { color: colors.text }]}>Dashboard</Text>
        
        <Animated.View entering={FadeInDown.delay(100).duration(500).springify()}>
          <LinearGradient
            colors={themeMode === 'dark' ? ['#1E293B', '#0F172A'] : ['#2563EB', '#1D4ED8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.balanceCard, { borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text style={[styles.balanceLabel, { color: 'rgba(255,255,255,0.7)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }]}>Total Balance</Text>
                <Text style={[styles.balanceAmount, { color: '#ffffff', fontSize: 36, fontWeight: 'bold' }]}>{formatCurrency(balance, settings.currency)}</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 14 }}>
                <Ionicons name="wallet-outline" size={24} color="#ffffff" />
              </View>
            </View>
            
            <View style={[styles.statsRow, { marginTop: 28, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 20 }]}>
              <View style={styles.stat}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Ionicons name="arrow-down" size={16} color="#10B981" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)', fontSize: 12 }]}>Income</Text>
                  <Text style={[styles.statAmount, { color: '#10B981', fontSize: 16, fontWeight: 'bold', marginTop: 2 }]}>{formatCurrency(income, settings.currency)}</Text>
                </View>
              </View>
              
              <View style={{ width: 1, height: '80%', backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'center' }} />

              <View style={styles.stat}>
                <View style={[styles.statIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                  <Ionicons name="arrow-up" size={16} color="#EF4444" />
                </View>
                <View>
                  <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)', fontSize: 12 }]}>Expense</Text>
                  <Text style={[styles.statAmount, { color: '#EF4444', fontSize: 16, fontWeight: 'bold', marginTop: 2 }]}>{formatCurrency(expense, settings.currency)}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {monthlyBudget ? (
          <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
            <Card style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={[styles.budgetLabel, { color: colors.textSecondary }]}>Monthly Budget</Text>
                <TouchableOpacity onPress={() => router.push('/set-budget')}>
                  <Ionicons name="pencil" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.budgetAmount, { color: colors.text }]}>
                {formatCurrency(currentMonthExpense, settings.currency)} <Text style={{ fontSize: 16, color: colors.textSecondary }}>/ {formatCurrency(monthlyBudget.amount, settings.currency)}</Text>
              </Text>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View style={[styles.progressBarFill, { backgroundColor: budgetProgress > 90 ? colors.expense : budgetProgress > 75 ? colors.warning : colors.success, width: `${budgetProgress}%` }]} />
              </View>
              {budgetProgress >= 90 && (
                <Text style={{ color: colors.expense, fontSize: 12, marginTop: 8 }}>You have reached {budgetProgress.toFixed(0)}% of your budget!</Text>
              )}
            </Card>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
            <TouchableOpacity onPress={() => router.push('/set-budget')} activeOpacity={0.8}>
              <Card style={[styles.budgetCard, { alignItems: 'center', paddingVertical: 24, borderStyle: 'dashed' }]}>
                <Ionicons name="pie-chart" size={32} color={colors.primary} style={{ marginBottom: 8 }} />
                <Text style={[styles.budgetLabel, { color: colors.text, fontWeight: 'bold' }]}>Set Monthly Budget</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4 }}>Keep your spending in check</Text>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View entering={FadeInRight.delay(300).duration(400)}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')}>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {recentTransactions.map((tx, index) => (
          <TransactionItem key={tx.id} transaction={tx} index={index + 3} />
        ))}
        {recentTransactions.length === 0 && (
          <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 20 }}>No transactions yet.</Text>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/add-transaction')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100, paddingTop: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  balanceCard: { marginBottom: 24 },
  balanceLabel: { fontSize: 14, marginBottom: 8 },
  balanceAmount: { fontSize: 36, fontWeight: 'bold', marginBottom: 24 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { flexDirection: 'row', alignItems: 'center' },
  statIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  statLabel: { fontSize: 12, marginBottom: 2 },
  statAmount: { fontSize: 16, fontWeight: '600' },
  budgetCard: { marginBottom: 24 },
  budgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  budgetLabel: { fontSize: 14, fontWeight: '500' },
  budgetAmount: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  progressBarBg: { height: 8, borderRadius: 4, width: '100%', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
});
