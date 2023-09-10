# Todo App - Todolo

A todo app powered by react-native. The project is not tested on iOS.

Last tested: 23/08/2023. Working fine except graphical glitches.

## Setup

> [!WARNING]
> Please note that this project has only been tested with JDK 17. It's been reported that JDK 11 _may_ work, while JDK 19 **does not**.

1.  Make sure you have Android Studio installed.
2. Rename `.env.bak` to `.env` and fill in the required fields accordingly. Your IP will be your local machine IP address.
3. Delete any preexisting `node_modules` folder, then run the code below:

```bash
npm ci | npm run android
```

4. Install all python prerequisites listed in `requirements.txt`.
5. Make a copy of `sample.sqlite` to `account.sqlite` or other names as determined in the `server.py` file.
6. To run the python server, use the following:

```bash
npm run server
```

### _Developers_

Icons can be set using the following commands, courtesy of [react-native-make](https://github.com/bamlab/react-native-make):

```bash
npx react-native set-icon --path <path_to_png> --platform android
```

Image should be 1024x1024 in size. Check [this](https://stackoverflow.com/a/40534324) for more information.
