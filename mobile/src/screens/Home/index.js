import React, { useContext, useState } from 'react'
import { SafeAreaView, FlatList, View, Image, Text, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import list from '../../../users.json';
import { useNavigation } from '@react-navigation/core';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather'
import { CallContext } from '../../context/CallContext';

const Home = ({ route }) => {
  const { user } = route.params
  const listWithoutMe = list.filter(({ name }) => {
    return name !== user
  })
  const { navigate } = useNavigation()
  const [users, setUsers] = useState(listWithoutMe)
  const { acceptCall, rejectCall, incomingCall, otherId, logout } = useContext(CallContext)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#FFF' />
      <Header
        onChangeText={user => {
          setUsers(listWithoutMe.filter(({ name }) => name.startsWith(user.toLowerCase())))
        }}
        logout={logout}
        user={user}
      />
      <Text style={ [styles.title ,{
        marginLeft: (Dimensions.get('window').width - 67 * 3) / 6
      }]}>Contacts</Text>
      <FlatList
        numColumns={3}
        data={users}
        // style={{ backgroundColor: 'white' }}
        contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.listItem} onPress={() => navigate('Contact', { item, user })}>
              <Image
                style={[styles.imgContacts, {marginHorizontal: (Dimensions.get('window').width - 67 * 3) / 6}]}
                source={{
                  uri: item.url_photo,
                }}
              />
              <Text style={styles.iconName}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Modal isVisible={incomingCall} backdropOpacity={0.96}>
        <View
          style={styles.modal}>
          <Text style={styles.txtNotificationModal}>
            {otherId + ' is calling you'}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-evenly', width: '100%' }}>
            <TouchableOpacity style={styles.btnAcceptCall} onPress={async () => {
              await acceptCall()
              navigate('Call', { user })
            }}>
              <Feather
                name='phone-call'
                size={30}
                color='#FFF'
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRejectCall} onPress={() => rejectCall()}>
              <Feather
                name='phone-missed'
                size={30}
                color='#FFF'
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Home