import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './mainScreen';
import ProfileScreen from '../screens/signInScreen';
import RegisterScreen from '../screens/registerScreen';
import AddTaskScreen from './addTask';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditAccountDetails from '../screens/EditAccountDetails';
import { isLoggedIn } from './functions';

const Stack = createNativeStackNavigator();

function useLoggedInStatus() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(async () => {
    await isLoggedIn().then(res => {
      setLoggedIn(res);
    });
  }, []);

  return loggedIn;
}

function AppNavigation() {
  var isLogged = useLoggedInStatus();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{
          headerShown: false,
        }}>
        {isLogged ? (
          <Stack.Group>
            <Stack.Screen name="Initial" component={MainScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Initial" component={ProfileScreen} />
          </Stack.Group>
        )}
        <Stack.Screen name="Index" component={ProfileScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
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
