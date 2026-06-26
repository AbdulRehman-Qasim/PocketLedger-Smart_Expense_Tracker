import React, { createContext, useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Text } from '../components/StyledText';
import { useTheme } from './useTheme';
import Animated, { ZoomIn } from 'react-native-reanimated';

type AlertAction = {
  text: string;
  onPress?: () => void;
  style?: 'cancel' | 'destructive' | 'default';
};

interface AlertContextType {
  showAlert: (title: string, message: string, actions?: AlertAction[]) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [actions, setActions] = useState<AlertAction[]>([]);

  const showAlert = (t: string, m: string, a?: AlertAction[]) => {
    setTitle(t);
    setMessage(m);
    setActions(a || [{ text: 'OK', onPress: () => setVisible(false) }]);
    setVisible(true);
  };

  const handlePress = (action: AlertAction) => {
    setVisible(false);
    if (action.onPress) action.onPress();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          {visible && (
            <Animated.View entering={ZoomIn.duration(250).springify()} style={[styles.alertBox, { backgroundColor: colors.card }]}>
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
              <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
              
              <View style={styles.buttonContainer}>
                {actions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      { backgroundColor: action.style === 'destructive' ? colors.expense + '20' : action.style === 'cancel' ? 'transparent' : colors.primary + '20' }
                    ]}
                    onPress={() => handlePress(action)}
                  >
                    <Text style={[
                      styles.buttonText,
                      { color: action.style === 'destructive' ? colors.expense : action.style === 'cancel' ? colors.textSecondary : colors.primary }
                    ]}>
                      {action.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  alertBox: { width: '100%', maxWidth: 320, borderRadius: 28, padding: 24, elevation: 10, shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  message: { fontSize: 16, marginBottom: 28, textAlign: 'center', lineHeight: 24 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12, flexWrap: 'wrap' },
  button: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, minWidth: 100, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold' }
});
