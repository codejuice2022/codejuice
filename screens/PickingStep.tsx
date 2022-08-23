import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { RootStackParamList, RouteList } from '~/consts/types/rootStackParams'
import CommonLayout from '~/src/layout/CommonLayout'
import PickingGameCanvas from '../src/components/PickingGameCanvas'

type EndStepScreenProp = StackNavigationProp<RootStackParamList, RouteList>

const PickingStep = () => {
  const navigation = useNavigation<EndStepScreenProp>()

  useEffect(() => {
    SystemNavigationBar.stickyImmersive()
  }, [])

  const moveToNextStep = () => {
    navigation.navigate('EndStep')
  }

  return (
    <CommonLayout>
      <PickingGameCanvas moveToNextStep={moveToNextStep} />
    </CommonLayout>
  )
}

export default PickingStep
