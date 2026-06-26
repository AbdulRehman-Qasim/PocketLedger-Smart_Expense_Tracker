import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { ViewStyle, StyleProp } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ScreenWrapper: React.FC<Props> = ({ children, style }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['top']} style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
};
