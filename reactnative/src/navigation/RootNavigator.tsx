import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import {RootStackParamList} from './types';
import {colors} from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {...DarkTheme, colors: {...DarkTheme.colors, background: colors.bg}};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerStyle: {backgroundColor: colors.surface},
          headerTintColor: colors.text,
          headerBackTitle: 'Quay lại',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({route}) => ({title: route.params.item.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
