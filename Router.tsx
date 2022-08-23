import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Intro from './screens/Intro'
import PickingStep from './screens/PickingStep'
import EndStep from './screens/EndStep'

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen name="IntroStep" component={Intro} />
      <Stack.Screen name="PickingStep" component={PickingStep} />
      <Stack.Screen name="EndStep" component={EndStep} />
    </Stack.Navigator>
  )
}

export default Router
