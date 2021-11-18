import React, { Fragment, useContext } from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import styles from './styles'
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-utils-scale'
import { CallContext } from '../../context/CallContext'

const Chat = ({ route, navigation: { goBack } }) => {
  const { otherId, userId, messages, onSend } = useContext(CallContext)

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={() => goBack()}>
          <Icon
            name="arrowleft"
            size={scale(26)}
            color="#06595A"
          />
        </TouchableOpacity>
        <Text style={styles.text}>{otherId}</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
          name: userId,
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }}
        messagesContainerStyle={{
          backgroundColor: '#FFF',
        }}
      />
    </Fragment>
  )
}

export default Chat