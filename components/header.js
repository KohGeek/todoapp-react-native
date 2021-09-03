import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { styles } from '../style';
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
            name="cloud-download"
            size={30}
            color="white"
            borderColor="blue"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => syncToServer('push')}>
          <Icon
            name="cloud-upload"
            size={30}
            color="white"
            borderColor="blue"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={pressHandler}>
          <Icon name="user-circle" size={30} color="white" borderColor="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
