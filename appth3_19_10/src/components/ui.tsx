import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export const colors = {
  primary: '#2563eb', bg: '#f3f4f6', card: '#ffffff', text: '#111827',
  sub: '#6b7280', green: '#16a34a', orange: '#ea580c', border: '#e5e7eb',
};

export const Card = ({ children, style, onPress }: { children: React.ReactNode; style?: ViewStyle; onPress?: () => void }) => {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[s.card, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[s.card, style]}>{children}</View>;
};

export const Badge = ({ text, color }: { text: string; color: string }) => (
  <View style={[s.badge, { backgroundColor: color + '22' }]}>
    <Text style={{ color, fontWeight: '600', fontSize: 12 }}>{text}</Text>
  </View>
);

export const EmptyState = ({ message }: { message: string }) => (
  <View style={s.empty}>
    <Text style={{ fontSize: 40 }}>📭</Text>
    <Text style={{ color: colors.sub, marginTop: 8, textAlign: 'center' }}>{message}</Text>
  </View>
);

export const Chip = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[s.chip, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
    <Text style={{ color: active ? '#fff' : colors.text, fontWeight: '500' }}>{label}</Text>
  </TouchableOpacity>
);

export const Button = ({ title, onPress, color = colors.primary }: { title: string; onPress: () => void; color?: string }) => (
  <TouchableOpacity onPress={onPress} style={[s.btn, { backgroundColor: color }]}>
    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>{title}</Text>
  </TouchableOpacity>
);

export const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={s.row}>
    <Text style={{ color: colors.sub }}>{label}</Text>
    <Text style={{ color: colors.text, fontWeight: '600', flexShrink: 1, textAlign: 'right' }}>{value}</Text>
  </View>
);

const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  empty: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff', marginRight: 8 },
  btn: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
});
