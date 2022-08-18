import React, {Component} from 'react';
import {View, Text, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken, syncToServer} from '../components/functions';
import {InputWithLabel, AppButton} from '~/src/UI';
import {styles} from '../style';
import Config from 'react-native-config';

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Login Screen',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      token: '',
      message: '',
    };
  }

  componentDidMount() {
    this._readSettings();
  }

  async _saveSetting(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _saveSettings(username, email, token, message) {
    try {
      let var1 = ['username', username ? username.toString() : ''];
      console.log('var1: ' + var1);

      let var2 = ['email', email ? email.toString() : ''];
      console.log('var3: ' + var2);

      await AsyncStorage.multiSet([var1, var2]);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _readSettings() {
    let newStates = {};

    try {
      await AsyncStorage.multiGet(
        ['message', 'username', 'email', 'token'],
        (_, stores) => {
          stores.map((_, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0]; // the key
            let value = store[i][1]; // the value
            newStates[key] = value;
          });
          this.setState(newStates);
          console.log(newStates);
        },
      );
    } catch (error) {
      console.log('## ERROR READING ITEMS ##: ', error);
    }
  }

  _read() {
    let success = false;
    let url = `${Config.API_URL}:${Config.API_PORT}/api/login`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          success = false;
          throw Error('Error ' + response.status);
        } else {
          success = true;
        }

        return response.json();
      })

      .then(data => {
        if (success) {
          this._saveSettings(
            data.username,
            data.email,
            data.token,
            data.message,
          );

          setToken(data.token);
          syncToServer('pull');

          console.log('THIS IS MESSAGE: ');
          console.log(data.message);

          Alert.alert(data.message, 'Welcome, ' + data.username + '!');
          this.props.navigation.navigate('Main');
        } else {
          Alert.alert(data.message);
        }
      })
      .catch(data => {
        Alert.alert(data.message, 'Username or password incorrect');
      });
  }

  render() {
    const pressHandler = () => {
      if (this.state.username === '') {
        Alert.alert('Please enter your username.');
      } else if (this.state.password === '') {
        Alert.alert('Please enter your password.');
      } else {
        this._read();
      }
    };

    return (
      <View style={styles.mainContainer}>
        <View style={styles.alignCenter}>
          <Image
            style={{
              width: 200,
              height: 200,
              margin: 20,
              borderRadius: 100,
            }}
            source={require('../image/Login_Avatar.png')}
          />
        </View>
        <Text style={styles.contentRegister}>{'TODOLO!'}</Text>

        <View style={styles.flexWarpRow}>
          <InputWithLabel
            label="Username"
            style={styles.inputRegister}
            placeholder={'Username'}
            onChangeText={username => {
              this.setState({username});
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>

        <View style={styles.flexWarpRow}>
          <InputWithLabel
            style={styles.inputRegister}
            label={'Password'}
            placeholder={'Type here'}
            secureTextEntry={true}
            onChangeText={password => {
              this.setState({password});
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>
        <View style={[styles.alignCenter, styles.marginTop10, styles.noFlex]}>
          <AppButton title="log in" theme="success" onPress={pressHandler} />
          <Text
            style={styles.textSignIn}
            onPress={() => this.props.navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}
