import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useData } from '../hooks/useData';
import { useAlert } from '../hooks/useAlert';
import { formatCurrency, formatDate } from '../utils/format';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
  transaction: Transaction;
  onPress?: () => void;
  index?: number;
}

export const TransactionItem: React.FC<Props> = ({ transaction, onPress, index = 0 }) => {
  const { colors } = useTheme();
  const { categories, settings, deleteTransaction } = useData();
  const { showAlert } = useAlert();

  const category = categories.find(c => c.id === transaction.categoryId);
  const isIncome = transaction.type === 'income';

  const handleDelete = () => {
    showAlert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(transaction.id) }
      ]
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity style={[styles.deleteAction, { backgroundColor: colors.expense }]} onPress={handleDelete}>
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(400)}>
      <Swipeable renderRightActions={renderRightActions} containerStyle={styles.swipeableContainer}>
        <TouchableOpacity 
          style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]} 
          onPress={onPress}
          onLongPress={handleDelete}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: category?.color || colors.textSecondary }]}>
            <Ionicons name={(category?.icon as any) || 'help'} size={24} color="#fff" />
          </View>
          <View style={styles.details}>
            <Text style={[styles.name, { color: colors.text }]}>{category?.name || 'Unknown'}</Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>{formatDate(transaction.date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, { color: isIncome ? colors.success : colors.text }]}>
              {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, settings.currency)}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  swipeableContainer: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  }
});
