// React Native Get Current Date Time | Use of Moment for Date Time
// https://aboutreact.com/react-native-get-current-date-time/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

//Import moment for date and time
import moment from 'moment';

const App = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = moment().utcOffset('+05:30').format('DD MMM YYYY');
    setCurrentDate(date);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Current Date Time</Text>
          <Text style={styles.textStyle}>{currentDate}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          React Native Get Current Date Time
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
});

export default App;
