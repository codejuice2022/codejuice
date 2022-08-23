import React from 'react'
import styled from 'styled-components/native'
import Logo from '~/public/images/logo-kurly-w.svg'

export const IntroWrap = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #5f0080;
`

export const KurlyLogo = styled(Logo)`
  position: absolute;
  top: 50px;
  left: 50px;
`

export const IntroInfoWrap = styled.ScrollView`
  width: 40%;
  background-color: white;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px 40px;
`

export const IntroTitle = styled.Text`
  font-size: 15px;
  color: #222;
  margin-bottom: 15px;
  font-family: sans-serif;
  line-height: 24px;
  font-weight: 700;
`

export const InputWrap = styled.View`
  margin-bottom: 30px;
`
export const InputTitle = styled.Text`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 8px;
  font-family: sans-serif;
`

export const NameInput = styled.TextInput`
  color: #222;
  font-size: 12px;
  text-align: left;
  border-bottom-color: #555;
  border-bottom-width: 1px;
  padding: 2px 2px 2px 15px;
`

export const SelectorWrap = styled.View`
  border-bottom-color: #555;
  border-bottom-width: 1px;
`
