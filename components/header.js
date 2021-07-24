import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import color from '../app/config/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.time_info}>
        <Text style={styles.days}>Today</Text>
        <Text style={styles.date}>03 July 2021</Text>
      </View>
      <View style={styles.userContainer}>
        <Icon
          style={styles.userIcon}
          name="calendar"
          size={30}
          color="white"
          borderColor="blue"
        />
        <Icon
          style={styles.userIcon}
          name="sort-amount-desc"
          size={30}
          color="white"
          borderColor="blue"
        />
        <Icon
          style={styles.userIcon}
          name="user-circle"
          size={30}
          color="white"
          borderColor="blue"
        />
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

  userContainer: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    // backgroundColor: 'red',
    width: 150,
  },
});
