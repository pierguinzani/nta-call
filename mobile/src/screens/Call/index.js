import React, { useContext, useState } from 'react'
import { Dimensions, View, TouchableOpacity, Text, StatusBar } from 'react-native'
import styles from './styles'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/core'
import Modal from 'react-native-modal';
import {
  RTCView,
} from 'react-native-webrtc';
import { CallContext } from '../../context/CallContext'

const Call = ({ route }) => {
  const [cameras, setCameras] = useState(true)
  const { user, item, mute } = route.params
  const [muteOptions, setMuteOptions] = useState(null)
  const [muteState, setMuteState] = useState({
    sound: false,
    camera: mute,
    micro: false
  })
  const { navigate } = useNavigation()
  // const { remoteStream, localStream, handleLeave } = call
  const { remoteStream, localStream, handleLeave, muteVideo, muteAudio, otherId } = useContext(CallContext)

  console.log({otherId})

  return (
    <View style={styles.main}>
      <StatusBar barStyle='light-content' backgroundColor='#000' />
      <View style={[styles.container,{
        left: Dimensions.get('window').width - 100,
      }]}>
        <View style={styles.userVideo}>
          {(muteState.camera && cameras) ? <Feather
            name='camera-off'
            size={30}
            color='#FFF'
          /> :
            <RTCView
              streamURL={(cameras ? localStream : remoteStream) ? (cameras ? localStream : remoteStream).toURL() : ''}
              style={styles.userStream}
              zOrder={1}
            />
          }
        </View>
        <TouchableOpacity style={styles.btnChangeVideos} onPress={() => setCameras(!cameras)}>
          <AntDesign
            name='camera'
            size={20}
            color='#02AFB2'
          />
        </TouchableOpacity>
      </View>
      <View style={styles.otherVideo}>
        {(muteState.camera && !cameras) ?
          <Feather
            name='camera-off'
            size={80}
            color='#FFF'
          />
          : <RTCView
            streamURL={(cameras ? remoteStream : localStream) ? (cameras ? remoteStream : localStream).toURL() : ''}
            style={styles.otherStream}
            zOrder={-1}
          />}
      </View>
      <View style={[styles.rowOptions,{
        top: Dimensions.get('window').height - 120,
      }]}>
        <TouchableOpacity style={styles.btnChat} onPress={() => navigate('Chat', { user, item })}>
          <AntDesign
            name='message1'
            size={30}
            color='#02AFB2'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEndCall} onPress={() => {
          handleLeave()
          navigate('Home', { user })
        }}>
          <AntDesign
            name='phone'
            size={40}
            color='#FFF'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dotThree} onPress={() => setMuteOptions(true)}>
          <Entypo
            name='dots-three-vertical'
            size={30}
            color='#FFF'
          />
        </TouchableOpacity>
      </View>
      <Modal isVisible={muteOptions} onBackdropPress={() => setMuteOptions(false)} backdropOpacity={0.5}>
        <View
          style={[styles.videoCallActions,{
            left: Dimensions.get('window').width - 127.5,
            top: Dimensions.get('window').height - 355
          }]}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setMuteOptions(false)
                setMuteState({
                  ...muteState,
                  sound: !muteState.sound
                })
              }}
              style={styles.btnVolume}>
              {muteState.sound ? <FontAwesome5
                name='volume-mute'
                size={30}
                color='#FFF'
              /> :
                <FontAwesome5
                  name='volume-up'
                  size={30}
                  color='#FFF'
                />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                muteVideo(muteState.camera)
                setMuteOptions(false)
                setMuteState({
                  ...muteState,
                  camera: !muteState.camera
                })
              }}
              style={styles.btnCamera}>
              {muteState.camera ? <Feather
                name='camera-off'
                size={30}
                color='#FFF'
              /> :
                <Feather
                  name='camera'
                  size={30}
                  color='#FFF'
                />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                muteAudio(muteState.micro)
                setMuteOptions(false)
                setMuteState({
                  ...muteState,
                  micro: !muteState.micro
                })
              }}
              style={styles.btnMicro}>
              {muteState.micro ? <FontAwesome5
                name='microphone-slash'
                size={30}
                color='#FFF'
              /> :
                <FontAwesome5
                  name='microphone'
                  size={30}
                  color='#FFF'
                />}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Call