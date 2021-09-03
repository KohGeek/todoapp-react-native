import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import color from '../app/config/colors';
import { emptyTodo } from './functions';
export default function Footer({ navigation }) {
  const buttonClickHandler = () => {
    navigation.navigate('AddTask', {
      data: JSON.stringify(emptyTodo),
    });
  };

  return (
    <View style={stlyes.header}>
      <TouchableOpacity style={stlyes.addButton} onPress={buttonClickHandler}>
        <Icon name="plus" size={30} color="#900" style={stlyes.addIcon} />
      </TouchableOpacity>
    </View>
  );
}

const stlyes = StyleSheet.create({
  addButton: {
    backgroundColor: color.purple,
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    position: 'relative',
    bottom: 50,
  },

  addIcon: {
    color: color.white,
    position: 'relative',
    left: 3,
  },

  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: color.secondary,
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
