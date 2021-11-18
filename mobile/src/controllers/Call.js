import { useEffect, useState, useRef } from 'react'
import { SOCKET_URL, STUN_SERVER } from '../constants'
import AsyncStorage from '@react-native-community/async-storage'
import InCallManager from 'react-native-incall-manager'
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc'

const CallController = (conn) => {
  const [userId, setUserId] = useState('')
  const [socketActive, setSocketActive] = useState(false)
  const [calling, setCalling] = useState(false)
  const [localStream, setLocalStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [incomingCall, setIncomingCall] = useState(false)
  const [otherId, setOtherId] = useState('')
  const connectedUser = useRef(null)
  const offerRef = useRef(null)
  // const conn = useRef(new WebSocket(SOCKET_URL))

  useEffect(() => {
    if (userId.length === 0) AsyncStorage.getItem('user', (_, storageId) => setUserId(storageId))
  }, [])

  useEffect(() => {
    /**
     *
     * Sockets Signalling
     */



    conn.onopen = () => {
      console.log('Connected to the signaling server')
      setSocketActive(true)
    }
    //when we got a message from a signaling server
    conn.onmessage = msg => {
      const data = JSON.parse(msg.data)
      // console.log('Data --------------------->', data)
      switch (data.type) {
        case 'login':
          console.log('Login')
          break
        //when somebody wants to call us
        case 'offer':
          handleOffer(data.offer, data.name)
          console.log('Offer')
          break
        case 'answer':
          handleAnswer(data.answer)
          console.log('Answer')
          break
        //when a remote peer sends an ice candidate to us
        case 'candidate':
          handleCandidate(data.candidate)
          console.log('Candidate')
          break
        case 'leave':
          handleLeave()
          console.log('Leave')
          break
        default:
          break
      }
    }
    conn.onerror = function (err) {
      console.log('Got error', err)
    }
    initLocalVideo()
    registerPeerEvents()
  }, [])

  useEffect(() => {
    if (!callActive) {
      InCallManager.stop()
    } else {
      InCallManager.start({ media: "audio" })
      InCallManager.setForceSpeakerphoneOn(true)
    }
  }, [callActive])

  useEffect(() => {

    console.log({ socketActive, userId })
    if (socketActive && userId.length > 0) {
      // try {

      // } catch (err) {
      //   console.log('InApp Caller ---------------------->', err)
      // }

      send({
        type: 'login',
        name: userId,
      })
    }
  }, [socketActive, userId])

  const yourConn = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: STUN_SERVER,
        },
      ],
    }),
  )

  const registerPeerEvents = () => {
    yourConn.current.onaddstream = event => {
      console.log('On Add Remote Stream')
      setRemoteStream(event.stream)
    }

    // Setup ice handling
    yourConn.current.onicecandidate = event => {
      if (event.candidate) {
        send({
          type: 'candidate',
          candidate: event.candidate,
        })
      }
    }
  }

  const initLocalVideo = () => {

    mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: 'user',
          // optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      })
      .then(stream => {
        // Got stream!

        setLocalStream(stream)

        // setup stream listening
        yourConn.current.addStream(stream)
      })
      .catch(error => {
        // Log error
      })
    // })
  }

  const send = message => {
    //attach the other peer username to our messages
    if (connectedUser.current) {
      message.name = connectedUser.current
      // console.log('Connected iser in end----------', message)
    }
    if (message.type === 'login') console.log({conn: conn, string: JSON.stringify(message)})
    conn.send(JSON.stringify(message))
  }

  const onCall = (userToCall) => {
    setCalling(true)
    connectedUser.current = userToCall
    console.log('Caling to', userToCall)
    // create an offer

    yourConn.current.createOffer().then(offer => {
      yourConn.current.setLocalDescription(offer).then(() => {
        console.log('Sending Ofer')
        // console.log(offer)
        send({
          type: 'offer',
          offer: offer,
        })
        // Send pc.localDescription to peer
      })
    })
  }

  //when somebody sends us an offer
  const handleOffer = async (offer, name) => {
    console.log(name + ' is calling you.')
    connectedUser.current = name
    offerRef.current = { name, offer }
    setIncomingCall(true)
    setOtherId(name)
    // acceptCall()
  }

  const acceptCall = async () => {
    const name = offerRef.current.name
    const offer = offerRef.current.offer
    setIncomingCall(false)
    setCallActive(true)
    console.log('Accepting CALL', name, offer)
    yourConn.current
      .setRemoteDescription(offer)
      .then(function () {
        connectedUser.current = name
        return yourConn.current.createAnswer()
      })
      .then(function (answer) {
        yourConn.current.setLocalDescription(answer)
        send({
          type: 'answer',
          answer: answer,
        })
      })
      .then(function () {
        // Send the answer to the remote peer using the signaling server
      })
      .catch(err => {
        console.log('Error acessing camera', err)
      })


  }

  //when we got an answer from a remote user
  const handleAnswer = answer => {
    setCalling(false)
    setCallActive(true)
    yourConn.current.setRemoteDescription(new RTCSessionDescription(answer))
  }

  //when we got an ice candidate from a remote user
  const handleCandidate = candidate => {
    setCalling(false)
    // console.log('Candidate ----------------->', candidate)
    yourConn.current.addIceCandidate(new RTCIceCandidate(candidate))
  }

  const muteAudio = async () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !audioMuted
      setAudioMuted(!audioMuted)
    }
  }

  const muteVideo = async () => {
    if (localStream) {
      localStream.getVideoTracks()[0].enabled = !videoMuted
      setVideoMuted(!videoMuted)
    }
  }

  const rejectCall = async () => {
    send({
      type: 'leave',
    })
    // ``
    // setOffer(null)

    // handleLeave()
  }

  const handleLeave = () => {
    send({
      name: userId,
      otherName: otherId,
      type: 'leave',
    })

    setCalling(false)
    setIncomingCall(false)
    setCallActive(false)
    offerRef.current = null
    if (remoteStream) {
      console.log('Releasing remote', remoteStream)
      remoteStream.getTracks().forEach(track => track.stop())
      // remoteStream.release()
    }
    if (localStream) {
      console.log('Releasing remote', localStream)
      localStream.getTracks().forEach(track => track.stop())
    }
    connectedUser.current = null
    setRemoteStream(null)
    setLocalStream(null)
    yourConn.current.onicecandidate = null
    yourConn.current.ontrack = null

    resetPeer()
    initLocalVideo()

    console.log('Leave Done')
  }

  const resetPeer = () => {
    yourConn.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: STUN_SERVER,
        },
      ],
    })

    registerPeerEvents()
  }

  return {
    incomingCall,
    remoteStream,
    localStream,
    onCall,
    handleLeave,
    send,
    muteAudio,
    muteVideo
  }
}

export default CallController