import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import MainScreen from './mainScreen';
import ProfileScreen from '../screens/signInScreen';
import RegisterScreen from '../screens/registerScreen';
import ShowScreen from '../screens/showScreen'; // For testing purpose
import AddTaskScreen from './addTask';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditAccountDetails from '../screens/EditAccountDetails';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Index" component={ProfileScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Show" component={ShowScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen
          name="EditAccountDetails"
          component={EditAccountDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
