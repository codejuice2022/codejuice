import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import store from './core/redux/store'

import { NavigationContainer } from '@react-navigation/native'
import Router from './Router'

import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <StatusBar hidden />
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App
