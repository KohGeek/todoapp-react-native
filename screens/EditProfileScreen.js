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
import { getToken, setToken } from '../components/functions';
import { InputWithLabel, AppButton } from '../src/UI';
import Config from 'react-native-config';

export default class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'EditProfileScreen',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this._readSettings();
    //this.state.username;
    //this.state.email;
  }

  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        ['username', 'email'],
        (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
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

  async _logout() {
    var url = `${Config.API_URL}:${Config.API_PORT}/api/logout`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: await getToken(),
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    setToken('');
    this.props.navigation.navigate('Index');
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#1F2124', //grey
          flex: 1,
        }}>
        <View></View>

        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 200,
              height: 200,
              margin: 20,
              borderRadius: 100,
            }}
            source={require('../Image/profileicon.png')}
          />
        </View>

        {/* USERNAME */}
        <View>
          <Text style={styles.label}>Username: </Text>
          <View
            style={{
              backgroundColor: '#1A1B1E',
              flexwrap: 'wrap',
              borderColor: '#BFBFBF',
            }}>
            <Text style={styles.name}> {this.state.username} </Text>
          </View>
        </View>

        {/* EMAIL */}
        <View>
          <Text style={styles.label}>Email:</Text>
          <View
            style={{
              backgroundColor: '#1A1B1E',
              flexwrap: 'wrap',
              borderColor: '#BFBFBF',
            }}>
            <Text style={styles.name}> {this.state.email} </Text>
          </View>
        </View>

        {/* PASSWORD */}
        <View style={styles.passwordButton}>
          <Button
            marginTop="15%"
            color="#6360F3"
            style={styles.button}
            title={'Edit Account Details >'}
            onPress={() => {
              this.props.navigation.navigate('EditAccountDetails');
            }}></Button>
        </View>

        <View style={styles.passwordButton}>
          <Button
            marginTop="15%"
            color="#6360F3"
            style={styles.button}
            title={'Logout'}
            onPress={async () => {
              await this._logout();
            }}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    marginTop: 5,
    color: 'white',
    textAlign: 'right',
    alignItems: 'center',
    marginRight: 20,
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

  //For label next to button
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
    color: 'white',
  },

  passwordButton: {
    marginTop: '15%',
  },

  button: {
    //backgroundColor: '#6360F3',
    //borderRadius: 10,
    //margin: 10,
    marginTop: '5%',
    //paddingRight: '10%',
    //textAlign: 'left',
    //marginTop: 10,
    //flex: 0
  },

  header: {
    textAlign: 'left',
    color: 'white',
    fontSize: 30,
    margin: 20,
    fontWeight: 'bold',
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
    // textStyle: {
    //   textDecorationLine: 'underline',
    // },
  },
});
