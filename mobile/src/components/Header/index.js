import React from 'react'
import Text from '../Text'
import {
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-element-textinput'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import { useNavigation } from '@react-navigation/core'
import UserController from '../../controllers/User'

const Header = ({
  onChangeText,
  logout: connLogout,
  user
}) => {
  const { navigate } = useNavigation()
  const { logout } = UserController()

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: 'auto',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <TextInput
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          labelStyle={{ fontSize: 18 }}
          textErrorStyle={{ fontSize: 1 }}
          onChangeText={onChangeText}
          placeholder="Search contact"
          renderRightIcon={() => (
            <Icon
              style={{ marginRight: 4 }}
              name="search1"
              size={24}
            />
          )}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#02AFB2',
            borderRadius: 25,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            logout()
            connLogout(user)
            navigate('Login')
          }}
        >
            <Icon
              name="logout"
              size={18}
              color='#FFF'
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header