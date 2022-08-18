import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, TouchableHighlight, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {styles} from '../style';

export default function TodoItem({item, _complete, _update}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (item.colour != null) {
      setColor(item.colour);
    }
  }, [item]);

  var style = StyleSheet.create({
    wrap_box: {backgroundColor: color},
  });

  return (
    <TouchableHighlight onPress={() => console.log('You touched me')}>
      <View style={StyleSheet.compose(styles.wrapper, style.wrap_box)}>
        <CheckBox
          style={styles.checkboxes}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => {
            setToggleCheckBox(newValue);
            console.log(item.id + ' is set to ' + newValue);
            if (newValue === 0) {
              _complete(item.id, 'false');
            } else if (newValue === 1) {
              _complete(item.id, 'true');
            }
          }}
        />
        <Text
          style={
            (styles.item,
            toggleCheckBox
              ? {
                  textDecorationLine: 'line-through',
                  position: 'relative',
                  top: 5,
                }
              : {position: 'relative', top: 5})
          }>
          {item.name}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
