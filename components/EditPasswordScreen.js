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

// IMPORTANT Uses ./src/UI.js
import {InputWithLabel, AppButton} from './src/UI.js';

export default class App extends Component<Props> {
  static navigationOptions = {
    title: 'EditPasswordScreen',
  };
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      retype_password: '',
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

  /* ----- To SAVE a set of value corresponding to different keys */
  async _saveSetting2() {
    try {
      // Get each of the KEY & VALUE and set them to a VARIABLE
      let var1 = [
        'password',
        this.state.password ? this.state.password.toString() : '',
      ];
      console.log(var1);
      let var2 = [
        'retype_password',
        this.state.password ? this.state.password.toString() : '',
      ];
      console.log(var2);

      await AsyncStorage.multiSet([var1, var2]);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  /* ----- To retrieve a set of value corresponding to different key */
  async _readSettings() {
    newStates = {};

    try {
      // Get all the values in async storage to the APP
      let keys = await AsyncStorage.multiGet(
        ['password', 'retype_password'],
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
            console.log(['password', 'retype_password'].indexOf(key))
            //console.log(['retype_password'].indexOf(key));
          });
          this.setState(newStates);
          console.log(newStates);
        },
        // Show Error - If FAILED to SAVE
      );
    } catch (error) {
      console.log('## ERROR READING ITEMS ##: ', error);
    }
  }


async _validation() {
  newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        ['username', 'password'],
        (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0]; // the key
            let value = store[i][1]; // the value
            {
              newStates[key] = value;
            }
            console.log(key);
            console.log(value);
            console.log(
              //['name', 'email', 'gender', 'educationLevel'].indexOf(key),
              ['username', 'password'].indexOf(key),
            );
          });
          this.setState(newStates);
          console.log(newStates);
        },
      );
      if(this.state.password == this.state.retype_password)
        Alert.alert('Saved');
      else
        Alert.alert('Password Mismatch');
    } catch (error) {
      console.log('## ERROR READING ITEMS ##: ', error);
    }
}


  render() {
    return (
      <ScrollView style={styles.container}>
        
        
        
        
        {/* New Password */}
        <TextInput
          style={styles.input}
          placeholder={'New Password'}
          onChangeText={password => {
            this.setState({password});
            this._saveSetting('password', password);
          }}
          keyboardType={'default'}
          selectTextOnFocus={true}
          orientation={'horizontal'}
        />


        {/* Retype New Password */}
      <TextInput
          style={styles.input}
          marginTop= '10%'
          placeholder={'Retype New Password'}
          onChangeText={retype_password => {
            this.setState({retype_password});
            this._saveSetting('retype_password', retype_password);
          }}
          keyboardType={'default'}
          selectTextOnFocus={true}
          orientation={'horizontal'}
        />

        

    

        <View style={styles.pickContainer}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            
            {/* This Button is to one-shot SAVE all the KEYS & VALUES in async storage */}
            <AppButton
              style={{width: 10}}
              title="Save"
              theme="success"
              onPress={() => {
                this._saveSetting2();
                this._validation();
                //Alert.alert('Saved', this.state.username);
              }}></AppButton>

            {/* This Button is to one-shot REMOVE all the KEYS & VALUES in async storage */}
            {/* <Button
              style={{width: 10}}
              title="Remove All"
              onPress={() => {
                this._removeAllSettings();
                Alert.alert('Removed All');
              }}></Button> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

// Styling for components
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
  // input: {
  //   fontSize: 20,
  //   margin: 10,
  //   textAlign: 'left',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   paddingLeft: '5%',
  //   paddingRight: '80%',
  //   marginRight: '140%',
  //   //marginLeft: '10%',
  // },
});
