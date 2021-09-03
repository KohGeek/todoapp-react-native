import React from 'react';
import SInfo from 'react-native-sensitive-info';
import Config from 'react-native-config';
import io from 'socket.io-client';
import SQLite from 'react-native-sqlite-storage';

// Password validation
// Returns 0 if password is valid
// Returns 1 if either password is empty
// Returns 2 if password does not match
export function validatePassword(password1, password2) {
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

export const isLoggedIn = async () => {
  const token = await getToken();
  return token !== null;
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
    name: 'tododb5',
    createFromLocation: '~todo.sqlite',
  });

  let returndata = [];

  console.log('syncToServer: ' + operation);

  if (operation === 'push') {
    db.transaction(async tx => {
      tx.executeSql('SELECT * FROM todo', [], async (tx, results) => {
        // data['token'] = getToken();
        let token = await getToken();
        console.log(token);
        let data = { token: token, database: results.rows.raw() };
        socket.emit('push', data);
        returndata = data;
      });
    });
  } else if (operation === 'pull') {
    socket.emit('pull', { token: await getToken() });
    socket.on('pull', data => {
      db.transaction(
        tx => {
          let pullData = data.database;
          tx.executeSql(
            'DELETE FROM todo',
            [],
            () => {
              console.log('deleted');
            },
            () => {
              console.log('error deleting');
            },
          );
          pullData.forEach(item => {
            console.log(item);
            tx.executeSql(
              'INSERT INTO todo (id, name, priority, colour, reminder, completed) VALUES (?, ?, ?, ?, ?, ?)',
              [
                item.id,
                item.name,
                item.priority,
                item.color,
                item.reminder,
                item.completed,
              ],
              results => {
                console.log('Results: ' + results);
              },
              error => {
                console.log('Error: ' + error);
              },
            );
          });
        },
        (tx, error) => {
          console.log('DB Error: ' + error);
        },
        () => {
          console.log('DB Success');
        },
      );
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
