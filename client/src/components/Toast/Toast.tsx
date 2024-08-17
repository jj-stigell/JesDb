import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import { useThemeMode } from 'flowbite-react'

export default function Toast (): React.JSX.Element {
  const { computedMode } = useThemeMode()
  const width = window.innerWidth

  return (
    <ToastContainer
      position={width > 649 ? 'top-center' : 'bottom-center'}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={computedMode}
      transition={Slide}
    />
  )
}
