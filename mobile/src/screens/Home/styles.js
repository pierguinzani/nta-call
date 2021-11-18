import { StyleSheet } from 'react-native'
import { scale } from 'react-native-utils-scale'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  itemSlider: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSlider: {
    borderRadius: scale(8),
  },
  item: {
    padding: scale(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    borderRadius: scale(40),
  },
  wrap: {
    flex: 1,
  },
  text: {
    marginHorizontal: scale(8),
    lineHeight: scale(24),
  },
  title: {
     // backgroundColor: 'white',
     marginVertical: 20,
     fontSize: 20,
  },
  imgContacts: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    // marginHorizontal: (Dimensions.get('window').width - 67 * 3) / 6,
    // marginBottom: 10
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  txtNotificationModal: { fontSize: 16, fontWeight: '600' },
  textinput: {
    borderBottomWidth: scale(0.5),
    height: scale(60),
    borderBottomColor: 'gray',
    marginVertical: scale(22),
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  btnRejectCall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FC015B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAcceptCall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#02AFB2',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default styles
