import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';

import { styles } from '../style';

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState('');
  const changeHandler = val => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input_box}
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
