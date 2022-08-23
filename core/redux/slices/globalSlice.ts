import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  name: string
  center: string
  phone: string
}

interface GlobalState {
  userInfo: UserInfo
  gameScore: number
}

const initialState: GlobalState = {
  userInfo: {
    name: '',
    center: '',
    phone: '',
  },
  gameScore: 0,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
    },
    setGameScore(state, action: PayloadAction<number>) {
      state.gameScore = action.payload
    },
  },
})

export const { setUserInfo, setGameScore } = globalSlice.actions

export default globalSlice.reducer
