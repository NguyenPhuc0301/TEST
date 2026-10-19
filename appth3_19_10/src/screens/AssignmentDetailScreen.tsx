import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { courses } from '../data/sampleData';
import { Badge, Button, Card, EmptyState, Row, colors } from '../components/ui';
import { dueText, formatDate } from '../utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'AssignmentDetail'>;

export default function AssignmentDetailScreen({ route, navigation }: Props) {
  const { assignments, toggleAssignment } = useApp();
  const a = assignments.find(x => x.id === route.params.assignmentId);
  if (!a) return <EmptyState message="Không tìm thấy bài tập" />;
  const course = courses.find(c => c.id === a.courseId);

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={s.title}>{a.title}</Text>
        <Badge
          text={a.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          color={a.completed ? colors.green : colors.orange}
        />
        <Row label="Môn học" value={course?.name ?? ''} />
        <Row label="Hạn nộp" value={formatDate(a.dueDate)} />
        {!a.completed && <Row label="Thời gian còn lại" value={dueText(a.dueDate)} />}
        <Text style={s.desc}>{a.description}</Text>
      </Card>
      <Button
        title={a.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
        color={a.completed ? colors.orange : colors.green}
        onPress={() => toggleAssignment(a.id)}
      />
      <Button title="← Quay lại" onPress={() => navigation.goBack()} color={colors.sub} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 19, fontWeight: '700', color: colors.text, marginBottom: 8 },
  desc: { marginTop: 12, color: colors.text, lineHeight: 20 },
});
