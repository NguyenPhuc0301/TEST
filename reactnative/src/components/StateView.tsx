import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';

type Action = {label: string; onPress: () => void; primary?: boolean};
type Props = {
  loading?: boolean;
  icon?: string;
  title: string;
  message?: string;
  actions?: Action[];
};

/** Dùng chung cho 3 trạng thái: Loading, Error, Empty (và thiếu quyền vị trí). */
export default function StateView({loading, icon, title, message, actions = []}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.text} />
      ) : (
        <Text style={styles.icon}>{icon}</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {actions.map(a => (
        <Pressable
          key={a.label}
          onPress={a.onPress}
          style={[styles.button, a.primary && styles.buttonPrimary]}>
          <Text style={styles.buttonText}>{a.label}</Text>
        </Pressable>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30},
  icon: {fontSize: 52, marginBottom: 14},
  title: {color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center', marginTop: 14},
  message: {color: colors.textMuted, fontSize: 15, textAlign: 'center', marginTop: 8, lineHeight: 21},
  button: {marginTop: 14, paddingVertical: 12, paddingHorizontal: 22, borderRadius: 14, borderWidth: 1, borderColor: colors.border},
  buttonPrimary: {backgroundColor: colors.cardActive, borderColor: colors.cardActive},
  buttonText: {color: colors.text, fontSize: 15, fontWeight: '600'},
});
