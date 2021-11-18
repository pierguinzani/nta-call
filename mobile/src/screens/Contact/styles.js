import { StyleSheet } from 'react-native'
import { scale } from 'react-native-utils-scale'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(30),
    backgroundColor: 'white'
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarContainer: {
    marginTop: scale(40),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: scale(5),
  },
  name: {
    fontSize: scale(24),
    color: '#06595A',
  },
  buttonsContainer: {
    width: '100%',
    marginTop: scale(30),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#02AFB2',
    width: scale(62),
    height: scale(62),
    borderRadius: scale(31),
    marginHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infosContainer: {
    marginTop: scale(50),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(30),
  },
  text: {
    fontSize: scale(18),
    color: '#A8CDCE',
  },
})

export default styles