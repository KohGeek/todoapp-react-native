import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './mainScreen';
import ProfileScreen from '../screens/signInScreen';
import RegisterScreen from '../screens/registerScreen';

const stackContainer = createStackNavigator(
  {
    Index: {
      screen: MainScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(stackContainer);
