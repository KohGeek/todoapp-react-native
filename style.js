import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addSubTaskbtn: {
    backgroundColor: 'coral',
    right: 140,
    padding: 16,
    marginTop: 16,
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

  wrapper: {
    padding: 16,
    marginTop: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
});
