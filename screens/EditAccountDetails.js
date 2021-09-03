import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';
import { validatePassword } from '../components/functions';
import { InputWithLabel, AppButton } from '../src/UI';

export default class EditAccountDetails extends Component {
  static navigationOptions = {
    title: 'EditAccountDetails',
  };

  constructor(props) {
    super(props);

    this.state = {
      new_username: '',
      username: '', //current username
      new_email: '',
      current_password: '',
      new_password1: '',
      new_password2: '',
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

  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        ['new_username', 'new_email', 'username'],
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

  _update() {
    var success = false;

    var url = `${Config.API_URL}:${Config.API_PORT}/api/update`;
    console.log(url);

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_username: this.state.username,
        current_password: this.state.current_password,
        username: this.state.new_username,
        email: this.state.new_email,
        password: this.state.new_password1,
      }),
    })
      .then(response => {
        if (!response.ok) {
          success = false;
          throw Error('Error ' + response.status);
        } else {
          success = true;
          this.props.navigation.navigate('EditProfileScreen');
        }
        return response.json();
      })

      .then(data => {
        if (success) {
          this._saveSettings(data.new_username, data.new_email);
          Alert.alert('Details Successfully saved!');
        } else {
          Alert.alert('Details Failed to save! Please input again.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  pressHandler = () => {
    if (this.state.current_password == '') {
      Alert.alert('Please enter your Current Password!');
    } else {
      if (
        validatePassword(this.state.new_password1, this.state.new_password2) !=
        0
      ) {
        this.state.new_password1 = '';
      }
      this._update();
    }
  };

  render() {
    return (
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
          <Text style={styles.name}> {this.state.username} </Text>
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
              this.setState({ current_password });
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
              this.setState({ new_username });
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
              this.setState({ new_email });
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
            onChangeText={new_password1 => {
              this.setState({ new_password1 });
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
            onChangeText={new_password2 => {
              this.setState({ new_password2 });
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
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 40,
    textAlign: 'left',
    marginTop: 5,
    color: 'white',
  },
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
    fontSize: 15,
    margin: 20,
    fontWeight: 'bold',
  },
  newinput: {
    fontSize: 20,
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },

  passinput: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 30,
  },

  text: {
    fontSize: 14,
    color: '#6360F3',
  },
});
