import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  LogoTitle,
  headerTitle,
  Linking,
  ScrollView,
  Alert,
  Switch,
  Picker,
  Image,
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

// Uses ./src/UI.js
import {InputWithLabel, AppButton} from './src/UI.js';

export default class App extends Component<Props> {
  static navigationOptions = {
    title: 'EditUsernameScreen',
  };
  constructor(props) {
    super(props);


    this.state = {
      username: '',
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

  async _saveSetting2() {
    try {
      let var1 = [
        'username',
        this.state.username ? this.state.username.toString() : '',
      ];
      console.log(var1);

      await AsyncStorage.multiSet([var1]);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }


  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        ['username'],
        (err, stores) => {
          stores.map((result, i, store) => {
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Username / Email'}
          value={this.state.username}
          onChangeText={username => {
            this.setState({username});
            this._saveSetting('username', username);
          }}
          keyboardType={'default'}
          selectTextOnFocus={true}
          orientation={'horizontal'}
        />

        <View
          style={{
            borderwidth: 1,
            borderColor: 'thistile',
            borderRadius: 50,
          }}
        />

        <View style={styles.pickContainer}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
          
            <AppButton
              style={{width: 10}}
              title="Save"
              theme="success"
              onPress={() => {
                this._saveSetting2();
                Alert.alert('Saved', this.state.username);
              }}></AppButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#1F2124',
  },

  switch: {
    flex: 1,
    margin: 10,
  },
  pickerContainer: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'column',
  },

  button: {
    backgroundColor: '#6360F3',
    margin: 10,
  },

  text: {
    fontSize: 16,
    color: '#6360F3',
  },

  input: {
    fontSize: 20,
    marginTop: '20%',
    textAlign: 'left',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginRight: '5%',
    marginLeft: '5%',
  },
});
