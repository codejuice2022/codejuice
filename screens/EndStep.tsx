import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import CommonButton from '~/src/components/CommonButton'
import { ClosingLine, EndStepWrap } from '~/src/components/end-components'
import { RootState } from '../core/redux/rootReducer'

const EndStep = () => {
  const [isUpload, setIsUpload] = useState(false)

  const { userInfo, gameScore } = useSelector((state: RootState) => state.global)

  useEffect(() => {
    if (isUpload) {
      Alert.alert(`이름: ${userInfo.name}\n스코어: ${gameScore}`)

      setIsUpload(false)
    }
  }, [isUpload])

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
