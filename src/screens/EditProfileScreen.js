import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { getToken, setToken } from '../components/functions';
import { useFocusEffect } from '@react-navigation/native';
import Config from 'react-native-config';
import { styles } from '../style';

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
            <Text style={styles.editlabel}>Username: </Text>
            <View
              style={{
                backgroundColor: '#1A1B1E',
                flexwrap: 'wrap',
                borderColor: '#BFBFBF',
              }}>
              <Text style={styles.userinforight}> {this.state.username} </Text>
            </View>
          </View>

          {/* EMAIL */}
          <View>
            <Text style={styles.editlabel}>Email:</Text>
            <View
              style={{
                backgroundColor: '#1A1B1E',
                flexwrap: 'wrap',
                borderColor: '#BFBFBF',
              }}>
              <Text style={styles.userinforight}> {this.state.email} </Text>
            </View>
          </View>

          {/* PASSWORD */}
          <View style={{ marginTop: '10%' }}>
            <Button
              marginTop="15%"
              color="#6360F3"
              style={{ marginTop: '5%' }}
              title={'Edit Account Details >'}
              onPress={() => {
                this.props.navigation.navigate('EditAccountDetails', {
                  username: this.state.username,
                  email: this.state.email,
                });
              }}></Button>
          </View>

          <View style={{ marginTop: '10%' }}>
            <Button
              marginTop="15%"
              color="#6360F3"
              style={{ marginTop: '5%' }}
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
