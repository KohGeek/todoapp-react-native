import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';

import {Input} from '~/src/UI.js';
import {ColorPicker} from 'react-native-btr';
import TimePicker from 'react-native-super-timepicker';
import {styles} from '../style';

let SQLite = require('react-native-sqlite-storage');

const dateFormat = function () {
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
    let obj = {dateText: this.state.dateText, time: this.state.time};
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
    let obj = {dateText: this.state.dateText, time: this.state.time};
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
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
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
          dateText: dateFormat(selectedDate),
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  onCancel() {
    this.TimePicker.close();
  }

  componentDidMount() {
    if (this.state.priority === 'L') {
      this.setState({prioBtn1Color: 'red'});
    } else if (this.state.priority === 'M') {
      this.setState({prioBtn2Color: 'red'});
    } else if (this.state.priority === 'H') {
      this.setState({prioBtn3Color: 'red'});
    }
  }

  onConfirm(hour, minute) {
    this.setState({time: `${hour}:${minute}`});
    this.TimePicker.close();
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
          {/* Not yet implement onPress */}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, marginLeft: 20}}>
            <Icon
              // style={styles.userIcon}
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
                this.props.navigation.navigate('Main', {
                  AddTask: true,
                });
              } else {
                this._insertNewTask();
                console.log('Ready to add task!!');
                Alert.alert('Task added successfully !');
                this.props.navigation.navigate('Main', {
                  AddTask: true,
                });
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
