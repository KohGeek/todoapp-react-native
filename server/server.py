# File sqlite-server.py

import base64
import sqlite3
from os import path
from flask import Flask, jsonify, request, session
from flask.helpers import make_response
from flask_socketio import SocketIO, emit
from flask_session import Session
from argon2 import PasswordHasher

# Change DB Name here
DB = 'account.sqlite'
autologin_on_register = True

# Setting up various imports
basedir = path.abspath(path.dirname(__file__))
sess = Session()
socketio = SocketIO()

# Setting up the flask server
server = Flask(__name__)
server.config.update(
    DEBUG=True,
    SECRET_KEY='bcpicsdFEKsuxhqZp2QY@JXtR*98#eZgoEbd#4QxS&ePt$M8k7',
    SESSION_TYPE='filesystem',
)
sess.init_app(server)
socketio.init_app(server)

# Real flask application starts here
# The following three method are user management
@server.route('/api/login', methods=['POST'])
def login():

    db = sqlite3.connect(path.join(basedir, DB))

    response_json = None
    response_code = 400

    if not request.json:
        response_json = {'message': 'No JSON data found'}
    elif 'username' not in request.json or 'password' not in request.json:
        response_json = {'message': 'Missing username or password'}
    else:

        username = request.json['username']
        password = request.json['password']

        cursor = db.cursor()
        cursor.execute("SELECT hashedpassword, email FROM users WHERE username=?", (username,))
        data = cursor.fetchone()

        if data is None:
            response_json = {'message': 'Username not found'}
        else:
            match = PasswordHasher().verify(data[0], password)
            if match:
                session['username'] = username
                response_json = {
                    'message': 'Login successful',
                    'username': username,
                    'email': data[1],
                }
                response_code = 200
            else:
                response_json = {'message': 'Invalid password'}

    return make_response(jsonify(response_json), response_code)


@server.route('/api/register', methods=['POST'])
def register():
    
    db = sqlite3.connect(path.join(basedir, DB))

    response_json = None
    response_code = 400

    if not request.json:
        response_json = {'message': 'No JSON data found'}
    elif 'username' not in request.json or 'password' not in request.json or 'email' not in request.json:
        response_json = {'message': 'Missing username or password or email'}
    else:

        username = request.json['username']
        password = request.json['password']
        email = request.json['email']

        hashed_password = PasswordHasher().hash(password)
        db.execute("INSERT INTO users (username, hashedpassword, email) VALUES (?, ?, ?)", (username, hashed_password, email))
        db.commit()
        response_json = {
            'message': 'Registration successful',
            'username': username,
            'email': email,
        }
        response_code = 200

        if autologin_on_register:
            session['username'] = username
    
    return make_response(jsonify(response_json), response_code)

@server.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)

    response_json = {'message': 'Logout successful'}

    return make_response(jsonify(response_json), 200)


# The following method are for syncing the database
@socketio.on('push')
def push(json):
    pass

@socketio.on('pull')
def pull():
    pass

if __name__ == '__main__':
    socketio.run(server, host='0.0.0.0', port=5000)
