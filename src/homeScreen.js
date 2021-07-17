import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import color from './app/config/color';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Madoka} from 'react-native-textinput-effects';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bottom_panel}></View>
        <View style={styles.taskbar}>
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

          {/* <Icon name="calendar" size={30} color="white" /> */}
        </View>

        <View style={styles.sub_container}>
          {/* <TextInput
            style={styles.addTask}
            placeholderTextColor="white"
            placeholder="Add task"
          /> */}

          <View style={styles.addContainer}>
            {/* <Icon1
            name="ios-add-circle-outline"
            size={30}
            color="white"
            borderColor="blue"
          /> */}
            <Madoka
              style={styles.inputStyle}
              label={'+ Add Task'}
              // this is used as active and passive border color
              borderColor={'#aee2c9'}
              inputPadding={16}
              labelHeight={24}
              labelStyle={{color: '#008445'}}
              inputStyle={{color: '#f4a197'}}
            />
          </View>

          <View style={styles.task}></View>
        </View>
      </View>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  addContainer: {
    flexDirection: 'row',
  },

  addTask: {
    borderRadius: 8,
    color: color.white,
    borderWidth: 3,
    borderColor: 'blue',
  },

  bottom_panel: {
    backgroundColor: color.secondary,
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  container: {
    backgroundColor: color.primary,
    flex: 10,
  },

  date: {
    color: color.white,
    fontSize: 20,
    top: 10,
  },

  days: {
    fontSize: 50,
    color: color.white,
  },

  inputStyle: {
    flex: 1,
  },

  sub_container: {
    justifyContent: 'center',
    alignContent: 'center',
    top: 20,
  },

  task: {
    backgroundColor: '#8cd49f',
    width: '100%',
    height: 50,
    borderRadius: 8,
    top: 20,
  },

  taskbar: {
    backgroundColor: color.secondary,
    width: '100%',
    height: '20%',
    borderRadius: 8,
  },

  time_info: {
    // backgroundColor: 'red',
    alignSelf: 'flex-start', // == inline block
    top: 15,
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
    // position: 'absolute',
    // color: 'black',
  },
});
