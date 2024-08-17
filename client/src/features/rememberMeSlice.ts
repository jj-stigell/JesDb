import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RememberMe {
  rememberEmail?: string
  rememberPassword?: string
}

const initialState: RememberMe = {
  rememberEmail: undefined,
  rememberPassword: undefined
}

const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    resetRemeberMe () {
      return initialState
    },
    setRememberMe (_state, action: PayloadAction<RememberMe>) {
      return action.payload
    }
  }
})

export const {
  resetRemeberMe,
  setRememberMe
} = rememberSlice.actions

export default rememberSlice.reducer
