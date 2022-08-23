import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Alert, View } from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import { useDispatch } from 'react-redux'
import { RootStackParamList, RouteList } from '~/consts/types/rootStackParams'
import { setUserInfo } from '~/core/redux/slices/globalSlice'
import CommonButton from '~/src/components/CommonButton'
import {
  InputTitle,
  InputWrap,
  IntroInfoWrap,
  IntroTitle,
  IntroWrap,
  KurlyLogo,
  NameInput,
  SelectorWrap,
} from '~/src/components/intro-components'
import CommonLayout from '~/src/layout/CommonLayout'

type PickingStepScreenProp = StackNavigationProp<RootStackParamList, RouteList>

const Intro = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<PickingStepScreenProp>()

  const phoneInput = useRef<PhoneInput>(null)
  const [userName, setUserName] = useState('')
  const [center, setCenter] = useState('송파')
  const [phone, setPhone] = useState('')
  const [formatted, setFormatted] = useState('')
  const [isPhoneChecked, setIsPhoneChecked] = useState(false)

  const isActive = useMemo(() => !!(userName && center && isPhoneChecked), [userName, center, isPhoneChecked])

  const handleStartButton = () => {
    if (!isPhoneChecked) {
      Alert.alert('전화번호를 다시 확인해주세요.')

      return
    }

    dispatch(
      setUserInfo({
        name: userName,
        center,
        phone: formatted,
      })
    )

    navigation.navigate('PickingStep')
  }

  const onChangeText = (_phoneNumText: string) => {
    const checkValid = phoneInput.current?.isValidNumber(_phoneNumText)

    setIsPhoneChecked(!!checkValid)
  }

  const onChangeFormattedText = (_phoneNumFormatted: string) => setFormatted(_phoneNumFormatted)

  return (
    <CommonLayout>
      <IntroWrap>
        <KurlyLogo />
        <IntroInfoWrap>
          <IntroTitle>{"Team code-juice's\nKurly Simulator"}</IntroTitle>

          <InputWrap>
            <InputTitle>이름</InputTitle>
            <NameInput placeholder="user name" onChangeText={setUserName} maxLength={10} value={userName} />
          </InputWrap>

          <InputWrap>
            <InputTitle>센터</InputTitle>
            <SelectorWrap>
              <Picker
                selectedValue={center}
                onValueChange={(v) => setCenter(v)}
                style={{ fontSize: 12, color: '#222', height: 40 }}
              >
                <Picker.Item value={'송파'} label={'송파'} style={{ fontSize: 12 }} />
                <Picker.Item value={'화도'} label={'화도'} style={{ fontSize: 12 }} />
                <Picker.Item value={'죽전'} label={'죽전'} style={{ fontSize: 12 }} />
                <Picker.Item value={'곤지암'} label={'곤지암'} style={{ fontSize: 12 }} />
                <Picker.Item value={'김포'} label={'김포'} style={{ fontSize: 12 }} />
                <Picker.Item value={'고촌'} label={'고촌'} style={{ fontSize: 12 }} />
                <Picker.Item value={'항동'} label={'항동'} style={{ fontSize: 12 }} />
                <Picker.Item value={'삼우'} label={'삼우'} style={{ fontSize: 12 }} />
              </Picker>
            </SelectorWrap>
          </InputWrap>

          <InputWrap>
            <InputTitle>전화번호</InputTitle>

            <PhoneInput
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="KR"
              layout="second"
              onChangeText={onChangeText}
              onChangeFormattedText={onChangeFormattedText}
              codeTextStyle={{
                fontSize: 12,
              }}
              containerStyle={{
                height: 30,
                padding: 0,
              }}
              flagButtonStyle={{
                width: 70,
                height: 30,
                margin: 0,
              }}
              textContainerStyle={{
                margin: 0,
                paddingLeft: 10,
              }}
              textInputStyle={{
                fontSize: 12,
                padding: 0,
              }}
            />
          </InputWrap>

          <View style={{ marginBottom: 45 }}>
            <CommonButton title="시작하기" onPress={handleStartButton} isActive={isActive} />
          </View>
        </IntroInfoWrap>
      </IntroWrap>
    </CommonLayout>
  )
}

export default Intro
