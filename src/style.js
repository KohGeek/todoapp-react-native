import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addSubTaskbtn: {
    backgroundColor: 'coral',
    right: 140,
    padding: 16,
    marginTop: 16,
  },

  addButton: {
    backgroundColor: '#6360F3',
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    position: 'relative',
    bottom: 50,
  },

  addIcon: {
    color: 'white',
    position: 'relative',
    left: 3,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'green',
    right: 75,
    padding: 16,
    marginTop: 16,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 10,
    padding: 16,
    marginTop: 16,
  },

  backTextWhite: {
    color: '#FFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#23272a',
  },
  content: {
    padding: 40,
    flex: 1,
  },

  date: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
  },

  days: {
    fontSize: 50,
    color: 'white',
    paddingLeft: 10,
  },

  header: {
    height: '20%',
    width: '100%',
    borderRadius: 8,
    paddingTop: 38,
    backgroundColor: '#2c2f33',
  },

  header_footer: {
    height: 80,
    paddingTop: 38,
    backgroundColor: '#2c2f33',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input_box: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 10,
    color: 'white',
  },

  item: {
    position: 'relative',
    top: 5,
  },

  list: {
    marginTop: 20,
    flex: 1,
  },

  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  rowFront: {
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },

  slash: {
    textDecorationLine: 'line-through',
  },

  time_info: {
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 20,
  },

  userContainer: {
    position: 'absolute',
    right: 10,
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    width: 150,
  },

  wrapper: {
    padding: 16,
    marginTop: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },

  view: {
    paddingTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  addTaskHeader: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputStyle: {
    color: 'white',
    backgroundColor: '#313437',
    borderRadius: 50,
  },

  priority: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  touchableBtn: {
    backgroundColor: '#313437',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },

  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
    color: 'white',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },

  addTaskwrapper: {
    marginVertical: 1,
  },

  icon: {
    width: 20,
    height: 20,
  },
  userinfo: {
    fontSize: 40,
    textAlign: 'left',
    marginTop: 5,
    color: 'white',
  },
  userinforight: {
    fontSize: 40,
    textAlign: 'right',
    marginTop: 5,
    color: 'white',
  },
  newinput: {
    fontSize: 20,
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  passinput: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 30,
  },
  editlabel: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
    color: 'white',
  },
});
