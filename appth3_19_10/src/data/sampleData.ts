import { Assignment, Course, Lesson, Result, Student } from './types';

export const initialStudent: Student = {
  id: '2251120001',
  name: 'Đoàn Thế Bảo',
  className: 'CNTT K65',
  major: 'Công nghệ thông tin',
  email: 'an.nv@sv.edu.vn',
  phone: '0901234567',
};

export const courses: Course[] = [
  { id: 'c1', code: 'IT4409', name: 'Lập trình di động', credits: 3, teacher: 'ThS. Trần Minh Quân', description: 'Xây dựng ứng dụng di động đa nền tảng với React Native, điều hướng, quản lý trạng thái và lưu trữ dữ liệu.' },
  { id: 'c2', code: 'IT3090', name: 'Cơ sở dữ liệu', credits: 3, teacher: 'TS. Lê Thu Hà', description: 'Mô hình quan hệ, SQL, chuẩn hóa và thiết kế cơ sở dữ liệu.' },
  { id: 'c3', code: 'IT3100', name: 'Lập trình hướng đối tượng', credits: 2, teacher: 'ThS. Phạm Đức Anh', description: 'Các nguyên lý OOP: đóng gói, kế thừa, đa hình, trừu tượng.' },
  { id: 'c4', code: 'IT3080', name: 'Mạng máy tính', credits: 3, teacher: 'TS. Vũ Hoàng Nam', description: 'Mô hình OSI, TCP/IP, định tuyến và các giao thức tầng ứng dụng.' },
  { id: 'c5', code: 'IT4490', name: 'Công nghệ phần mềm', credits: 3, teacher: 'PGS. Nguyễn Thị Lan', description: 'Quy trình phát triển phần mềm, phân tích yêu cầu, thiết kế và kiểm thử.' },
  { id: 'c6', code: 'MI2020', name: 'Xác suất thống kê', credits: 2, teacher: 'ThS. Đỗ Văn Hải', description: 'Biến ngẫu nhiên, phân phối xác suất, ước lượng và kiểm định giả thuyết.' },
];

// day: 1 = Thứ 2 ... 6 = Thứ 7, 0 = Chủ nhật
export const lessons: Lesson[] = [
  { id: 'l1', courseId: 'c1', day: 1, start: '07:00', end: '09:30', room: 'B1-301', note: 'Học lý thuyết chương Navigation.' },
  { id: 'l2', courseId: 'c2', day: 1, start: '13:00', end: '15:30', room: 'C2-204', note: 'Thực hành truy vấn SQL.' },
  { id: 'l3', courseId: 'c3', day: 2, start: '09:00', end: '11:00', room: 'B1-105', note: 'Ôn tập kế thừa và đa hình.' },
  { id: 'l4', courseId: 'c4', day: 3, start: '07:00', end: '09:30', room: 'D3-402', note: 'Giao thức TCP.' },
  { id: 'l5', courseId: 'c5', day: 4, start: '13:00', end: '15:30', room: 'B1-302', note: 'Báo cáo tiến độ nhóm.' },
  { id: 'l6', courseId: 'c1', day: 5, start: '07:00', end: '09:30', room: 'Lab-A3', note: 'Thực hành FlatList và AsyncStorage.' },
  { id: 'l7', courseId: 'c6', day: 5, start: '13:00', end: '15:00', room: 'C2-101', note: 'Bài tập phân phối chuẩn.' },
  { id: 'l8', courseId: 'c2', day: 6, start: '07:00', end: '09:30', room: 'Lab-B1', note: 'Kiểm tra giữa kỳ thực hành.' },
];

const d = (offset: number) => {
  const x = new Date();
  x.setDate(x.getDate() + offset);
  x.setHours(23, 59, 0, 0);
  return x.toISOString();
};

export const initialAssignments: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Bài thực hành 3: Ứng dụng quản lý học tập', description: 'Xây dựng ứng dụng với Bottom Tab và Stack Navigation, dùng FlatList.', dueDate: d(2), completed: false },
  { id: 'a2', courseId: 'c2', title: 'Bài tập lớn: Thiết kế CSDL', description: 'Vẽ ERD và viết script tạo bảng cho hệ thống quản lý thư viện.', dueDate: d(5), completed: false },
  { id: 'a3', courseId: 'c3', title: 'Bài tập OOP tuần 6', description: 'Cài đặt hệ thống quản lý nhân viên bằng kế thừa.', dueDate: d(-1), completed: true },
  { id: 'a4', courseId: 'c4', title: 'Báo cáo cấu hình mạng LAN', description: 'Mô phỏng mạng LAN bằng Packet Tracer và viết báo cáo.', dueDate: d(7), completed: false },
  { id: 'a5', courseId: 'c5', title: 'Tài liệu đặc tả yêu cầu (SRS)', description: 'Hoàn thiện tài liệu SRS cho đề tài nhóm.', dueDate: d(3), completed: false },
  { id: 'a6', courseId: 'c6', title: 'Bài tập xác suất chương 2', description: 'Giải 10 bài tập về biến ngẫu nhiên rời rạc.', dueDate: d(-3), completed: true },
];

export const results: Result[] = [
  { courseId: 'c1', process: 9.0, midterm: 8.5, final: 8.8, total: 8.8, grade: 'A' },
  { courseId: 'c2', process: 8.0, midterm: 7.5, final: 8.0, total: 7.9, grade: 'B+' },
  { courseId: 'c3', process: 9.5, midterm: 9.0, final: 9.0, total: 9.1, grade: 'A+' },
  { courseId: 'c4', process: 7.0, midterm: 6.5, final: 7.0, total: 6.9, grade: 'B' },
  { courseId: 'c5', process: 8.5, midterm: 8.0, final: 8.5, total: 8.4, grade: 'A' },
  { courseId: 'c6', process: 6.5, midterm: 6.0, final: 6.5, total: 6.4, grade: 'C+' },
];
