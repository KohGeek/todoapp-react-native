# Todo App - Todolo

A todo app powered by react-native. The project is not tested on iOS.

## Setup

Use the following to launch the project. Make sure you have Android Studio installed.

Delete any preexisting `node_modules` folder, then run the code below:

```bash
npm ci | npm run android
```

Additionally, to run the python server, install the following packages:

- pyjwt
- flask
- flask-socketio
- eventlet
- flask-cors
- argon2-cffi

If you use pip, use this:

```bash
pip install pyjwt flask flask-socketio eventlet flask-cors argon2-cffi
```

### _Developers_

Icons can be set using the following commands, courtesy of [react-native-make](https://github.com/bamlab/react-native-make):

```bash
npx react-native set-icon --path <path_to_png> --platform android
```

Image should be 1024x1024 in size. Check [this](https://stackoverflow.com/a/40534324) for more information.
