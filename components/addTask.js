import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';

import { InputWithLabel } from './UI';
import { ColorPicker } from 'react-native-btr';
import TimePicker from 'react-native-super-timepicker';

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

export default class addTask extends Component<Props> {
  static navigationOptions = {
    title: 'AddTask',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#161718',
      priority: '',
      repeat: '',
      title: '',
      labelColor: 'white',

      //Reminder
      dateText: '',
      time: '',

      //For button styling usage
      prioBtn1Color: '#313437',
      prioBtn2Color: '#313437',
      prioBtn3Color: '#313437',

      rptBtn1Color: '#313437',
      rptBtn2Color: '#313437',
      rptBtn3Color: '#313437',
    };
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
            { backgroundColor: this.state.selectedColor, flex: 0.1125 },
          ]}>
          {/* Not yet implement onPress */}
          <TouchableOpacity
            style={{ left: -100 }}
            onPress={() => {
              this.setState({
                selectedColor: '#161718',
                priority: '',
                repeat: '',
                title: '',

                //Reminder
                dateText: '',
                time: '',

                prioBtn1Color: '#313437',
                prioBtn2Color: '#313437',
                prioBtn3Color: '#313437',

                rptBtn1Color: '#313437',
                rptBtn2Color: '#313437',
                rptBtn3Color: '#313437',
              });

              alert('Add task cancelled !');
            }}>
            <Image
              style={styles.icon}
              source={require('../Image/cancel-xxl.png')}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Add Task</Text>

          <TouchableOpacity
            style={{ right: -100 }}
            onPress={() => {
              alert(
                'Task added !\n\n' +
                  'Title: ' +
                  this.state.title +
                  '\n' +
                  'Selected Color: ' +
                  this.state.selectedColor +
                  '\n' +
                  'Priority: ' +
                  this.state.priority +
                  '\n' +
                  'Reminder Date: ' +
                  this.state.dateText +
                  '\n' +
                  'Time: ' +
                  this.state.time +
                  '\n' +
                  'Repeat: ' +
                  this.state.repeat,
              );
            }}>
            <Image style={styles.icon} source={require('../Image/tick2.png')} />
          </TouchableOpacity>
        </View>

        {/* Task adding */}
        <ScrollView style={{ backgroundColor: '#161718', flex: 1 }}>
          {/* Title */}
          <View style={styles.view}>
            <Text style={[styles.label, { color: this.state.labelColor }]}>
              Title
            </Text>
            <InputWithLabel
              style={styles.inputStyle}
              value={this.state.title}
              placeholder=" Enter Title"
              onChangeText={title => {
                this.setState({
                  title: title,
                });
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}></InputWithLabel>
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

              <Text style={{ left: 140, color: 'white' }}>
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
                    left: -50,
                    paddingHorizontal: 30,
                    backgroundColor: this.state.prioBtn1Color,
                  },
                ]}
                onPress={() => {
                  this.setState({
                    priority: 'Low',
                    prioBtn1Color: 'red',
                    prioBtn2Color: '#313437',
                    prioBtn3Color: '#313437',
                  });
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
                  this.setState({
                    priority: 'Medium',
                    prioBtn1Color: '#313437',
                    prioBtn2Color: 'red',
                    prioBtn3Color: '#313437',
                  });
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Medium</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    right: -50,
                    paddingHorizontal: 30,
                    backgroundColor: this.state.prioBtn3Color,
                  },
                ]}
                onPress={() => {
                  this.setState({
                    priority: 'High',
                    prioBtn1Color: '#313437',
                    prioBtn2Color: '#313437',
                    prioBtn3Color: 'red',
                  });
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
                  <InputWithLabel
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
                  <InputWithLabel
                    label="Time"
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

          {/* Repeat */}
          <View style={[styles.view, { paddingBottom: 30 }]}>
            <Text style={[styles.label]}>Repeat</Text>

            <View style={[styles.priority]}>
              {/* Issue 1: When first click the value is not stored(OnPress issue) */}
              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    left: -40,
                    paddingHorizontal: 30,
                    backgroundColor: this.state.rptBtn1Color,
                  },
                ]}
                onPress={() => {
                  this.setState({
                    repeat: 'Daily',
                    rptBtn1Color: 'red',
                    rptBtn2Color: '#313437',
                    rptBtn3Color: '#313437',
                  });
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Daily</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  {
                    paddingHorizontal: 25,
                    backgroundColor: this.state.rptBtn2Color,
                  },
                ]}
                onPress={() => {
                  this.setState({
                    repeat: 'Weekly',
                    rptBtn1Color: '#313437',
                    rptBtn2Color: 'red',
                    rptBtn3Color: '#313437',
                  });
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Weekly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.touchableBtn,
                  { right: -40, backgroundColor: this.state.rptBtn3Color },
                ]}
                onPress={() => {
                  this.setState({
                    repeat: 'Monthly',
                    rptBtn1Color: '#313437',
                    rptBtn2Color: '#313437',
                    rptBtn3Color: 'red',
                  });
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Monthly</Text>
              </TouchableOpacity>
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
    color: 'white',
  },
  wrapper: {
    marginVertical: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
