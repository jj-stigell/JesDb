import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { executeAction } from 'src/lib/anki'
import { ExtraArgument, RootState } from 'src/app/store'
import { ankiConnectDefaultAddress } from 'src/utils/constants'

export type ModelNames = Record<string, number>

interface Configs {
  connectionOk: boolean
  address: string
}

interface Anki extends Configs {
  deckNames: string[]
  modelNames: ModelNames[]
  processing: boolean
}

const initialState: Anki = {
  connectionOk: false,
  address: ankiConnectDefaultAddress,
  deckNames: [],
  modelNames: [],
  processing: false
}

export const pingAnki =
  createAsyncThunk('anki/pingAnki', async (_, { getState }): Promise<Configs> => {
    const state = getState() as RootState
    const address = state.anki.address
    const { result } = await executeAction('modelNames', undefined, 6, address)

    return {
      connectionOk: result !== null,
      address
    }
  })

export const setAddress =
  createAsyncThunk('anki/setAddress', async (address: string, { extra }): Promise<Configs> => {
    const { toast } = extra as ExtraArgument
    const { result, error } = await executeAction('modelNames', undefined, 6, address)

    if (error !== null) {
      toast.error(error)
    } else {
      toast.success('AnkiConnect url updated!')
    }

    return {
      connectionOk: result !== null,
      address
    }
  })

export const getDeckNames =
  createAsyncThunk('anki/getDeckNames', async (_, { getState, extra }): Promise<string[]> => {
    const state = getState() as RootState
    const { toast } = extra as ExtraArgument
    const data = await executeAction('deckNames', undefined, 6, state.anki.address)

    if (data.error !== null) {
      toast.error(data.error)
      return []
    }

    if (data.result === null) {
      toast.error('No decks found!')
      return []
    }

    return data.result
  })

export const getModelNamesAndIds =
  createAsyncThunk(
    'anki/getModelNamesAndIds',
    async (_, { getState, extra }): Promise<ModelNames[]> => {
      const state = getState() as RootState
      const { toast } = extra as ExtraArgument
      const data = await executeAction('modelNamesAndIds', undefined, 6, state.anki.address)

      if (data.error !== null) {
        toast.error(data.error)
        return []
      }

      if (data.result === null) {
        toast.error('No models found!')
        return []
      }

      return data.result
    })

const ankiSlice = createSlice({
  name: 'anki',
  initialState,
  reducers: {
    resetAnki () {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDeckNames.pending, (state) => {
        state.processing = true
      })
      .addCase(getModelNamesAndIds.pending, (state) => {
        state.processing = true
      })
      .addCase(setAddress.fulfilled, (state, action: PayloadAction<Configs>) => {
        return {
          ...state,
          ...action.payload
        }
      })
      .addCase(getDeckNames.fulfilled, (state, action: PayloadAction<string[]>) => {
        return {
          ...state,
          deckNames: action.payload,
          processing: false
        }
      })
      .addCase(getModelNamesAndIds.fulfilled, (state, action: PayloadAction<ModelNames[]>) => {
        return {
          ...state,
          modelNames: action.payload,
          processing: false
        }
      })
      .addCase(pingAnki.fulfilled, (state, action: PayloadAction<Configs>) => {
        return {
          ...state,
          ...action.payload
        }
      })
  }
})

export const {
  resetAnki
} = ankiSlice.actions

export default ankiSlice.reducer
