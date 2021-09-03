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

let config = require('./Config');

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

  async _saveSettings(new_username, new_email, new_password) {
    try {
      let var1 = ['username', new_username ? username.toString() : ''];
      console.log('var1: ' + var1);

      let var2 = ['new_email', new_email ? message.toString() : ''];
      console.log('var2: ' + var2);

      let var3 = ['email', new_password ? message.toString() : ''];
      console.log('var2: ' + var2);

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

    let url = config.settings.serverPath + '/api/update';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_username: this.state.username,
        username: this.state.new_username,
        email: this.state.new_email,
        current_password: this.state.current_password,
        password: this.state.new_password1,

      }),
    })
      .then(response => {
        if (!response.ok) {
          success = false;
          // Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        } else {
          success = true;
          this.props.navigation.navigate('EditProfileScreen')
        }
        return response.json();
      })

      .then(data => {
        if (success) {
          this._saveSettings(
            data.new_username,
            data.new_email,
            data.new_password1,
            Alert.alert('Details Successfully saved!')
          );
        }else {
            Alert.alert ('Details Failed to save! Please input again.')
        }
      })
      .catch(data => {
        console.error(error);
      });
  }

  render() {
    const pressHandler = () => {

      if (this.state.current_password == '') {
        Alert.alert('Please enter your Current Password!');
        } else if (this.state.new_email == '') {
            this.state.new_email = null;
        } else if (this.state.new_username == '') {
            this.state.username = null;
        } else if (this.state.new_password1 == '') {
            this.state.new_password1 = null;
        } else if (this.state.new_password2 == '') {
            this.state.new_password2 = null;
        } else if (this.state.new_password1 == this.state.new_password2) {  
            this._update();
        }

        
    console.log(this.state.new_email);
    console.log(this.state.new_password1);
    console.log(this.state.current_password);
    console.log(this.state.new_password2);
    console.log(this.state.new_email);

    };

    return (
      <ScrollView
        style={{
          backgroundColor: '#2c2f33',
          flex: 1,
        }}>


        <View style={{
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
           // marginTop: '3%',
           // marginBottom: '5%',
            backgroundColor: '#1A1B1E',
          }}>
          <InputWithLabel
            label="Current Password"
            style={styles.passinput}
            placeholder={'Please fill this first'}
            // value={this.state.username}
            onChangeText={current_password => {
              //this.setState({ name: name });
              this.setState({ current_password });
              // this._saveSetting('username', username);
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
            secureTextEntry={true}
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
        
            secureTextEntry={true}
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
           
            secureTextEntry={true}
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
           
            secureTextEntry={true}
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
            onPress={pressHandler}></AppButton>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    name: {
        fontSize: 50,
        textAlign: 'left',
        marginTop: 5,
        color: 'white',
        //marginBottom: 5,
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
    // textStyle: {
    //   textDecorationLine: 'underline',
    // },
  },
});
