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

export default function App({ navigation }) {
  const [todos, setTodos] = useState([]);

  // const pressHandler = key => {
  //   setTodos(prevTodos => {
  //     return prevTodos.filter(todo => todo.key != key);
  //   });
  // };

  const submitHandler = text => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert('OOPS!', 'Todos myst be over 3 chars long!', [
        { text: 'Understood', onPress: () => console.log('alert closed') },
      ]);
    }
  };

  //hidden function
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          console.log('Ready to edit task');

          navigation.navigate('AddTask', {
            taskId: '1',
          });
        }}>
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  //close function
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
      console.log('This row closed', rowKey);
    }
  };

  //delete function
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...todos];
    const prevIndex = todos.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setTodos(newData);
  };

  //detection for row slide action
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  var db = openDatabase({
    name: 'tododb',
    createFromLocation: '~todo.sqlite',
  });

  useEffect(() => {
    console.log('Database opened');
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM todo', [], (tx, results) => {
        setTodos(results.rows.raw());
        console.log(results.rows.raw());
      });
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('Dismissed keyboard');
      }}>
      <View style={styles.container}>
        <Header navigation={navigation} />

        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <SwipeListView
              data={todos}
              renderItem={({ item }) => <TodoItem item={item} />}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={300}
              rightOpenValue={-150}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  addSubTaskbtn: {
    backgroundColor: 'coral',
    right: 140,
    padding: 16,
    marginTop: 16,
  },
  backTextWhite: {
    color: '#FFF',
  },

  // closeTaskbtn: {
  //   backgroundColor: 'blue',
  //   left: 0,
  //   padding: 16,
  //   marginTop: 16,
  // },

  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  content: {
    padding: 40,
    // backgroundColor: 'blue',
    flex: 1,
  },

  list: {
    marginTop: 20,
    // backgroundColor: 'gold',
    flex: 1,
    // backgroundColor: 'green',
  },
  rowFront: {
    alignItems: 'center',
    // backgroundColor: 'green',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: 'coral',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'green',
    right: 75,
    padding: 16,
    marginTop: 16,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 10,
    padding: 16,
    marginTop: 16,
  },
});
