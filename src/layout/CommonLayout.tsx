import React from 'react'
import styled from 'styled-components/native'

interface Props {
  children: React.ReactNode
}

const Layout = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transperant;
`

const CommonLayout = ({ children }: Props) => {
  return <Layout>{children}</Layout>
}

export default CommonLayout
