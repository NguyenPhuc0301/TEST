import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { courses } from '../data/sampleData';
import { Badge, Card, EmptyState, colors } from '../components/ui';
import { dueText, formatDate } from '../utils/format';

export default function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { student, assignments } = useApp();

  const upcoming = useMemo(
    () =>
      assignments
        .filter(a => !a.completed)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5),
    [assignments],
  );

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <View style={s.hero}>
        <Text style={s.hello}>Xin chào 👋</Text>
        <Text style={s.name}>{student.name}</Text>
        <Text style={s.mssv}>Mã sinh viên: {student.id}</Text>
      </View>

      <Text style={s.section}>Môn học đang học</Text>
      {courses.map(c => (
        <Card key={c.id} onPress={() => nav.navigate('CourseDetail', { courseId: c.id })}>
          <Text style={s.title}>{c.name}</Text>
          <Text style={s.sub}>{c.code} • {c.credits} tín chỉ</Text>
        </Card>
      ))}

      <Text style={s.section}>Bài tập sắp đến hạn</Text>
      {upcoming.length === 0 ? (
        <EmptyState message="Bạn không có bài tập nào sắp đến hạn 🎉" />
      ) : (
        upcoming.map(a => {
          const course = courses.find(c => c.id === a.courseId);
          return (
            <Card key={a.id} onPress={() => nav.navigate('AssignmentDetail', { assignmentId: a.id })}>
              <Text style={s.title}>{a.title}</Text>
              <Text style={s.sub}>{course?.name} • Hạn: {formatDate(a.dueDate)}</Text>
              <View style={{ marginTop: 6 }}>
                <Badge text={dueText(a.dueDate)} color={colors.orange} />
              </View>
            </Card>
          );
        })
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { backgroundColor: colors.primary, borderRadius: 16, padding: 20, marginBottom: 8 },
  hello: { color: '#dbeafe', fontSize: 14 },
  name: { color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 2 },
  mssv: { color: '#dbeafe', marginTop: 4 },
  section: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 14, marginBottom: 8 },
  title: { fontSize: 15, fontWeight: '600', color: colors.text },
  sub: { color: colors.sub, marginTop: 3 },
});
