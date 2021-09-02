import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text } from 'react-native';

import {   
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList, } from '@react-navigation/drawer';

import MainScreen from './mainScreen';
import ProfileScreen from '../screens/signInScreen';
import RegisterScreen from '../screens/registerScreen';
import ShowScreen from '../screens/showScreen'; // For testing purpose
import AddTaskScreen from './addTask';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props){
  return(
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex:1, 
          flexDirection:'row',
          backgroundColor:'#a80000',
          
          }}
          >
          <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            alignItems: 'center',
            // marginTop: 25,
            // marginLeft: 10,
            margin:20,
            color: 'white',
          }}>
          Main Menu
        </Text>
      </View>

      <DrawerItemList {...props}/>

      {/* <DrawerItem
        label="Home"
        labelStyle={{
          fontSize: 30,
          fontFamily: 'notoserif',
        }}
        activeTintColor="purple"
        inactiveTintColor="blue"
        activeBackgroundColor="black"
        inactiveBackgroundColor="white"
        onPress={() =>{
          props.navigation.navigate('Home')
        }}
      />

      <DrawerItem
        label="Profile"
        labelStyle={{
          fontSize: 30,
          fontFamily: 'notoserif',
        }}
        activeTintColor="purple"
        inactiveTintColor="blue"
        activeBackgroundColor="black"
        inactiveBackgroundColor="white"
        onPress={() =>{
          props.navigation.navigate('Profile')
        }}
      />

      <DrawerItem
        label="Sync Now"
        labelStyle={{
          fontSize: 30,
          fontFamily: 'notoserif',
        }}
        activeTintColor="purple"
        inactiveTintColor="blue"
        activeBackgroundColor="black"
        inactiveBackgroundColor="white"
        onPress={() =>{
          props.navigation.navigate('Profile')
        }}
      />

      <DrawerItem
        label="Log out"
        labelStyle={{
          fontSize: 30,
          fontFamily: 'notoserif',
        }}
        activeTintColor="purple"
        inactiveTintColor="blue"
        activeBackgroundColor="black"
        inactiveBackgroundColor="white"
        onPress={() =>{
          props.navigation.navigate('Log out')
        }}
      /> */}

    </DrawerContentScrollView>
  )
}


function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName="Index"

      drawerContent={props => <CustomDrawerContent {...props} />}

      screenOptions={{
        // headerMode: 'screen',
        // headerTintColor: 'black',
        // headerStyle: {backgroundColor:'blue'},
        headerShown:false,
        drawerLabelStyle:{
          //backgroundColor:'white',
          color:'white',
          fontSize: 25,
          fontFamily:'Roboto',
        },

        drawerActiveBackgroundColor:'#313437',
        drawerInactiveTintColor:'grey',

        drawerStyle:{
          backgroundColor:'#161718',
          width:250,
        },

        drawerPosition:'left',

        useNativeAnimations: true,

        backBehavior:'initialRoute',
      }}
    
    
    
    >
    <Drawer.Screen name="Index" component={MainScreen}
      options={{
        
      }} />    
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Register"  component={RegisterScreen}/>
    <Drawer.Screen name="Show" component={ShowScreen} />
    <Stack.Screen name="AddTask" component={AddTaskScreen} />

    </Drawer.Navigator>
  )
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Index" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Show" component={ShowScreen} />
        {/* <Stack.Screen name="Root" component = {MyDrawer} options={{headerShown:false}}/> */}
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
