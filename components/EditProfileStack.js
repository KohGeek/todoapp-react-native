import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import EditProfileMain from './_JD/EditProfileMain.js';
import EditUsernameScreen from './_JD/EditUsernameScreen.js';
import EditPasswordScreen from './_JD/EditPasswordScreen.js';

import {defineAnimation} from 'react-native-reanimated';

const Stack1 = createNativeStackNavigator();

function ScreenStack() {
  return (
    <Stack1.Navigator
      initialRouteName="Edit Profile"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#2c2f33'}, //ori grey 
      }}>
      <Stack1.Screen name="Edit Profile" component={EditProfileMain} />
      <Stack1.Screen name="Edit Username/Email" component={EditUsernameScreen} />
      <Stack1.Screen name="Edit Password" component={EditPasswordScreen} />
    </Stack1.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ScreenStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 24,
    margin: 3,
  },
  input: {
    color: 'blue',
    fontSize: 24,
    margin: 3,
    textAlign: 'right',
  },
  result: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 3,
    textAlign: 'right',
  },
});
