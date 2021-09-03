import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function TodoItem({ item, _complete }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    // console.log(item.completed);
    if (item.completed == 'true') {
      setToggleCheckBox(true);
    }
  }, []);

  return (
    <TouchableHighlight onPress={() => console.log('You touched me')}>
      <View style={stlyes.wrapper}>
        <CheckBox
          style={stlyes.checkboxes}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
            console.log(item.id + 'is set to ' + newValue);
            if (newValue == 0) {
              _complete(item.id, 'false');
            } else if (newValue == 1) {
              _complete(item.id, 'true');
            }
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
          {item.name}
          {item.colour}
        </Text>
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
