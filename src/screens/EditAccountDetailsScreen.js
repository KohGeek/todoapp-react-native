import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';
import { validatePassword } from '../components/functions';
import { InputWithLabel, AppButton } from '../src/UI';
import { styles } from '../style';

function FetchData({ username }) {
  useFocusEffect(() => {});
  return null;
}
export default class EditAccountDetails extends Component {
  static navigationOptions = {
    title: 'EditAccountDetails',
  };

  constructor(props) {
    super(props);

    this.newdata = {
      username: '',
      email: '',
    };

    this.object = {
      new_username: '',
      new_email: '',
      current_password: '',
      new_password1: '',
      new_password2: '',
      email_change: false,
      username_change: false,
      password_change: false,
    };

    var data = this.props.route.params;

    this.state = {
      username: data.username, //current username
      email: data.email, //current email
    };
  }

  async _saveSetting(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _saveSettings(new_username, new_email) {
    try {
      let var1 = ['username', new_username];
      console.log('var1: ' + var1);

      if (new_email) {
        let var2 = ['email', new_email];
        console.log('var2: ' + var2);
        await AsyncStorage.multiSet([var1, var2]);
      } else {
        await AsyncStorage.multiSet([var1]);
      }
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  _update() {
    var url = `${Config.API_URL}:${Config.API_PORT}/api/update`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_username: this.state.username,
        current_password: this.object.current_password,
        username: this.object.new_username,
        email: this.object.new_email,
        password: this.object.new_password1,
        email_change: this.object.email_change,
        username_change: this.object.username_change,
        password_change: this.object.password_change,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ' : ' + response.json().message);
        }
        return response.json();
      })
      .then(async data => {
        this.newdata.username = data.username;
        this.newdata.email = data.email;
        this._saveSettings(this.newdata.username, this.newdata.email);
      })
      .catch(error => {
        console.error(error);
      });
  }

  pressHandler = () => {
    if (this.object.current_password == '') {
      Alert.alert('Please enter your Current Password!');
    } else {
      let passwordCheck = validatePassword(
        this.object.new_password1,
        this.object.new_password2,
      );
      if (passwordCheck == 0) {
        console.log('password match');
        this.object.password_change = true;
      } else if (passwordCheck == 2) {
        Alert.alert('Passwords do not match!');
        return;
      }
      if (this.object.new_email != '') {
        console.log('email change');
        this.object.email_change = true;
      }
      if (this.object.new_username != '') {
        console.log('username change');
        this.object.username_change = true;
      }
      this._update();
      this.props.navigation.pop(2);
    }
  };

  render() {
    return (
      <>
        <FetchData username={this.state.username} />
        <ScrollView
          style={{
            backgroundColor: '#2c2f33',
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: '#000000',
              flexwrap: 'wrap',
              flexDirection: 'row',
              borderColor: '#BFBFBF',
              //marginTop: '1%',
              //marginBottom: 40,
            }}>
            <Text style={styles.userinfo}> {this.state.username} </Text>
          </View>

          <View
            style={{
              flexwrap: 'wrap',
              flexDirection: 'row',
              backgroundColor: '#1A1B1E',
            }}>
            <InputWithLabel
              label="Current Password"
              style={styles.passinput}
              placeholder={'Please fill this first'}
              onChangeText={current_password => {
                this.object.current_password = current_password;
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}
              orientation={'horizontal'}
            />
          </View>

          <View
            style={{
              //marginTop: 10,
              borderColor: 'white',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />

          <View
            style={{
              marginTop: '5%',
              marginBottom: '5%',
              flexwrap: 'wrap',
              flexDirection: 'row',
            }}>
            <InputWithLabel
              style={styles.newinput}
              label={'New Username'}
              placeholder={'Type here (Optional)'}
              onChangeText={new_username => {
                this.object.new_username = new_username;
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}
              orientation={'horizontal'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              borderColor: 'white',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />

          <View
            style={{
              marginTop: '5%',
              marginBottom: '5%',
              flexwrap: 'wrap',
              flexDirection: 'row',
            }}>
            <InputWithLabel
              style={styles.newinput}
              label={'New Email'}
              placeholder={'Type here (Optional)'}
              onChangeText={new_email => {
                this.object.new_email = new_email;
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}
              orientation={'horizontal'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              borderColor: 'white',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />

          <View
            style={{
              marginTop: '5%',
              marginBottom: '5%',
              flexwrap: 'wrap',
              flexDirection: 'row',
            }}>
            <InputWithLabel
              style={styles.newinput}
              label={'New Password'}
              placeholder={'Type here (Optional)'}
              secureTextEntry={true}
              onChangeText={new_password1 => {
                this.object.new_password1 = new_password1;
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}
              orientation={'horizontal'}
            />
          </View>

          <View
            style={{
              flexwrap: 'wrap',
              flexDirection: 'row',
            }}>
            <InputWithLabel
              style={styles.newinput}
              label={'Re-Type Password'}
              placeholder={'Re-Type new password'}
              secureTextEntry={true}
              onChangeText={new_password2 => {
                this.object.new_password2 = new_password2;
              }}
              keyboardType={'default'}
              selectTextOnFocus={true}
              orientation={'horizontal'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              borderColor: 'white',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />

          <View style={{ alignItems: 'center', marginTop: 10, flex: 0 }}>
            <AppButton
              title="SAVE"
              theme="success"
              onPress={() => this.pressHandler()}></AppButton>
          </View>
        </ScrollView>
      </>
    );
  }
}
