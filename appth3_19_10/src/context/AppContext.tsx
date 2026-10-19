import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Assignment, Student } from '../data/types';
import { initialAssignments, initialStudent } from '../data/sampleData';

type Ctx = {
  student: Student;
  assignments: Assignment[];
  updateStudent: (patch: Partial<Student>) => void;
  toggleAssignment: (id: string) => void;
  loaded: boolean;
};

const AppContext = createContext<Ctx>(null as unknown as Ctx);
const KEY = 'appth3_19_10_state';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [student, setStudent] = useState<Student>(initialStudent);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [loaded, setLoaded] = useState(false);

  // Đọc dữ liệu đã lưu
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.student) setStudent(saved.student);
          if (saved.assignments) setAssignments(saved.assignments);
        }
      } catch (e) {
        console.warn('Không đọc được dữ liệu', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Lưu khi dữ liệu thay đổi
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(KEY, JSON.stringify({ student, assignments })).catch(() => {});
  }, [student, assignments, loaded]);

  const updateStudent = (patch: Partial<Student>) => setStudent(s => ({ ...s, ...patch }));
  const toggleAssignment = (id: string) =>
    setAssignments(list => list.map(a => (a.id === id ? { ...a, completed: !a.completed } : a)));

  return (
    <AppContext.Provider value={{ student, assignments, updateStudent, toggleAssignment, loaded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
