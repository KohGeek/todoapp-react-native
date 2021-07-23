import React, { useState } from 'react';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TodoItem({ item }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [slashedText, setSlashedText] = useState(false);

  // const slashing = () => {
  //   toggleCheckBox != false
  //     ? (setToggleCheckBox(false), setSlashedText(false))
  //     : (setToggleCheckBox(true), setSlashedText(true));
  // };

  // const slashing = () => {
  //   toggleCheckBox != false
  //     ? console.log('text is normal')
  //     : console.log('text is slashed');
  // };

  const slashing = () => {
    toggleCheckBox != false
      ? console.log('text is normal')
      : console.log('text is slashed');
  };

  return (
    <TouchableHighlight onPress={() => console.log('You touched me')}>
      <View style={stlyes.wrapper}>
        <CheckBox
          style={stlyes.checkboxes}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
            slashing();
          }}
        />
        <Text style={stlyes.item}>{item.text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const stlyes = StyleSheet.create({
  item: {
    // padding: 16,
    // marginTop: 16,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderRadius: 10,
    // backgroundColor: 'white',
    // textDecorationLine: 'line-through',
    // textDecorationStyle: 'solid',
  },
  checkboxes: {
    backgroundColor: 'gold',
  },
  wrapper: {
    padding: 16,
    marginTop: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
  },
});
