import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { courses } from '../data/sampleData';
import { Badge, Card, Chip, EmptyState, colors } from '../components/ui';
import { formatDate } from '../utils/format';

type Filter = 'all' | 'todo' | 'done';

export default function AssignmentsScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { assignments, toggleAssignment } = useApp();
  const [filter, setFilter] = useState<Filter>('all');

  const data = useMemo(() => {
    const list = assignments.filter(a =>
      filter === 'all' ? true : filter === 'done' ? a.completed : !a.completed,
    );
    return list.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [assignments, filter]);

  return (
    <View style={s.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
          <Chip label="Tất cả" active={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip label="Chưa hoàn thành" active={filter === 'todo'} onPress={() => setFilter('todo')} />
          <Chip label="Đã hoàn thành" active={filter === 'done'} onPress={() => setFilter('done')} />
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState message="Không có bài tập nào" />}
        renderItem={({ item }) => {
          const course = courses.find(c => c.id === item.courseId);
          return (
            <Card onPress={() => nav.navigate('AssignmentDetail', { assignmentId: item.id })}>
              <Text style={[s.title, item.completed && s.done]}>{item.title}</Text>
              <Text style={s.sub}>{course?.name}</Text>
              <Text style={s.sub}>Hạn nộp: {formatDate(item.dueDate)}</Text>
              <View style={s.footer}>
                <Badge
                  text={item.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                  color={item.completed ? colors.green : colors.orange}
                />
                <TouchableOpacity onPress={() => toggleAssignment(item.id)}>
                  <Text style={{ color: colors.primary, fontWeight: '600' }}>
                    {item.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 15, fontWeight: '600', color: colors.text },
  done: { textDecorationLine: 'line-through', color: colors.sub },
  sub: { color: colors.sub, marginTop: 3 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
});
