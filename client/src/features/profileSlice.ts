import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ExtraArgument, RootState } from 'src/app/store'
import { Profile, NewProfile } from 'src/types'

interface ProfileState {
  processing: boolean
  profiles: Profile[]
}

const initialState: ProfileState = {
  processing: false,
  profiles: []
}

export const addProfile =
  createAsyncThunk(
    'profile/addProfile',
    async (newProfile: NewProfile, { getState, extra }): Promise<Profile | undefined> => {
      const { api, toast } = extra as ExtraArgument
      const state = getState() as RootState

      const { data, error } = await api
        .from('profiles')
        .insert({
          user_id: state.account.id,
          ...newProfile
        })
        .select()

      if (error !== null) {
        toast.error(error.message)
        return undefined
      } else {
        toast.success(`New export profile named "${newProfile.name}" created succesfully!`)
      }

      return data[0]
    })

export const deleteProfile =
  createAsyncThunk(
    'profile/deleteProfile', async (id: number, { extra }): Promise<number | undefined> => {
      const { api, toast } = extra as ExtraArgument

      const { error } = await api
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error !== null) {
        toast.error(error.message)
        return undefined
      }

      return id
    })

export const getProfiles =
  createAsyncThunk('profile/getProfiles', async (_, { extra }): Promise<Profile[] | undefined> => {
    const { api, toast } = extra as ExtraArgument

    const { data, error } = await api
      .from('profiles')
      .select()

    if (error !== null) {
      toast.error(error.message)
      return undefined
    }

    return data
  })

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfiles () {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addProfile.pending, (state) => {
        state.processing = true
      })
      .addCase(addProfile.fulfilled, (state, action: PayloadAction<Profile | undefined>) => {
        return {
          processing: false,
          profiles: action.payload !== undefined
            ? state.profiles.concat(action.payload)
            : state.profiles
        }
      })
      .addCase(deleteProfile.pending, (state) => {
        state.processing = true
      })
      .addCase(deleteProfile.fulfilled, (state, action: PayloadAction<number | undefined>) => {
        return {
          processing: false,
          profiles: state.profiles.filter(profile => profile.id !== action.payload)
        }
      })
      .addCase(getProfiles.pending, (state) => {
        state.processing = true
      })
      .addCase(getProfiles.fulfilled, (_state, action: PayloadAction<Profile[] | undefined>) => {
        return {
          processing: false,
          profiles: action.payload ?? []
        }
      })
  }
})

export const {
  resetProfiles
} = profileSlice.actions

export default profileSlice.reducer
