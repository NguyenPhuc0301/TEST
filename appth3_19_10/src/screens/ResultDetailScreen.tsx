import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { courses, results } from '../data/sampleData';
import { Badge, Button, Card, EmptyState, Row, colors } from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultDetail'>;

export default function ResultDetailScreen({ route, navigation }: Props) {
  const r = results.find(x => x.courseId === route.params.courseId);
  const course = courses.find(c => c.id === route.params.courseId);
  if (!r || !course) return <EmptyState message="Chưa có kết quả cho môn học này" />;

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={s.name}>{course.name}</Text>
        <Badge text={r.total >= 4 ? 'Đạt' : 'Không đạt'} color={r.total >= 4 ? colors.green : colors.orange} />
        <Row label="Mã môn" value={course.code} />
        <Row label="Số tín chỉ" value={String(course.credits)} />
        <Row label="Điểm quá trình" value={r.process.toFixed(1)} />
        <Row label="Điểm giữa kỳ" value={r.midterm.toFixed(1)} />
        <Row label="Điểm cuối kỳ" value={r.final.toFixed(1)} />
        <Row label="Điểm tổng kết" value={r.total.toFixed(1)} />
        <Row label="Điểm chữ" value={r.grade} />
      </Card>
      <Button title="← Quay lại" onPress={() => navigation.goBack()} color={colors.sub} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  name: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 },
});
