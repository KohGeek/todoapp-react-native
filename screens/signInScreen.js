import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Image } from 'react-native';
import { InputWithLabel, AppButton } from '../src/UI';

export default class signInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
    };
  }

  render() {
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
            source={require('./img/Login_Avatar.png')}
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
            value={this.state.name}
            onChangeText={name => {
              this.setState({ name: name });
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
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => {
              this.setState({ password: password });
            }}
            keyboardType={'default'}
            selectTextOnFocus={true}
            orientation={'horizontal'}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <AppButton
            title="log in"
            theme="success"
            onPress={() => alert('Welcome back, ' + this.state.name + '!')}
            onLongPress={() => {
              Alert.alert('Password: ' + this.state.password);
            }}></AppButton>
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
});
