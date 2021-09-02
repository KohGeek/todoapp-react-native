# Logging setup

from base64 import encode
import logging
root = logging.getLogger()
root.setLevel(logging.DEBUG)

# File sqlite-server.py

import datetime
import sqlite3
import json
import jwt
from os import path
from flask import Flask, jsonify, request
from flask.helpers import make_response
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from argon2 import PasswordHasher

# Change DB Name here
DB = 'account.sqlite'
autologin_on_register = True

# Setting up various imports
basedir = path.abspath(path.dirname(__file__))
socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins='*')
cors = CORS()

# Setting up the flask server
server = Flask(__name__)
server.config.update(
    FLASK_ENV='development',
    DEBUG=True,
    SECRET_KEY='bcpicsdFEKsuxhqZp2QY@JXtR*98#eZgoEbd#4QxS&ePt$M8k7',
)
socketio.init_app(server)
cors.init_app(server)

# The following handles jwt tokens
def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=31),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            server.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, server.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

def token_query(token, type):

    db = sqlite3.connect(path.join(basedir, DB))
    c = db.cursor()

    return_data = False

    if type == "add":
        c.execute("INSERT INTO tokens (token) VALUES (?)", (token,))
        return_data = True
    elif type == "delete":
        c.execute("DELETE FROM tokens WHERE token = ?", (token,))
        return_data = True
    elif type == "get":
        c.execute("SELECT * FROM tokens WHERE token = ?", (token,))
        return_data = c.fetchone()
    db.commit()
    db.close()

    return return_data

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
        cursor.execute("SELECT hashedpassword, email, username FROM users WHERE username=?", (username,))
        data = cursor.fetchone()

        if data is None:
            response_json = {'message': 'Username not found'}
        else:
            match = PasswordHasher().verify(data[0], password)
            if match:
                token = encode_auth_token(data[2])
                token_query(token, "add")
                response_json = {
                    'message': 'Login successful',
                    'username': username,
                    'email': data[1],
                    'token': token.decode('UTF-8')
                }
                response_code = 200
            else:
                response_json = {'message': 'Invalid password'}

    return make_response(jsonify(response_json), response_code)


@server.route('/api/register', methods=['POST'])
def register():
    
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    db = sqlite3.connect(path.join(basedir, DB))
    emailcheck = db.cursor()
    emailcheck.execute("SELECT * FROM users WHERE email=?", (email,))
    usernamecheck = db.cursor()
    usernamecheck.execute("SELECT * FROM users WHERE username=?", (username,))

    response_json = None
    response_code = 400

    if not request.json:
        response_json = {'message': 'No JSON data found'}
    elif 'username' not in request.json or 'password' not in request.json or 'email' not in request.json:
        response_json = {'message': 'Missing username or password or email'}
    elif emailcheck.fetchone() is not None:
        response_json = {'message': 'Email already exists'}
    elif usernamecheck.fetchone() is not None:
        response_json = {'message': 'Username already exists'}
    else:

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
            token = encode_auth_token(username)
            token_query(token, "add")
            response_json['token'] = token.decode('UTF-8')
    
    return make_response(jsonify(response_json), response_code)

@server.route('/api/logout', methods=['POST'])
def logout():
    
    token = request.json['token']
    token_query(token, "delete")

    response_json = {'message': 'Logout successful'}

    return make_response(jsonify(response_json), 200)

# The following method are for syncing the database
@socketio.on('push', namespace='/api')
def push(json_data):
    # token check here
    if username is None:
        emit('relogin', 'User not logged in or session has expired. Please log in again.')
    else: 
        with open(username + '.json', 'w', encoding='utf-8') as f:
            json.dump(json_data, f, ensure_ascii=False, indent=4)
        emit('status', 'Sync successful')

@socketio.on('pull', namespace='/api')
def pull():
    pass

if __name__ == '__main__':
    socketio.run(server, host='0.0.0.0', port=5000)
