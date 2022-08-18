import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../style';
import {emptyTodo} from './functions';
export default function Footer({navigation}) {
  const buttonClickHandler = () => {
    navigation.navigate('AddTask', {
      data: JSON.stringify(emptyTodo),
      action: 'Add Task',
    });
  };

  return (
    <View style={styles.header_footer}>
      <TouchableOpacity style={styles.addButton} onPress={buttonClickHandler}>
        <Icon name="plus" size={30} color="#900" style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
}
