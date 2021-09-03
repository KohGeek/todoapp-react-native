import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../style';
import { openDatabase } from 'react-native-sqlite-storage';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import AddTodo from './addTodo';
import color from '../app/config/colors';
import Header from './header';
import Footer from './footer';
import TodoItem from './todoItem';

export default function App({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  const [addtask, setaddTask] = useState(route.AddTask || false);

  // const pressHandler = key => {
  //   setTodos(prevTodos => {
  //     return prevTodos.filter(todo => todo.key != key);
  //   });
  // };

  const submitHandler = text => {
    if (text.length >= 1) {
      // console.log('Ready to add ' + text);
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO todo(name,completed, reminder) VALUES(?,?,?)',
          [text, 'false', '{"dateText": "", "time": ""}'],
          (tx, results) => {
            // console.log(text + ' is added successful!');
          },
        );
      });
      _update();
    } else {
      Alert.alert('OOPS!', 'Task added cannot be empty!!', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ]);
    }
  };

  // const _insert = () => {
  //   db.transaction(function (tx) {
  //     tx.executeSql('INSERT INTO todo(name) VALUES(?)', [id], (tx, results) => {
  //       console.log(id + ' is deleted successful!');
  //     });
  //   });
  //   _update();
  // };

  //hidden function
  const renderHiddenItem = data => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          console.log('Ready to edit task');
          // console.log(data);
          navigation.navigate('AddTask', {
            data: JSON.stringify(data),
            action: 'Edit Task',
          });
        }}>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          // console.log(data.id);
          deleteRow(data.id);
        }}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  //close function
  const closeRow = id => {
    // console.log('This row closed', id);
  };

  //delete function
  const deleteRow = id => {
    // closeRow(id);
    // const newData = [...todos];
    // const prevIndex = todos.findIndex(item => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setTodos(newData);
    // console.log(id + ' is ready to be deleted!');
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM todo WHERE id= ?', [id], (tx, results) => {
        // console.log(id + ' is deleted successful!');
      });
    });
    _update();
  };

  //detection for row slide action
  // const onRowDidOpen = rowKey => {
  //   console.log('This row opened', rowKey);
  // };

  var db = openDatabase({
    name: 'tododb4',
    createFromLocation: '~todo.sqlite',
  });

  useEffect(() => {
    console.log('Database opened');
    _update();
  }, []);

  useEffect(() => {
    // console.log('Route is ' + route);
    _update();
  }, [addtask]);

  useFocusEffect(() => {
    _update();
  });

  const _update = () => {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM todo', [], (tx, results) => {
        setTodos(results.rows.raw());
        // console.log(results.rows.raw());
      });
    });
  };

  const _complete = (id, completed) => {
    console.log('ready to set complete state');
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE todo SET completed=? WHERE id=?',
        [completed, id],
        (tx, results) => {
          console.log('success to set complete state');
          // console.log(results.rows.raw());
        },
      );
    });
    _update();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('Dismissed keyboard');
      }}>
      <View style={styles.container}>
        <Header navigation={navigation} _update={_update} />

        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <SwipeListView
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} _complete={_complete} _update={_update} />
              )}
              renderHiddenItem={({ item }) => renderHiddenItem(item)}
              leftOpenValue={300}
              rightOpenValue={-150}
              disableRightSwipe={true}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              // onRowDidOpen={onRowDidOpen}
            />
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
}

// const styles = StyleSheet.create({
//   addSubTaskbtn: {
//     backgroundColor: 'coral',
//     right: 140,
//     padding: 16,
//     marginTop: 16,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: color.primary,
//   },
//   content: {
//     padding: 40,
//     flex: 1,
//   },

//   list: {
//     marginTop: 20,
//     flex: 1,
//   },
//   rowFront: {
//     alignItems: 'center',
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     justifyContent: 'center',
//     height: 50,
//   },
//   rowBack: {
//     alignItems: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
//   },
//   backRightBtn: {
//     alignItems: 'center',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
//   },
//   backRightBtnLeft: {
//     backgroundColor: 'green',
//     right: 75,
//     padding: 16,
//     marginTop: 16,
//   },
//   backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 10,
//     padding: 16,
//     marginTop: 16,
//   },
// });
