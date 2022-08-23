import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styled, { css } from 'styled-components/native'
import { colorSet } from '~/consts/styles'

interface Props {
  onPress: () => void
  title: string
  theme?: 'dark' | 'white'
  isActive: boolean
}

const ButtonWrap = styled.TouchableNativeFeedback`
  display: flex;
  height: 280px;
  margin-bottom: 30px;
`

const StyledButton = styled(View)`
  border-radius: 30px;
  padding: 12px;
  margin: 0 auto;
  width: 100%;
  max-width: 200px;
  border: 1px solid ${colorSet.baseColor};
  transition: 0.2s background-color;

  ${({ theme, isActive }: { theme: Props['theme']; isActive: Props['isActive'] }) =>
    !isActive
      ? css`
          background-color: ${colorSet.inActive};
          border: 1px solid ${colorSet.inActive};
        `
      : isActive && theme === 'dark'
      ? css`
          background-color: ${colorSet.baseColor};
        `
      : css`
          background-color: #ffffff;
        `}
`

const StyledButtonText = styled(Text)`
  text-align: center;
  color: ${({ theme }) => (theme === 'dark' ? `#ffffff` : `${colorSet.baseColor}`)};
`

const CommonButton = ({ onPress, title, isActive, theme = 'dark' }: Props) => {
  return (
    <ButtonWrap onPress={onPress}>
      <StyledButton theme={theme} isActive={isActive}>
        <StyledButtonText theme={theme}>{title}</StyledButtonText>
      </StyledButton>
    </ButtonWrap>
  )
}

export default CommonButton
