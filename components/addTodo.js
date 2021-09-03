import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

import color from '../app/config/colors';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');
  const changeHandler = val => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="New Task..."
        onChangeText={changeHandler}
        placeholderTextColor="white"
      />
      <Button
        onPress={() => submitHandler(text)}
        title="Add New Task"
        color="coral"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 10,
    color: color.white,
  },
});
