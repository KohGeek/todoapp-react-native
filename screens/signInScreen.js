import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Switch,
  Picker,
  Text,
  Button,
  Alert,
  Image,
} from 'react-native';
import { InputWithLabel, AppButton } from '../src/UI';

export default class signInScreen extends Component {
  static navigationOptions = {
    title: 'Login Screen',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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

  async _saveSetting() {
    try {
      let var1 = [
        'username',
        this.state.username ? this.state.username.toString() : '',
      ];
      // console.log(var1);
      // let var2 = [
      //   'password',
      //   this.state.password ? this.state.password.toString() : '',
      // ];
      // console.log(var2);

      //await AsyncStorage.multiSet([var1, var2]);
      await AsyncStorage.multiSet([var1]);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        //['name', 'email', 'gender', 'educationLevel', 'ReceiveP'],
        ['username'],
        (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0]; // the key
            let value = store[i][1]; // the value
            {
              newStates[key] = value;
            }

            console.log(key);
            console.log(value);
            console.log(['username'].indexOf(key));
          });
          this.setState(newStates);
          console.log(newStates);
        },
      );
    } catch (error) {
      console.log('## ERROR READING ITEMS ##: ', error);
    }
  }

  async _removeAllSettings() {
    //let keys = ['name', 'email', 'gender', 'educationLevel', 'ReceiveP'];
    let keys = ['username', 'password'];
    AsyncStorage.multiRemove(keys, err => {
      // keys k1 & k2 removed, if they existed
      // callback to do some action after removal of item
      console.log('Delete', keys);
    });
  }

  render() {
    const pressHandler = () => {
      if (this.state.username == '') {
        Alert.alert('Please enter your username.');
      } else if (this.state.password == '') {
        Alert.alert('Please enter your password.');
      } else {
        alert('Welcome back, ' + this.state.username + '!');
        this.props.navigation.navigate('Index');
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
        <Text style={styles.content}>{'TODORO'}</Text>

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
            value={this.state.username}
            onChangeText={username => {
              //this.setState({ name: name });
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
              //this.setState({ password: password });
              this.setState({ password });
              this._saveSetting('password', password);
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
            onPress={pressHandler}
            onLongPress={() => {
              Alert.alert('Password: ' + this.state.password);
            }} // TODO: for reference only
          ></AppButton>
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
