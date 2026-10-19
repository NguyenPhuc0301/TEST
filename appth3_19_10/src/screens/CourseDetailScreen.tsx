import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { courses, lessons } from '../data/sampleData';
import { Button, Card, EmptyState, Row, colors } from '../components/ui';
import { DAY_NAMES } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetail'>;

export default function CourseDetailScreen({ route, navigation }: Props) {
  const course = courses.find(c => c.id === route.params.courseId);
  if (!course) return <EmptyState message="Không tìm thấy môn học" />;
  const cl = lessons.filter(l => l.courseId === course.id);

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={s.code}>{course.code}</Text>
        <Text style={s.name}>{course.name}</Text>
        <Row label="Số tín chỉ" value={String(course.credits)} />
        <Row label="Giảng viên" value={course.teacher} />
        <Text style={s.desc}>{course.description}</Text>
      </Card>

      <Text style={s.section}>Lịch học</Text>
      {cl.length === 0 ? (
        <EmptyState message="Môn học chưa có lịch học" />
      ) : (
        cl.map(l => (
          <Card key={l.id} onPress={() => navigation.navigate('LessonDetail', { lessonId: l.id })}>
            <Text style={s.lesson}>{DAY_NAMES[l.day]} • {l.start} - {l.end}</Text>
            <Text style={{ color: colors.sub, marginTop: 3 }}>Phòng {l.room}</Text>
          </Card>
        ))
      )}
      <Button title="← Quay lại" onPress={() => navigation.goBack()} color={colors.sub} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  code: { color: colors.primary, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.text, marginVertical: 6 },
  desc: { color: colors.text, marginTop: 12, lineHeight: 20 },
  section: { fontSize: 17, fontWeight: '700', marginVertical: 10, color: colors.text },
  lesson: { fontWeight: '600', color: colors.text },
});
