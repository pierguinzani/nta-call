import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Call from './screens/Call'
import Chat from './screens/Chat'
import Contact from './screens/Contact'
const Stack = createStackNavigator()
import { CallProvider } from './context/CallContext'

const Routes = () => {
  return (
    <NavigationContainer>
      <CallProvider>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Call" component={Call} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
      </CallProvider>
    </NavigationContainer>
  )
}

export default Routes
