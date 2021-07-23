import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import color from '../app/config/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.time_info}>
        <Text style={styles.days}>Today</Text>
        <Text style={styles.date}>03 July 2021</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    color: color.white,
    fontSize: 20,
  },

  days: {
    fontSize: 50,
    color: color.white,
  },

  header: {
    height: '20%',
    width: '100%',
    borderRadius: 8,
    paddingTop: 38,
    backgroundColor: color.secondary,
  },

  time_info: {
    // backgroundColor: 'red',
    alignSelf: 'flex-start', // == inline block
    position: 'absolute',
    bottom: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
