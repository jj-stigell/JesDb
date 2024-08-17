import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Settings {
  showFurigana: boolean
  compactExample: boolean
  resultsPerPage: number
}

const initialState: Settings = {
  showFurigana: true,
  compactExample: false,
  resultsPerPage: 5
}

const settingsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSettings () {
      return initialState
    },
    setResultsPerPage (state, action: PayloadAction<number>) {
      return {
        ...state,
        resultsPerPage: action.payload
      }
    },
    toggleCompact (state) {
      return {
        ...state,
        compactExample: !state.compactExample
      }
    },
    toggleFurigana (state) {
      return {
        ...state,
        showFurigana: !state.showFurigana
      }
    }
  }
})

export const {
  resetSettings,
  setResultsPerPage,
  toggleCompact,
  toggleFurigana
} = settingsSlice.actions

export default settingsSlice.reducer
