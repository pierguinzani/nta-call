import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: 'red' },
    btnMicro: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnCamera: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnVolume: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    videoCallActions: {
        justifyContent: 'center',
            alignItems: 'center',
            height: 240,
            width: 60,
            position: 'absolute',
    },
    dotThree: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnEndCall: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FC015B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnChat: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowOptions: {
        flexDirection: 'row',
        height: 80,
        width: '100%',
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },
    otherStream: {
        height: '100%',
        width: '100%',
        zIndex: -1
    },
    otherVideo: { 
        flex: 1, 
        backgroundColor: '#000', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: -1 
    },
    btnChangeVideos: {
        marginTop: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    userStream: {
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    userVideo: {
        width: 80,
        height: 140,
        backgroundColor: '#02AFB2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    container: {
        height: 160,
        position: 'absolute',
        top: 40,
        alignItems: 'center',
    }

})

export default styles