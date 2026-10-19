import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { courses, lessons } from '../data/sampleData';
import { Card, Chip, EmptyState, colors } from '../components/ui';
import { DAY_NAMES } from '../utils/format';

const DAYS = [1, 2, 3, 4, 5, 6, 0];

export default function ScheduleScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [day, setDay] = useState<number>(new Date().getDay());

  const data = useMemo(
    () => lessons.filter(l => l.day === day).sort((a, b) => a.start.localeCompare(b.start)),
    [day],
  );

  return (
    <View style={s.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
          {DAYS.map(d => (
            <Chip key={d} label={DAY_NAMES[d]} active={d === day} onPress={() => setDay(d)} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState message={`${DAY_NAMES[day]} không có buổi học nào`} />}
        renderItem={({ item }) => {
          const course = courses.find(c => c.id === item.courseId);
          return (
            <Card onPress={() => nav.navigate('LessonDetail', { lessonId: item.id })}>
              <Text style={s.name}>{course?.name}</Text>
              <Text style={s.sub}>🕐 {item.start} - {item.end}</Text>
              <Text style={s.sub}>📍 Phòng {item.room}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  sub: { color: colors.sub, marginTop: 4 },
});
