import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { toast } from 'react-toastify'

import { NODE_ENV } from 'src/utils/environment'
import accountReducer from '../features/accountSlice'
import ankiReducer from '../features/ankiSlice'
import modalSlice from 'src/features/modalSlice'
import profileReducer from '../features/profileSlice'
import rememberMeReducer from '../features/rememberMeSlice'
import settingsReducer from '../features/settingsSlice'
import supabase from 'src/lib/supabase'

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['audio', 'modal']
}

const rootReducer = combineReducers({
  account: accountReducer,
  anki: ankiReducer,
  modal: modalSlice,
  profile: profileReducer,
  remember: rememberMeReducer,
  settings: settingsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// References:
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
// https://redux.js.org/usage/writing-logic-thunks#injecting-config-values-into-thunks

export const store = configureStore({
  reducer: persistedReducer,
  devTools: NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
      thunk: {
        extraArgument: {
          api: supabase,
          toast
        }
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export interface ExtraArgument {
  api: typeof supabase
  toast: typeof toast
}
