import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'
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
    try {
      const _map = await getGameMap(centerId)

      setGameMap(_map)
    } catch (e) {
      Alert.alert('센터 정보를 받는데 실패하였습니다.\n잠시 후 다시 시도해주세요.')
    }
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
