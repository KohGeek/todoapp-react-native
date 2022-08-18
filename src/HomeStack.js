import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EditAccountDetailsScreen from './screens/EditAccountDetailsScreen';
import {isLoggedIn} from './components/functions';

const Stack = createNativeStackNavigator();

function useLoggedInStatus() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const loginStatus = await isLoggedIn();
      setLoggedIn(loginStatus);
    }
    fetchData();
  }, []);

  return loggedIn;
}

function AppNavigation() {
  let isLogged = useLoggedInStatus();

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
          component={EditAccountDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
