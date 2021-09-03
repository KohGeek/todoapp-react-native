import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../components/functions';
import { InputWithLabel, AppButton } from '../src/UI';

export default class signInScreen extends Component {
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
      // profile: [],
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
      let var2 = ['message', message ? message.toString() : ''];
      console.log('var2: ' + var2);

      console.log(var3);
      let var3 = ['email', email ? email.toString() : ''];
      console.log('var3: ' + var3);

      console.log(var4);
      let var4 = ['token', token ? token.toString() : ''];
      console.log('var4: ' + var4);

      //await AsyncStorage.multiSet([var1, var2]);
      await AsyncStorage.multiSet([var1, var2, var3, var4]);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        ['message', 'username', 'email', 'token'],
        (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0]; // the key
            let value = store[i][1]; // the value
            {
              newStates[key] = value;
            }
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
    var success = false;
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
          // Alert.alert('Error', response.status.toString());
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
      if (this.state.username == '') {
        Alert.alert('Please enter your username.');
      } else if (this.state.password == '') {
        Alert.alert('Please enter your password.');
      } else {
        this._read();
      }
    };

    return (
      <View
        style={{
          backgroundColor: '#2c2f33',
          flex: 1,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 200,
              height: 200,
              margin: 20,
              borderRadius: 100,
            }}
            source={require('../Image/Login_Avatar.png')}
          />
        </View>
        <Text style={styles.content}>{'TODOLO!'}</Text>

        <View
          style={{
            //backgroundColor: '#23272a',
            flexwrap: 'wrap',
            flexDirection: 'row',
          }}>
          <InputWithLabel
            label="Username"
            style={styles.input}
            placeholder={'Username / Email'}
            // value={this.state.username}
            onChangeText={username => {
              //this.setState({ name: name });
              this.setState({ username });
              // this._saveSetting('username', username);
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>

        <View
          style={{
            //backgroundColor: 'lightslategrey',
            flexwrap: 'wrap',
            flexDirection: 'row',
          }}>
          <InputWithLabel
            style={styles.input}
            label={'Password'}
            placeholder={'Type here'}
            // value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => {
              // this.setState({ password: password });
              this.setState({ password });
              // this._saveSetting('password', password);
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10, flex: 0 }}>
          <AppButton
            title="log in"
            theme="success"
            onPress={pressHandler}></AppButton>
          <Text
            style={styles.text}
            onPress={() => this.props.navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#6360F3',
    margin: 10,
  },
  content: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#6360F3',
    // textStyle: {
    //   textDecorationLine: 'underline',
    // },
  },
});
