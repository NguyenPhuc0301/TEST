import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { courses, lessons } from '../data/sampleData';
import { Button, Card, EmptyState, Row, colors } from '../components/ui';
import { DAY_NAMES } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'LessonDetail'>;

export default function LessonDetailScreen({ route, navigation }: Props) {
  const lesson = lessons.find(l => l.id === route.params.lessonId);
  if (!lesson) return <EmptyState message="Không tìm thấy buổi học" />;
  const course = courses.find(c => c.id === lesson.courseId);

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={s.name}>{course?.name}</Text>
        <Row label="Thứ" value={DAY_NAMES[lesson.day]} />
        <Row label="Thời gian" value={`${lesson.start} - ${lesson.end}`} />
        <Row label="Phòng học" value={lesson.room} />
        <Row label="Giảng viên" value={course?.teacher ?? ''} />
        <Text style={s.note}>Ghi chú: {lesson.note}</Text>
      </Card>
      <Button title="Xem môn học" onPress={() => navigation.navigate('CourseDetail', { courseId: lesson.courseId })} />
      <Button title="← Quay lại" onPress={() => navigation.goBack()} color={colors.sub} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  name: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 },
  note: { marginTop: 12, color: colors.text, lineHeight: 20 },
});
