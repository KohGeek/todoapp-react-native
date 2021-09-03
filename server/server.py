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
from os import mkdir, path
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
userdir = path.join(basedir, "userdata/")
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

    db = sqlite3.connect(path.join(basedir, DB))
    c = db.cursor()
    c.execute("SELECT * FROM tokens WHERE token = ?", (auth_token,))
    data = c.fetchone()
    print(data)

    data = jwt.decode(data[0], server.config.get('SECRET_KEY'), algorithms="HS256")
    return data

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
        cursor.execute("SELECT hashedpassword, email, uuid FROM users WHERE username=?", (username,))
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
                    'token': token
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
            c = db.cursor()
            # select uuid
            c.execute("SELECT uuid FROM users WHERE username=?", (username,))
            data = c.fetchone()

            token = encode_auth_token(data[0])
            token_query(token, "add")
            response_json['token'] = token
    
    return make_response(jsonify(response_json), response_code)

# Special route for updating info
# json request must contain current_username and current_password
@server.route('/api/update', methods=['POST'])
def update():

    db = sqlite3.connect(path.join(basedir, DB))
    c = db.cursor()

    response_json = {}
    response_code = 400

    if 'current_username' not in request.json:
        response_json = {'message': 'Missing current username'}
    elif 'current_password' not in request.json:
        response_json = {'message': 'Missing current password'}
    else:
        current_username = request.json['current_username']
        current_password = request.json['current_password']

        c.execute("SELECT hashedpassword, uuid FROM users WHERE username=?", (current_username,))
        data = c.fetchone()

        if not PasswordHasher().verify(data[0], current_password):
            response_json = {'message': 'Invalid current password'}
        else:
            # if json contains username, update username if not already in database
            if 'username' in request.json and (request.json['username'] != current_username or request.json['username'] != "" or request.json['username'] != None):
                username = request.json['username']
                c.execute("SELECT * FROM users WHERE username=?", (username,))
                data = c.fetchone()

                if data is None:
                    c.execute("UPDATE users SET username=? WHERE current_username=?", (username, current_username))
                    response_json['username_status'] = 'Username updated'
                    response_code = 200
                else: 
                    response_json['username_status'] = 'Username already exists'
            
            # if json contains email, update email if not already in database
            if 'email' in request.json and (request.json['email'] != None or request.json['email'] != ''):
                email = request.json['email']
                c.execute("SELECT * FROM users WHERE email=?", (email,))
                data = c.fetchone()

                if data is None:
                    c.execute("UPDATE users SET email=? WHERE current_username=?", (email, current_username))
                    response_json['email_status'] = 'Email updated'
                    response_code = 200
                else:
                    response_json['email_status'] = 'Email already exists'

            # if json contains password, update password if not already in database
            if 'password' in request.json and (request.json['password'] != None or request.json['password'] != ''):
                password = request.json['password']
                hashed_password = PasswordHasher().hash(password)
                c.execute("UPDATE users SET hashedpassword=? WHERE current_username=?", (hashed_password, current_username))

                response_json['password_message'] = 'Password updated'
                response_code = 200

    db.commit()
    db.close()
    return make_response(jsonify(response_json), response_code)

@server.route('/api/fetch', methods=['GET'])
def fetch():
    db = sqlite3.connect(path.join(basedir, DB))
    c = db.cursor()
    response_json = {}
    response_code = 400

    if 'token' not in request.json:
        response_json = {'message': 'Missing token'}
    else:
        try:
            token = decode_auth_token(request.json['token'])
            c.execute("SELECT username, email FROM users WHERE uuid=?", (token,))
            data = c.fetchone()
            response_json = {
                'username': data[0],
                'email': data[1],
            }
            response_code = 200
        except jwt.ExpiredSignatureError:
            response_json = {'message': 'Token expired'}
        except jwt.InvalidTokenError:
            response_json = {'message': 'Invalid token/Logged out'}

    db.close()
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
    try:
        uuid = decode_auth_token(json_data['token'])
        json_data.pop('token')
        filename = str(uuid['sub']) + '.json'
        filepath = path.join(userdir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, ensure_ascii=False, indent=4)
        emit('status', 'Server update successful')
    except jwt.ExpiredSignatureError:
        emit('error', {'message': 'Token expired'})
    except jwt.InvalidTokenError:
        emit('error', {'message': 'Invalid token/Logged out'})
    except TypeError:
        emit('error', {'message': 'Logged out'})

@socketio.on('pull', namespace='/api')
def pull(json_data):
    try:
        uuid = decode_auth_token(json_data['token'])
        filename = str(uuid['sub']) + '.json'
        filepath = path.join(userdir, filename)
        # read uuid + .json file and send it as json data
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        emit('pull', data)
    except jwt.ExpiredSignatureError:
        emit('error', {'message': 'Token expired'})
    except jwt.InvalidTokenError:
        emit('error', {'message': 'Invalid token/Logged out'})

if __name__ == '__main__':
    if not path.exists(userdir):
        mkdir(userdir)

    socketio.run(server, host='0.0.0.0', port=5000)
