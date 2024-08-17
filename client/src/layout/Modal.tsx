import React from 'react'
import { Modal as FlowbiteModal } from 'flowbite-react'

import Delete from 'src/pages/settings/Delete'
import Login from 'src/pages/auth/Login'
import ProfileForm from 'src/pages/settings/ProfileForm'
import Register from 'src/pages/auth/Register'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store'
import { closeModal } from 'src/features/modalSlice'

export default function Modal (): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { activeModal, size, dismissible } = useAppSelector((store: RootState) => store.modal)

  const toggleModal = (): void => {
    dispatch(closeModal())
  }

  const selectModal = (): React.JSX.Element => {
    switch (activeModal) {
      case 'profile':
        return <ProfileForm toggleForm={toggleModal} />
      case 'delete':
        return <Delete toggleModal={toggleModal} />
      case 'login':
        return <Login toggleModal={toggleModal} />
      case 'register':
        return <Register toggleModal={toggleModal} />
      default:
        return <></>
    }
  }

  if (activeModal === 'none') {
    return <></>
  }

  return (
    <FlowbiteModal
      size={size}
      dismissible={dismissible}
      show={true}
      onClose={toggleModal}
    >
      {selectModal()}
    </FlowbiteModal>
  )
}
