import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import color from '../app/config/colors';
import { syncToServer } from './functions';

export default function Header({ navigation, _update }) {
  const pressHandler = () => {
    navigation.navigate('EditProfileScreen');
  };

  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('DD MMM YYYY');
    setCurrentDate(date);
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.time_info}>
        <Text style={styles.days}>Today</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => syncToServer('pull')}>
          <Icon
            style={styles.userIcon}
            name="cloud-upload"
            size={30}
            color="white"
            borderColor="blue"
          />
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Icon
            style={styles.userIcon}
            name="sort-amount-desc"
            size={30}
            color="white"
            borderColor="blue"
          />
        </TouchableOpacity> */}

        <TouchableOpacity onPress={pressHandler}>
          <Icon
            style={styles.userIcon}
            name="user-circle"
            size={30}
            color="white"
            borderColor="blue"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    color: color.white,
    fontSize: 20,
    paddingLeft: 10,
  },

  days: {
    fontSize: 50,
    color: color.white,
    paddingLeft: 10,
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

  userIcon: {
    // padding: 1,
  },
});
