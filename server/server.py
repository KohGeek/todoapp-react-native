# File sqlite-server.py
import sqlite3
from os import path
from flask import Flask, jsonify, request
from argparse import ArgumentParser
from argon2 import PasswordHasher

# Change DB Name here
DB = 'account.sqlite'

# Setting up various imports
basedir = path.abspath(path.dirname(__file__))

# Setting up the flask server
server = Flask(__name__)
server.config.update(
    DEBUG=True,
    SECRET_KEY="Z7q2uPTP^m4L@bF%PbuZ3azg^NkMfwarzgzYmeHAX#!*A4a&4V",
    JWT_ACCESS_LIFESPAN={"days": 30},
    JWT_REFRESH_LIFESPAN={"days": 120},
)

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


if __name__ == '__main__':
    server.run(host='0.0.0.0', port=5000)
