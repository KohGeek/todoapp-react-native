import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';





export default class registerScreen extends Component {
  static navigationOptions = {
    title: 'Register Screen',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
 
  }

  componentDidMount() {
    //AsyncStorage.setItem('username', 'Sam');
    //AsyncStorage.setItem('password', '1234');
    this._readSettings();
  }

  async _readSettings() {
    newStates = {};

    try {
      let keys = await AsyncStorage.multiGet(
        //['name', 'email', 'gender', 'educationLevel', 'ReceiveP'],
        ['username', 'password'],
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
            console.log(
              //['name', 'email', 'gender', 'educationLevel'].indexOf(key),
              ['username', 'password'].indexOf(key),
            );
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

     
      <View
        style={{
          backgroundColor: '#1F2124', //grey
          flex: 1,
        }}>
        
         <View>
      </View>

        <View style={{alignItems: 'center'}}>
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

          <Text style={styles.label}>Username:</Text>
            <Button
              color="#6360F3"
              style={styles.button}
              //title={'Username:  ' + this.state.username}
              title={this.state.username}
              onPress={() => {
                this.props.navigation.navigate('Edit Username/Email');
              }}></Button>

        </View>


        


        {/* PASSWORD */}
        <View style={styles.button}>
          <Text style={styles.label}>Password:</Text>
            <Button
              marginTop= '10%'
              color="#6360F3"
              style={styles.button}
              //title={'Password:  ' + this.state.username}
              title={'*****'}
              onPress={() => {
                this.props.navigation.navigate('Edit Password');
              }}></Button>

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

  //For label next to button
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
    color: 'white',
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
