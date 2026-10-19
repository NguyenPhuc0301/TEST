import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { courses, results } from '../data/sampleData';
import { Button, Card, Row, colors } from '../components/ui';

export default function ProfileScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { student, updateStudent } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);

  // đồng bộ lại form khi dữ liệu được nạp từ AsyncStorage
  useEffect(() => {
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
  }, [student]);

  const save = () => {
    if (!name.trim()) return Alert.alert('Lỗi', 'Họ tên không được để trống');
    if (!/^\S+@\S+\.\S+$/.test(email)) return Alert.alert('Lỗi', 'Email không hợp lệ');
    if (!/^[0-9]{9,11}$/.test(phone)) return Alert.alert('Lỗi', 'Số điện thoại phải gồm 9-11 chữ số');
    updateStudent({ name: name.trim(), email: email.trim(), phone: phone.trim() });
    setEditing(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin cá nhân');
  };

  const gpa = results.reduce((s, r) => s + r.total * (courses.find(c => c.id === r.courseId)?.credits ?? 0), 0) /
    results.reduce((s, r) => s + (courses.find(c => c.id === r.courseId)?.credits ?? 0), 0);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Card>
          <Text style={s.h}>Thông tin sinh viên</Text>
          <Row label="Mã sinh viên" value={student.id} />
          <Row label="Lớp" value={student.className} />
          <Row label="Ngành học" value={student.major} />
          {editing ? (
            <>
              <Text style={s.label}>Họ tên</Text>
              <TextInput style={s.input} value={name} onChangeText={setName} />
              <Text style={s.label}>Email</Text>
              <TextInput style={s.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              <Text style={s.label}>Số điện thoại</Text>
              <TextInput style={s.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              <Button title="Lưu thay đổi" onPress={save} color={colors.green} />
              <Button title="Hủy" onPress={() => setEditing(false)} color={colors.sub} />
            </>
          ) : (
            <>
              <Row label="Họ tên" value={student.name} />
              <Row label="Email" value={student.email} />
              <Row label="Số điện thoại" value={student.phone} />
              <Button title="✏️ Chỉnh sửa thông tin" onPress={() => setEditing(true)} />
            </>
          )}
        </Card>

        <Text style={s.h2}>Kết quả học tập (GPA hệ 10: {gpa.toFixed(2)})</Text>
        {results.map(r => {
          const c = courses.find(x => x.id === r.courseId);
          return (
            <Card key={r.courseId} onPress={() => nav.navigate('ResultDetail', { courseId: r.courseId })}>
              <Text style={{ fontWeight: '600', color: colors.text }}>{c?.name}</Text>
              <Text style={{ color: colors.sub, marginTop: 3 }}>
                Tổng kết: {r.total.toFixed(1)} • Điểm chữ: {r.grade}
              </Text>
            </Card>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  h: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 6 },
  h2: { fontSize: 17, fontWeight: '700', color: colors.text, marginVertical: 12 },
  label: { color: colors.sub, marginTop: 10, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff' },
});
