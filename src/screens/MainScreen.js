import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useFocusEffect} from '@react-navigation/native';
import {styles} from '../style';
import {openDatabase} from 'react-native-sqlite-storage';

import AddTodo from '../components/addTodo';
import Header from '../components/header';
import Footer from '../components/footer';
import TodoItem from '../components/todoItem';

export default function MainScreen({navigation, route}) {
  const [todos, setTodos] = useState([]);

  const submitHandler = text => {
    if (text.length >= 1) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO todo(name, completed, reminder) VALUES(?,?,?)',
          [text, 'false', '{"dateText": "", "timeText": ""}'],
        );
      });
      _update();
    } else {
      Alert.alert('OOPS!', 'Task added cannot be empty!!', [
        {text: 'Understood', onPress: () => console.log('alert closed')},
      ]);
    }
  };

  //hidden function
  const renderHiddenItem = data => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          console.log('Ready to edit task');
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
          deleteRow(data.id);
        }}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  //delete function
  const deleteRow = id => {
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM todo WHERE id= ?', [id], (trx, results) => {});
    });
    _update();
  };

  var db = openDatabase({
    name: 'todo.sqlite',
    createFromLocation: '~todo.sqlite',
  });

  useEffect(() => {
    console.log('Database opened');
    _update();
  }, [_update]);

  useFocusEffect(() => {
    _update();
  });

  const _update = () => {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM todo', [], (trx, results) => {
        setTodos(results.rows.raw());
      });
    });
  };

  const _complete = (id, completed) => {
    console.log('ready to set complete state');
    db.transaction(function (tx) {
      tx.executeSql('UPDATE todo SET completed=? WHERE id=?', [completed, id]);
    });

    _update();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Header navigation={navigation} _update={_update} />

        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <SwipeListView
              data={todos}
              renderItem={({item}) => (
                <TodoItem item={item} _complete={_complete} _update={_update} />
              )}
              renderHiddenItem={({item}) => renderHiddenItem(item)}
              leftOpenValue={300}
              rightOpenValue={-150}
              disableRightSwipe={true}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
}
