import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputWithLabel, AppButton } from '../src/UI';
import Config from 'react-native-config';

export default class registerScreen extends Component {
  static navigationOptions = {
    title: 'Register Screen',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      retype_password: '',
    };
  }

  async _saveSetting(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  // Fetch from server: Register a new account
  _store() {
    var success = false;

    console.log('CAME INTO STORE');
    let url = `${Config.API_URL}:${Config.API_PORT}/api/register`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          success = false;
          return response.json(); // return the message
        } else {
          success = true;
          this.props.navigation.navigate('Index'); // navigate to home page
        }
        console.log('CAME INTO RESPONSEJSON');
        return response.json();
      })

      .then(data => {
        if (success) {
          Alert.alert(data.message, 'Please log in again.');
        } else {
          Alert.alert(data.message);
        }

        console.log('THIS IS MESSAGE: ');
        console.log(data.message);
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const pressHandler = () => {
      if (this.state.username === '') {
        Alert.alert('Please enter your username.');
      } else if (this.state.email === '') {
        Alert.alert('Please enter your email.');
      } else if (this.state.password === '') {
        Alert.alert('Please enter your password.');
      } else if (this.state.retype_password === '') {
        Alert.alert('Please retype password.');
      } else if (this.state.password !== this.state.retype_password) {
        Alert.alert('Retype password mismatch.');
      } else {
        this._store();
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
              width: 100,
              height: 100,
              margin: 20,
              borderRadius: 100,
            }}
            source={require('../resources/AppLogo.png')}
          />
        </View>
        <Text style={styles.content}>{'JOIN TODOLO!'}</Text>

        <View
          style={{
            flexwrap: 'wrap',
            flexDirection: 'row',
          }}>
          <InputWithLabel
            label="Username"
            style={styles.input}
            placeholder={'Your name'}
            value={this.state.username}
            onChangeText={username => {
              this.setState({ username });
              this._saveSetting('username', username);
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
            label="Email"
            style={styles.input}
            placeholder={'e.g., abc@mail.com'}
            value={this.state.email}
            onChangeText={email => {
              this.setState({ email });
              this._saveSetting('email', email);
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
            style={styles.input}
            label={'Password'}
            placeholder={'Type here'}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => {
              this.setState({ password });
              this._saveSetting('password', password);
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
            style={styles.input}
            label={'Retype Password'}
            placeholder={'Type here'}
            value={this.state.retype_password}
            secureTextEntry={true}
            onChangeText={retype_password => {
              //this.setState({ password: password });
              this.setState({ retype_password });
              this._saveSetting('retype_password', retype_password);
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 10, flex: 0 }}>
          <AppButton title="register" theme="success" onPress={pressHandler} />
          <Text
            style={styles.text}
            onPress={() => this.props.navigation.navigate('Index')}>
            Sign In
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
    fontSize: 16,
    color: '#6360F3',
  },
});
