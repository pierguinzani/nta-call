import AsyncStorage from '@react-native-community/async-storage'
import users from '../../users.json'

const UserController = () => {
  const login = async (user, navigate, conn) => {
    if (users.find(({ name }) => user === name)) {
      conn.send(JSON.stringify({
        type: 'login',
        name: user,
      }))
      AsyncStorage.setItem('user', user)
      navigate('Home', { user, connection: conn })
    } else {
      alert("User doesn't exist")
    }
  }

  const logout = () => {
    AsyncStorage.removeItem('userId')
  }

  return {
    login,
    logout
  }
}

export default UserController