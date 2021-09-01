##
# Execute this script once to create the database & table
# as well as populating it with initial data
#

import sqlite3
db = sqlite3.connect('account.sqlite')

db.execute('DROP TABLE IF EXISTS accounts')

db.execute('''CREATE TABLE accounts(
    id integer PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO accounts(username,email,password)
    VALUES('admin','admin@todoapp.com','admin')
''')

cursor.execute('''
    INSERT INTO accounts(username,email,password)
    VALUES('George','george@mail.com','george')
''')

cursor.execute('''
    INSERT INTO accounts(username,email,password)
    VALUES('Jessica Loo','jessicaloo@mail.com','jessica')
''')

cursor.execute('''
    INSERT INTO accounts(username,email,password)
    VALUES('Cho Chang','chochang@mail.com','chochang')
''')


db.commit()
db.close()