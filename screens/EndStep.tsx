import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import CommonButton from '~/src/components/CommonButton'
import { ClosingLine, EndStepWrap } from '~/src/components/end-components'
import { postGameClearData } from '~/utils/api/game'
import { RootState } from '../core/redux/rootReducer'

const EndStep = () => {
  const [isUpload, setIsUpload] = useState(false)

  const { userInfo, gameScore } = useSelector((state: RootState) => state.global)

  useEffect(() => {
    if (isUpload) {
      // 중복 api 방지
      saveClearData()
    }
  }, [isUpload])

  const saveClearData = async () => {
    try {
      const _res = await postGameClearData({
        center: userInfo.center,
        userName: userInfo.name,
        phone: userInfo.phone,
        score: gameScore,
      })

      if (_res) {
        Alert.alert('저장되었습니다.')
      }
    } catch (e) {
      console.error(e)
      Alert.alert('저장에 실패하였습니다.')
    }

    setIsUpload(false)
  }

  const handleUploadResult = () => {
    setIsUpload(true)
  }

  return (
    <EndStepWrap>
      <ClosingLine>{'수고하셨습니다.\n참여해주셔서 감사합니다.'}</ClosingLine>

      <CommonButton title={'결과 저장'} isActive onPress={handleUploadResult} />
    </EndStepWrap>
  )
}

export default EndStep
