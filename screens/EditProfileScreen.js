import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, setToken } from '../components/functions';
import { useFocusEffect } from '@react-navigation/native';
import Config from 'react-native-config';

function FetchData({ username }) {
  useFocusEffect(() => {});
  return null;
}
export default class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'EditProfileScreen',
  };

  constructor(props) {
    super(props);

    var data = this.props.route.params;

    this.state = {
      username: data.username, //current username
      email: data.email, //current email
    };
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

    await setToken(null);
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('email');
    this.props.navigation.navigate('Index');
  }

  render() {
    return (
      <>
        <FetchData username={this.state.username} />
        <View
          style={{
            backgroundColor: '#1F2124', //grey
            flex: 1,
          }}>
          <View></View>

          <View style={{ alignItems: 'center' }}>
            <Image
              style={{
                width: 150,
                height: 150,
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
                this.props.navigation.navigate('EditAccountDetails', {
                  username: this.state.username,
                  email: this.state.email,
                });
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
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
    marginTop: '5%',
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
  },
});
