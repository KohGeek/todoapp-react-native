# File sqlite-server.py
import sqlite3
from os import path
from flask import Flask, jsonify, request, session
from flask.ext.session import Session
from argon2 import PasswordHasher

# Change DB Name here
DB = 'account.sqlite'

# Setting up various imports
basedir = path.abspath(path.dirname(__file__))
db = sqlite3.connect(path.join(basedir, DB))
sess = Session()

# Setting up the flask server
server = Flask(__name__)
server.config.update(
    DEBUG=True,
    SESSION_TYPE='filesystem',
)
sess.init_app(server)

# Used for returning 400 response
def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response

# Real flask application starts here
# Handles login
@server.route('/api/login', methods=['POST'])
def login():
    if not request.json:
        return bad_request("Malformed request!")
    
    if 'username' not in request.json or 'password' not in request.json:
        return bad_request("Request json incomplete!")

    username = request.json['username']
    password = request.json['password']

@server.route('/api/register', methods=['POST'])
def register():
    pass

@server.route('/api/logout', methods=['POST'])
def logout():
    pass

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=5000)
