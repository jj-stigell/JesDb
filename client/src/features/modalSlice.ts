import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalSizes } from 'flowbite-react'

interface Modal {
  activeModal: 'login' | 'register' | 'delete' | 'profile' | 'none'
  size?: keyof ModalSizes
  dismissible?: boolean
}

const initialState: Modal = {
  activeModal: 'none',
  size: undefined,
  dismissible: undefined
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (_state) => {
      return initialState
    },
    setModal: (_state, action: PayloadAction<Modal>) => {
      return action.payload
    }
  }
})

export const {
  closeModal,
  setModal
} = modalSlice.actions

export default modalSlice.reducer
