import React from 'react';
import SInfo from 'react-native-sensitive-info';
import Config from 'react-native-config';
import io from 'socket.io-client';
import SQLite from 'react-native-sqlite-storage';

// Password validation
// Returns 0 if password is valid
// Returns 1 if either password is empty
// Returns 2 if password does not match
export function passwordValidation(password1, password2) {
  if (password1 === '' || password2 === '') {
    return 1;
  }
  if (password1 !== password2) {
    return 2;
  }
  return 0;
}

export const getToken = async () => {
  return SInfo.getItem('token', {});
};

export const setToken = async token => {
  return SInfo.setItem('token', token, {});
};

// syncs database to server
// parameter accepts: push, pull
// push to push data to server
// pull to pull data from server
export async function syncToServer(operation) {
  let socket = io.connect(`${Config.API_URL}:${Config.API_PORT}/api`, {
    transports: ['websocket', 'polling'],
  });

  let db = SQLite.openDatabase({
    name: 'tododb',
    createFromLocation: '~todo.sqlite',
  });

  let returndata = [];

  console.log('syncToServer: ' + operation);

  if (operation === 'push') {
    db.transaction(async tx => {
      tx.executeSql('SELECT * FROM todo', [], async (tx, results) => {
        // data['token'] = getToken();
        let token = await getToken();
        let data = { token: token, database: results.rows.raw() };
        console.log(data.token);
        let jsondata = JSON.stringify(data);
        console.log(jsondata);
        socket.emit('push', jsondata);
        returndata = jsondata;
      });
    });
  } else if (operation === 'pull') {
    socket.emit('pull', { token: await getToken() });
    console.log('pull emitted');
    socket.on('pull', data => {
      db.transaction(tx => {
        returndata = data;
        let parsedData = JSON.parse(data.database);
        tx.executeSql('DELETE FROM todo');
        parsedData.forEach(item => {
          tx.executeSql(
            'INSERT INTO todo (id, name, priority, color, reminder, completed) VALUES (?, ?, ?, ?, ?, ?)',
            [
              item.id,
              item.name,
              item.priority,
              item.color,
              item.reminder,
              item.completed,
            ],
          );
        });
      });
    });
  }

  return returndata;
}

export const emptyTodo = {
  id: null,
  name: '',
  priority: '',
  color: '#161718',
  reminder: '{"dateText": "", "time": ""}',
  completed: 'false',
};
