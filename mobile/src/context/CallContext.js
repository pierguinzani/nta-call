import React, { useState, useEffect, useRef, createContext, useCallback } from "react";
import { SOCKET_URL, STUN_SERVER } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import InCallManager from 'react-native-incall-manager';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    mediaDevices,
} from 'react-native-webrtc';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';

const CallContext = createContext();

let conn = new WebSocket(SOCKET_URL)

let yourConn = (
    new RTCPeerConnection({
        iceServers: [
            {
                urls: STUN_SERVER,
            },
        ],
    })
)

const CallProvider = ({ children }) => {
    const [userId, setUserId] = useState('')
    const [socketActive, setSocketActive] = useState(false)
    const [calling, setCalling] = useState(false)
    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    // const [audioMuted, setAudioMuted] = useState(true)
    // const [videoMuted, setVideoMuted] = useState(true)
    const [callActive, setCallActive] = useState(false)
    const [incomingCall, setIncomingCall] = useState(false)
    const [otherId, setOtherId] = useState('')
    const connectedUser = useRef(null)
    const offerRef = useRef(null)
    const messagesRef = useRef([])
    const [messagesState, setMessagesState] = useState([])
    const updateMessages = (messages) => {
        messagesRef.current = messages
        setMessagesState(messages)
    }

    useEffect(() => {
        if (userId.length === 0) AsyncStorage.getItem('user', (_, storageId) => setUserId(storageId))
        setNewConn()
    }, [])

    const setNewConn = () => {
        setSocketActive(false)
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
                case 'chat':
                    console.log(messagesRef.current.map(({ text }) => text), { msg })
                    updateMessages(GiftedChat.append(messagesRef.current, {
                        _id: uuid.v4(),
                        text: data.message,
                        user: {
                            _id: 2,
                        },
                    }));
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
    }

    const onSend = (newMessage) => {
        console.log(messagesRef.current.map(({ text }) => text))
        updateMessages(GiftedChat.append(messagesRef.current, {
            _id: uuid.v4(),
            text: newMessage[0].text,
            user: {
                _id: 1
            }
        }));
        conn.send(
            JSON.stringify({ type: 'chat', name: connectedUser.current, message: newMessage[0].text })
        );
    };

    useEffect(() => {
        if (!callActive) {
            InCallManager.stop()
        } else {
            InCallManager.start({ media: "audio" })
            InCallManager.setForceSpeakerphoneOn(true)
        }
    }, [callActive])


    const registerPeerEvents = () => {
        yourConn.onaddstream = event => {
            console.log('On Add Remote Stream')
            setRemoteStream(event.stream)
        }

        // Setup ice handling
        yourConn.onicecandidate = event => {
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
                yourConn.addStream(stream)
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
        if (message.type === 'logout') console.log({ conn: conn, string: JSON.stringify(message) })
        conn.send(JSON.stringify(message))
    }

    const onCall = (userToCall) => {
        setOtherId(userToCall)
        setCalling(true)
        connectedUser.current = userToCall
        console.log('Caling to', userToCall)
        // create an offer

        yourConn.createOffer().then(offer => {
            offerRef.current = offer;
            send({
                type: 'offer',
                offer: offer,
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
        yourConn
            .setRemoteDescription(offer)
            .then(function () {
                connectedUser.current = name
                return yourConn.createAnswer()
            })
            .then(function (answer) {
                yourConn.setLocalDescription(answer)
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
        yourConn.setLocalDescription(offerRef.current)
        yourConn.setRemoteDescription(new RTCSessionDescription(answer))
    }

    //when we got an ice candidate from a remote user
    const handleCandidate = candidate => {
        setCalling(false)
        // console.log('Candidate ----------------->', candidate)
        yourConn.addIceCandidate(new RTCIceCandidate(candidate))
    }

    const muteAudio = async (mute) => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled = mute
        }
    }

    const muteVideo = async (mute) => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled = mute
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

    const logout = (user) => {
        send({
            type: 'logout',
            name: user
        })
        conn = new WebSocket(SOCKET_URL)
        setNewConn()
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
        yourConn.onicecandidate = null
        yourConn.ontrack = null

        resetPeer()
        initLocalVideo()

        console.log('Leave Done')
    }

    const resetPeer = () => {
        yourConn = new RTCPeerConnection({
            iceServers: [
                {
                    urls: STUN_SERVER,
                },
            ],
        })

        registerPeerEvents()
    }

    return (
        <CallContext.Provider
            value={{
                localStream,
                remoteStream,
                incomingCall,
                otherId,
                userId,
                socketActive,
                messages: messagesState,

                onCall,
                handleLeave,
                rejectCall,
                muteAudio,
                muteVideo,
                acceptCall,
                logout,
                onSend
            }}>
            {children}
        </CallContext.Provider>)
}

export { CallProvider, CallContext, conn };