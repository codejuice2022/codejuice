import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useSelector } from 'react-redux'
import { RootStackParamList, RouteList } from '~/consts/types/rootStackParams'
import { RootState } from '~/core/redux/rootReducer'
import CommonLayout from '~/src/layout/CommonLayout'
import { getGameMap } from '~/utils/api/game'
import PickingGameCanvas from '../src/components/PickingGameCanvas'

type EndStepScreenProp = StackNavigationProp<RootStackParamList, RouteList>

const PickingStep = () => {
  const navigation = useNavigation<EndStepScreenProp>()

  const [gameMap, setGameMap] = useState<number[][] | null>(null)
  const centerId = useSelector((state: RootState) => state.global.userInfo.center)

  useEffect(() => {
    SystemNavigationBar.stickyImmersive()
  }, [])

  useEffect(() => {
    fetchGameMap()
  }, [centerId])

  const fetchGameMap = async () => {
    const _map = await getGameMap(centerId)

    setGameMap(_map)
  }

  const moveToNextStep = () => {
    navigation.navigate('EndStep')
  }

  return (
    <CommonLayout>
      {!gameMap && <Text>loading...</Text>}
      {gameMap && <PickingGameCanvas moveToNextStep={moveToNextStep} gameMap={gameMap} />}
    </CommonLayout>
  )
}

export default PickingStep
