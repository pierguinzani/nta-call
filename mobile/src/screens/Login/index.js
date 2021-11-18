import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/core'
import Button from '../../components/Button'
import Text from '../../components/Text'
import { View, StatusBar } from 'react-native'
import { TextInput } from 'react-native-element-textinput'
import styles from './styles'
import { useFormik } from 'formik'
import UserController from '../../controllers/User'
import { CallContext, conn } from '../../context/CallContext'

const Login = () => {
  const { navigate } = useNavigation()
  const { login } = UserController()
  const { socketActive } = useContext(CallContext)

  const formik = useFormik({
    initialValues: {
      user: '',
    },
    validate: values => {
      if (values.user.length === 0) return 'Type your user'
    },
    onSubmit: values => login(values.user.toLowerCase(), navigate, conn),
  })

  return (
    <View style={styles.main}>
      <StatusBar barStyle='light-content' backgroundColor='#02AFB2' />
      <View
        style={styles.container}>
        <Text style={styles.logo1} bold fontSize={100}>
          nta
        </Text>
        <Text style={styles.logo2} fontSize={20}>
          call
        </Text>
      </View>
      <View>
        <Text
          style={styles.label}>
          User
        </Text>
        <TextInput
          style={styles.textinput}
          inputStyle={styles.inputStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholderStyle={styles.placeholder}
          value={formik.values.user}
          onChangeText={formik.handleChange('user')}
          placeholder="type here your user"
          placeholderTextColor="gray"
          focusColor="red"
          textError={formik.errors.user}
        />

        <Button
          style={styles.button}
          title={socketActive ? "Enter" : 'Loading...'}
          border
          fontSize={16}
          onPress={socketActive ? formik.handleSubmit : () => {}}
          textColor="#FFF"
          disabled={!socketActive}
        />
      </View>
    </View>
  )
}

export default Login
