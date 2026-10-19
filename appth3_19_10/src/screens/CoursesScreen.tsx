import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { courses } from '../data/sampleData';
import { Card, EmptyState, colors } from '../components/ui';

const normalize = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

export default function CoursesScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = normalize(query.trim());
    return q ? courses.filter(c => normalize(c.name).includes(q)) : courses;
  }, [query]);

  return (
    <View style={s.container}>
      <TextInput
        style={s.search}
        placeholder="🔍 Tìm môn học theo tên..."
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 4, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState message="Không tìm thấy môn học phù hợp" />}
        renderItem={({ item }) => (
          <Card onPress={() => nav.navigate('CourseDetail', { courseId: item.id })}>
            <Text style={s.code}>{item.code}</Text>
            <Text style={s.name}>{item.name}</Text>
            <Text style={s.sub}>{item.credits} tín chỉ</Text>
          </Card>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  search: { backgroundColor: '#fff', margin: 16, marginBottom: 8, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.border },
  code: { color: colors.primary, fontWeight: '700', fontSize: 12 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: 2 },
  sub: { color: colors.sub, marginTop: 3 },
});
