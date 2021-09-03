import React, { Component, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';

import { Input } from '../src/UI.js';
import { ColorPicker } from 'react-native-btr';
import TimePicker from 'react-native-super-timepicker';

let SQLite = require('react-native-sqlite-storage');

Date.prototype.formatted = function () {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let monthsText = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
};

export default class addTask extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Task',
    };
  };

  constructor(props) {
    super(props);

    this.db = SQLite.openDatabase(
      { name: 'tododb4', createFromLocation: '~todo.sqlite' },
      this.openDb,
      this.errorDb,
    );

    let data = JSON.parse(this.props.route.params.data);
    let reminder = JSON.parse(data.reminder);

    this.state = {
      selectedColor: data.colour || 'white',
      priority: data.priority || '',
      title: data.name || '',
      labelColor: 'white',

      taskId: data.id,

      //Reminder
      dateText: reminder.dateText || '',
      time: reminder.time || '0000',

      //For button styling usage
      prioBtn1Color: '#313437',
      prioBtn2Color: '#313437',
      prioBtn3Color: '#313437',
    };
  }

  //REMEMBER TO CREATE REFRESH ON MAIN SCREEN AFTER INSERT DATA
  _insertTask(taskId) {
    var obj = { dateText: this.state.dateText, time: this.state.time };
    var reminder = JSON.stringify(obj);
    this.db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE todo SET name=?,colour=?,priority=?,reminder=? WHERE id=?',
          [
            this.state.title,
            this.state.selectedColor,
            this.state.priority,
            reminder,
            taskId,
          ],
          (tx, results) => {
            console.log(this.state.title + ' is updated successful!');
          },
          (tx, error) => {
            console.log('sql error' + error);
          },
        );
      },
      error => {
        console.log('sql error' + error.message);
      },
      () => {
        console.log('update ok!');
      },
    );
  }

  _insertNewTask() {
    var obj = { dateText: this.state.dateText, time: this.state.time };
    var reminder = JSON.stringify(obj);
    this.db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO todo(name,colour,priority,reminder,completed) VALUES(?,?,?,?,?)',
          [
            this.state.title,
            this.state.selectedColor,
            this.state.priority,
            reminder,
            false,
          ],
          (tx, results) => {
            console.log(this.state.title + 'is added successful!');
          },
          (tx, error) => {
            console.log('sql error' + error);
          },
        );
      },
      error => {
        console.log('sql error' + error.message);
      },
      () => {
        console.log('transaction ok!');
      },
    );
  }

  openDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.date,
        minDate: new Date(),
        maxDate: new Date(2099, 11, 31),
        mode: 'default', // try also with `spinner`
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        let selectedDate = new Date(year, month, day);

        this.setState({
          date: selectedDate,
          dateText: selectedDate.formatted(),
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  onCancel() {
    this.TimePicker.close();
  }

  componentDidMount() {
    if (this.state.priority === 'L') {
      this.setState({ prioBtn1Color: 'red' });
    } else if (this.state.priority === 'M') {
      this.setState({ prioBtn2Color: 'red' });
    } else if (this.state.priority === 'H') {
      this.setState({ prioBtn3Color: 'red' });
    }
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: this.state.selectedColor,
              flex: 0.1125,
              flexDirection: 'row',
            },
          ]}>
          {/* Not yet implement onPress */}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ left: -80 }}>
            <Icon
              style={styles.userIcon}
              name="arrow-back"
              size={30}
              color="black"
              borderColor="blue"
            />
          </TouchableOpacity>

          <Text style={styles.title}>{this.props.route.params.action}</Text>

          <TouchableOpacity
            style={{ right: -80 }}
            onPress={() => {
              if (this.state.taskId != null) {
                this._insertTask(this.state.taskId);
                console.log('Ready to update task!!');
                alert('Task edited successfully !');
                this.props.navigation.navigate('Index', {
                  AddTask: true,
                });
              } else {
                this._insertNewTask();
                console.log('Ready to add task!!');
                alert('Task added successfully !');
                this.props.navigation.navigate('Index', {
                  AddTask: true,
                });
              }
            }}>
            <Icon
              style={styles.userIcon}
              name="checkmark-sharp"
              size={30}
              color="black"
              borderColor="blue"
            />
          </TouchableOpacity>
        </View>

        {/* Task adding */}
        <ScrollView style={{ backgroundColor: '#161718', flex: 1 }}>
          {/* Title */}
          <View style={styles.view}>
            <Text style={[styles.label, { color: this.state.labelColor }]}>
              Title
            </Text>
            <Input
              style={styles.inputStyle}
              value={this.state.title}
              placeholder=" Enter Title"
              onChangeText={title => {
                this.setState({
                  title: title,
                });
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}></Input>
          </View>

          {/* Color Picker */}
          <View style={styles.view}>
            <Text style={styles.label}>Color</Text>

            <View style={styles.wrapper}>
              <ColorPicker
                selectedColor={this.state.selectedColor}
                onSelect={selectedColor => {
                  this.setState({
                    selectedColor: selectedColor,
                  });
                }}
              />

              <Text style={{ left: 110, color: 'white' }}>
                Scroll for more colors.
              </Text>
            </View>
          </View>

          {/* Priority */}
          <View style={styles.view}>
            <Text style={styles.label}>Priority</Text>

            <View style={[styles.priority]}>
              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    left: -25,
                    paddingHorizontal: 30,
                    backgroundColor: this.state.prioBtn1Color,
                  },
                ]}
                onPress={() => {
                  if (this.state.prioBtn1Color === 'red') {
                    this.setState({
                      priority: '',
                      prioBtn1Color: '#313437',
                    });
                  } else {
                    this.setState({
                      priority: 'L',
                      prioBtn1Color: 'red',
                      prioBtn2Color: '#313437',
                      prioBtn3Color: '#313437',
                    });
                  }
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Low</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    paddingVertical: 10,
                    backgroundColor: this.state.prioBtn2Color,
                  },
                ]}
                onPress={() => {
                  if (this.state.prioBtn2Color === 'red') {
                    this.setState({
                      priority: '',
                      prioBtn2Color: '#313437',
                    });
                  } else {
                    this.setState({
                      priority: 'M',
                      prioBtn1Color: '#313437',
                      prioBtn2Color: 'red',
                      prioBtn3Color: '#313437',
                    });
                  }
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Medium</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    right: -25,
                    paddingHorizontal: 30,
                    backgroundColor: this.state.prioBtn3Color,
                  },
                ]}
                onPress={() => {
                  if (this.state.prioBtn3Color === 'red') {
                    this.setState({
                      priority: '',
                      prioBtn3Color: '#313437',
                    });
                  } else {
                    this.setState({
                      priority: 'H',
                      prioBtn1Color: '#313437',
                      prioBtn2Color: '#313437',
                      prioBtn3Color: 'red',
                    });
                  }
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>High</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reminder */}
          <View style={styles.view}>
            <Text style={[styles.label]}>Reminder</Text>

            <View style={{ padding: 15 }}>
              <Text style={[styles.label]}>Date</Text>

              <TouchableOpacity
                style={{ backgroundColor: 'white', borderRadius: 50 }}
                onPress={this.openDatePicker}>
                <View>
                  <Input
                    //label="Date"
                    style={styles.inputStyle}
                    value={this.state.dateText}
                    placeholder="Event Date"
                    editable={false}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </TouchableOpacity>

              <Text style={[styles.label]}>Time</Text>

              <TouchableOpacity onPress={() => this.TimePicker.open()}>
                <View>
                  <Input
                    style={styles.inputStyle}
                    value={this.state.time}
                    placeholder="Event Time"
                    editable={false}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </TouchableOpacity>

              <TimePicker
                ref={ref => {
                  this.TimePicker = ref;
                }}
                onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
  },
  header: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'white',
    backgroundColor: '#313437',
    borderRadius: 50,
  },
  priority: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  touchableBtn: {
    backgroundColor: '#313437',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
  wrapper: {
    marginVertical: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
