import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function TodoItem({item, pressHandler}) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <Text style={stlyes.item}>{item.text}</Text>
    </TouchableOpacity>
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
