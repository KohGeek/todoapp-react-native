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

  // const slashing = () => {
  //   toggleCheckBox != false ? false : true;
  // };

  return (
    <TouchableHighlight onPress={() => console.log('You touched me')}>
      <View style={stlyes.wrapper}>
        <CheckBox
          style={stlyes.checkboxes}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
          }}
        />
        <Text
          style={
            (stlyes.item,
            toggleCheckBox
              ? {
                  textDecorationLine: 'line-through',
                  position: 'relative',
                  top: 5,
                }
              : { position: 'relative', top: 5 })
          }>
          {item.text}
        </Text>

        {/* <Text
          style={
            (stlyes.subitem,
            toggleCheckBox ? { textDecorationLine: 'line-through' } : {})
          }>
          {'\n' + item.subtext[0]}
        </Text> */}
      </View>
    </TouchableHighlight>
  );
}

const stlyes = StyleSheet.create({
  checkboxes: {
    // backgroundColor: 'gold',
  },
  item: {
    position: 'relative',
    top: 5,
  },

  slash: {
    textDecorationLine: 'line-through',
  },
  subitem: {},

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
