import { StyleSheet } from 'react-native'
import { fontScale, scale } from 'react-native-utils-scale';

const styles = StyleSheet.create({
  main: { padding: scale(30), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFF' },
  text: { fontWeight: '600', fontSize: scale(26) },
  button: {
    position: 'absolute',
    top: scale(35),
    left: scale(30)
  }
})

export default styles