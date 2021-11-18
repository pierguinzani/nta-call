import React, { useContext } from 'react'
import { View, SafeAreaView, Image, TouchableOpacity, Text, StatusBar } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-utils-scale'
import { useNavigation } from '@react-navigation/core'
import { CallContext } from '../../context/CallContext'

const Contact = ({ route, navigation: { goBack } }) => {
  const { navigate } = useNavigation()
  const { item, user } = route.params
  const { onCall, select } = useContext(CallContext)
  console.log({ onCall })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
      <TouchableOpacity onPress={() => goBack()}>
        <Icon
          name="arrowleft"
          size={scale(26)}
          color="#06595A"
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: item.url_photo
            }}
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              onCall(item.name)
              navigate('Call', { user, item, mute: false })
            }}
            style={styles.button}
          >
            <Icon name="videocamera" size={scale(22)} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onCall(item.name)
              navigate('Call', { user, item, mute: true })
            }}
            style={styles.button}
          >
            <Icon name="phone" size={scale(22)} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Role: </Text>
          <Text style={styles.text}>{item.role}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Location: </Text>
          <Text style={styles.text}>{item.location}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>E-mail: </Text>
          <Text style={styles.text}>{item.email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Contact number: </Text>
          <Text style={styles.text}>{item.phone_number}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Contact