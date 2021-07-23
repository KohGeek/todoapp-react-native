import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import color from '../app/config/colors';

export default function Header() {
  return <View style={stlyes.header}></View>;
}

const stlyes = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: color.secondary,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
