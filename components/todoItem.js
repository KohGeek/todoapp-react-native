import React from 'react';
import {Text, StyleSheet, TouchableHighlight, View} from 'react-native';

export default function TodoItem({item}) {
  return (
    <TouchableHighlight onPress={() => console.log('You touched me')}>
      <View>
        <Text style={stlyes.item}>{item.text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const stlyes = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
