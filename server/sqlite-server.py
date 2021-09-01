# File sqlite-server.py

import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'account.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'name': row[1],
        'email': row[2],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/accounts', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accounts ORDER BY name')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/accounts/<int:account>', methods=['GET'])
def show(account):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM accounts WHERE id=?', (str(account),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/accounts', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_account = (
        request.json['name'],
        request.json['email'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO accounts(name,email,password)
        VALUES(?,?,?)
    ''', new_account)

    account_id = cursor.lastrowid

    db.commit()

    response = {
        'id': account_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/accounts/<int:account>', methods=['PUT'])
def update(account):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != account:
        abort(400)

    update_account = (
        request.json['name'],
        request.json['email'],
        request.json['password'],
        str(account),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE accounts SET
            name=?,email=?,password=?
        WHERE id=?
    ''', update_account)

    db.commit()

    response = {
        'id': account,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/accounts/<int:account>', methods=['DELETE'])
def delete(account):
    if not request.json:
        abort(400)

    if 'id' not in request.json:
        abort(400)

    if int(request.json['id']) != account:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM accounts WHERE id=?', (str(account),))

    db.commit()

    response = {
        'id': account,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)