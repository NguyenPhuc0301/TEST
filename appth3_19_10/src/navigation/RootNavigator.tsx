import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import TabNavigator from './TabNavigator';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import AssignmentDetailScreen from '../screens/AssignmentDetailScreen';
import ResultDetailScreen from '../screens/ResultDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerBackTitle: 'Quay lại' }}>
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Chi tiết môn học' }} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} options={{ title: 'Chi tiết buổi học' }} />
      <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} options={{ title: 'Chi tiết bài tập' }} />
      <Stack.Screen name="ResultDetail" component={ResultDetailScreen} options={{ title: 'Chi tiết kết quả' }} />
    </Stack.Navigator>
  );
}
