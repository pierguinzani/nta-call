import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  input: {
    backgroundColor: '#E4F7F8',
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    width: Dimensions.get('window').width - 150,
  },
  wrapUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapAvatar: {
    width: 32,
    height: 32,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: { marginLeft: 8, maxWidth: 150 },
})

export default styles