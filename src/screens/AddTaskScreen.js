import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {Input} from '~/src/UI.js';
import {ColorPicker} from 'react-native-btr';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {styles} from '../style';

let SQLite = require('react-native-sqlite-storage');

const dateFormat = function (date) {
  let day = date.getDay();
  let dateOfMonth = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
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

  return `${daysText[day]}, ${monthsText[month]} ${dateOfMonth}, ${year}`;
};

const timeFormat = function (date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

export default class AddTaskScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Task',
    };
  };

  constructor(props) {
    super(props);

    this.db = SQLite.openDatabase(
      {name: 'todo.sqlite', createFromLocation: '~todo.sqlite'},
      this.openDb,
      this.errorDb,
    );

    let data = JSON.parse(this.props.route.params.data);
    let reminder = JSON.parse(data.reminder);

    console.log(data.colour);

    this.state = {
      datePickerShow: false,
      timePickerShow: false,
      selectedColor: data.colour || 'white',
      priority: data.priority || '',
      title: data.name || '',
      labelColor: 'white',

      taskId: data.id,

      //Reminder
      dateText: reminder.dateText || '',
      timeText: reminder.timeText || '0000',

      //For button styling usage
      prioBtn1Color: '#313437',
      prioBtn2Color: '#313437',
      prioBtn3Color: '#313437',
    };
  }

  //REMEMBER TO CREATE REFRESH ON MAIN SCREEN AFTER INSERT DATA
  _insertTask(taskId) {
    let obj = {dateText: this.state.dateText, timeText: this.state.timeText};
    let reminder = JSON.stringify(obj);
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
          (trx, results) => {
            console.log(this.state.title + ' is updated successful!');
          },
          (trx, error) => {
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
    let obj = {dateText: this.state.dateText, timeText: this.state.timeText};
    let reminder = JSON.stringify(obj);
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
          (trx, results) => {
            console.log(this.state.title + 'is added successful!');
          },
          (trx, error) => {
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
    this.setState({datePickerShow: true});
  };

  setDate = (event, date) => {
    if (date) {
      this.setState({
        date: date,
        dateText: dateFormat(date),
        datePickerShow: false,
      });
    } else {
      this.setState({datePickerShow: false});
    }
  };

  openTimePicker = async () => {
    this.setState({timePickerShow: true});
  };

  setTime = (event, time) => {
    if (time) {
      this.setState({
        time: time,
        timeText: timeFormat(time),
        timePickerShow: false,
      });
    } else {
      this.setState({timePickerShow: false});
    }
  };

  componentDidMount() {
    if (this.state.priority === 'L') {
      this.setState({prioBtn1Color: 'red'});
    } else if (this.state.priority === 'M') {
      this.setState({prioBtn2Color: 'red'});
    } else if (this.state.priority === 'H') {
      this.setState({prioBtn3Color: 'red'});
    }
  }

  render() {
    return (
      <View style={styles.flex1}>
        {/* Header */}
        <View
          style={[
            styles.addTaskHeader,
            {
              backgroundColor: this.state.selectedColor,
              flex: 0.1125,
              flexDirection: 'row',
            },
          ]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, marginLeft: 20}}>
            <Icon
              name="arrow-back"
              size={30}
              color="black"
              borderColor="blue"
            />
          </TouchableOpacity>

          <Text style={[styles.title, {flex: 9}]}>
            {this.props.route.params.action}
          </Text>

          <TouchableOpacity
            style={{flex: 2}}
            onPress={() => {
              if (this.state.taskId != null) {
                this._insertTask(this.state.taskId);
                console.log('Ready to update task!!');
                Alert.alert('Task edited successfully !');
                this.props.navigation.goBack();
              } else {
                this._insertNewTask();
                console.log('Ready to add task!!');
                Alert.alert('Task added successfully !');
                this.props.navigation.goBack();
              }
            }}>
            <Icon
              // style={styles.userIcon}
              name="checkmark-sharp"
              size={30}
              color="black"
              borderColor="blue"
            />
          </TouchableOpacity>
        </View>

        {/* Task adding */}
        <ScrollView style={{backgroundColor: '#161718', flex: 1}}>
          {/* Title */}
          <View style={styles.view}>
            <Text style={[styles.label, {color: this.state.labelColor}]}>
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
              selectTextOnFocus={true}
            />
          </View>

          {/* Color Picker */}
          <View style={styles.view}>
            <Text style={styles.label}>Color</Text>

            <View style={styles.addTaskwrapper}>
              <ColorPicker
                selectedColor={this.state.selectedColor}
                onSelect={selectedColor => {
                  this.setState({
                    selectedColor: selectedColor,
                  });
                }}
              />

              <Text style={{textAlign: 'center', color: 'white'}}>
                Scroll for more colors.
              </Text>
            </View>
          </View>

          {/* Priority */}
          <View style={styles.view}>
            <Text style={styles.label}>Priority</Text>

            <View style={[styles.priority, {flex: 1, flexDirection: 'row'}]}>
              <View style={{flex: 1, paddingRight: 5}}>
                <TouchableOpacity
                  style={[
                    styles.touchableBtn,
                    {
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
                  <Text style={styles.buttonText}>Low</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.flex1}>
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
                  <Text style={styles.buttonText}>Medium</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, paddingLeft: 5}}>
                <TouchableOpacity
                  style={[
                    styles.touchableBtn,
                    {
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
                  <Text style={styles.buttonText}>High</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Reminder */}
          <View style={styles.view}>
            <Text style={[styles.label]}>Reminder</Text>

            <View style={{padding: 15}}>
              <Text style={[styles.label]}>Date</Text>

              <TouchableOpacity
                style={{backgroundColor: 'white', borderRadius: 50}}
                onPress={this.openDatePicker}>
                <View>
                  <Input
                    style={styles.inputStyle}
                    value={this.state.dateText}
                    placeholder="Event Date"
                    editable={false}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </TouchableOpacity>
              {this.state.datePickerShow && (
                <RNDateTimePicker
                  mode="date"
                  mininmumDate={new Date()}
                  maximumDate={new Date(2099, 11, 31)}
                  value={new Date()}
                  onChange={this.setDate}
                />
              )}

              <Text style={[styles.label]}>Time</Text>

              <TouchableOpacity
                style={{backgroundColor: 'white', borderRadius: 50}}
                onPress={this.openTimePicker}>
                <View>
                  <Input
                    style={styles.inputStyle}
                    value={this.state.timeText}
                    placeholder="Event Time"
                    editable={false}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </TouchableOpacity>
              {this.state.timePickerShow && (
                <RNDateTimePicker
                  mode="time"
                  value={new Date()}
                  onChange={this.setTime}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
