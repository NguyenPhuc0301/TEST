export type Student = {
  id: string; name: string; className: string; major: string; email: string; phone: string;
};
export type Course = {
  id: string; code: string; name: string; credits: number; teacher: string; description: string;
};
export type Lesson = {
  id: string; courseId: string; day: number; start: string; end: string; room: string; note: string;
};
export type Assignment = {
  id: string; courseId: string; title: string; description: string; dueDate: string; completed: boolean;
};
export type Result = {
  courseId: string; process: number; midterm: number; final: number; total: number; grade: string;
};
