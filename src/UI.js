import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

/* Input with label */
class InputWithLabel extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation === 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View
        style={[inputStyles.container, { flexDirection: this.orientation }]}>
        <Text backgroundColor="#2c2f33" style={inputStyles.label}>
          {this.props.label ? this.props.label : ''}
        </Text>
        <TextInput
          placeholderTextColor="#99aab5"
          style={[inputStyles.input, this.props.style]}
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          multiline={this.props.multiline ? this.props.multiline : false}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : 'default'
          }
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
          selectTextOnFocus={
            this.props.selectTextOnFocus ? this.props.selectTextOnFocus : false
          }
          editable={this.props.editable !== null ? this.props.editable : true}
        />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    //    marginLeft: 1,
    textAlignVertical: 'center',
    color: 'white',
  },
  input: {
    flex: 2.5,
    fontSize: 20,
    color: 'white',
  },
});

class Input extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation === 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View
        style={[inputStyles2.container, { flexDirection: this.orientation }]}>
        <TextInput
          style={[inputStyles2.input, this.props.style]}
          placeholderTextColor="white"
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          multiline={this.props.multiline ? this.props.multiline : false}
          keyboardType={
            this.props.keyboardType ? this.props.keyboardType : 'default'
          }
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
          selectTextOnFocus={
            this.props.selectTextOnFocus ? this.props.selectTextOnFocus : false
          }
          editable={this.props.editable !== null ? this.props.editable : true}
        />
      </View>
    );
  }
}

const inputStyles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
    color: 'white',
  },
  input: {
    flex: 3,
    fontSize: 20,
  },
});

/* App Button */
class AppButton extends Component {
  constructor(props) {
    super(props);

    if (props.theme) {
      switch (props.theme) {
        case 'success':
          this.backgroundColor = '#6360F3';
          break;
        case 'info':
          this.backgroundColor = '#31b0d5';
          break;
        case 'warning':
          this.backgroundColor = '#ec971f';
          break;
        case 'danger':
          this.backgroundColor = '#c9302c';
          break;
        case 'primary':
        default:
          this.backgroundColor = '#286090';
      }
    } else {
      this.backgroundColor = '#286090';
    }
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : ''
        }>
        <View
          style={[
            buttonStyles.button,
            { backgroundColor: this.backgroundColor },
          ]}>
          <Text style={buttonStyles.buttonText}>{this.props.title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const buttonStyles = StyleSheet.create({
  button: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: 150,
    justifyContent: 'center',
  },
  buttonText: {
    padding: 10,
    fontSize: 15,
    color: 'white',
    textTransform: 'uppercase',
  },
});

/* Export Modules */
module.exports = {
  Input: Input,
  InputWithLabel: InputWithLabel,
  AppButton: AppButton,
};
