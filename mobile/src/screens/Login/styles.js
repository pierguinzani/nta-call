import { StyleSheet } from 'react-native'
import { fontScale, scale } from 'react-native-utils-scale';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#02AFB2',
    justifyContent: 'center',
    padding: scale(48),
  },
  container: {
    alignItems: 'flex-end',
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    marginBottom: 60,
  },
  logo1: {
    marginBottom: -16,
    color: '#FFF',
  },
  logo2: {
    color: '#FFF',
  },
  textinput: {
    borderBottomWidth: scale(0.5),
    height: scale(60),
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  inputStyle: { fontSize: fontScale(16) },
  label: {
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
    marginLeft: 20,
    marginBottom: 10,
  },
  placeholder: {
    fontSize: fontScale(18),
    color: '#000',
    backgroundColor: 'white',
  },
  textErrorStyle: { fontSize: fontScale(16) },
  button: {
    marginTop: scale(32),
    borderWidth: scale(0.5),
    height: scale(50),
    backgroundColor: '#02AFB2',
    borderRadius: 25,
    borderColor: 'white',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  button2: {
    borderWidth: scale(0.5),
    height: scale(50),
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderColor: 'white',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  textOr: {
    alignSelf: 'center',
    marginTop: scale(16),
  },
})

export default styles