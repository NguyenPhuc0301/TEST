import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../components/ui';

const Tab = createBottomTabNavigator<TabParamList>();
const icon = (e: string) => () => <Text style={{ fontSize: 20 }}>{e}</Text>;

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: colors.primary, headerTitleAlign: 'center' }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Tổng quan', tabBarIcon: icon('🏠') }} />
      <Tab.Screen name="Courses" component={CoursesScreen} options={{ title: 'Môn học', tabBarIcon: icon('📚') }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Thời khóa biểu', tabBarLabel: 'TKB', tabBarIcon: icon('🗓️') }} />
      <Tab.Screen name="Assignments" component={AssignmentsScreen} options={{ title: 'Bài tập', tabBarIcon: icon('📝') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân', tabBarIcon: icon('👤') }} />
    </Tab.Navigator>
  );
}
