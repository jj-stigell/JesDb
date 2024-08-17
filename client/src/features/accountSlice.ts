import {
  PayloadAction,
  ThunkDispatch,
  UnknownAction,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'

import { resetProfiles } from './profileSlice'
import { resetSettings } from './settingsSlice'
import { resetAnki } from './ankiSlice'
import { ExtraArgument } from 'src/app/store'

interface Account {
  id: string
  email: string
  isLoggedIn: boolean
  processing: boolean
}

const initialState: Account = {
  id: '',
  email: '',
  isLoggedIn: false,
  processing: false
}

function reset (dispatch: ThunkDispatch<unknown, unknown, UnknownAction>): void {
  // React 18 automatically batches all state updates
  // https://react-redux.js.org/api/batch
  dispatch(resetProfiles())
  dispatch(resetSettings())
  dispatch(resetAnki())
}

export const logout = createAsyncThunk('account/logout', async (_, { dispatch, extra }) => {
  const { api, toast } = extra as ExtraArgument
  const { error } = await api.auth.signOut()

  if (error !== null) {
    toast.error(error.message)
  } else {
    reset(dispatch)
  }
})

export const deleteAccount = createAsyncThunk(
  'account/deleteAccount', async (_, { dispatch, extra }
  ) => {
    const { api, toast } = extra as ExtraArgument
    const { error } = await api.rpc('delete_user')

    if (error !== null) {
      toast.error(error.message)
    } else {
      toast.success('Account deleted, sorry to see you go!')
      reset(dispatch)
    }
  })

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccount () {
      return initialState
    },
    setAccount (_state, action: PayloadAction<Account>) {
      return action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(logout.pending, (state) => {
        state.processing = true
      })
      .addCase(deleteAccount.pending, (state) => {
        state.processing = true
      })
      .addCase(logout.fulfilled, () => {
        return initialState
      })
      .addCase(deleteAccount.fulfilled, () => {
        return initialState
      })
  }
})

export const {
  resetAccount,
  setAccount
} = accountSlice.actions

export default accountSlice.reducer
