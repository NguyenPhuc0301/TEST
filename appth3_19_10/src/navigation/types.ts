export type RootStackParamList = {
  Main: undefined;
  CourseDetail: { courseId: string };
  LessonDetail: { lessonId: string };
  AssignmentDetail: { assignmentId: string };
  ResultDetail: { courseId: string };
};
export type TabParamList = {
  Home: undefined;
  Courses: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Profile: undefined;
};
