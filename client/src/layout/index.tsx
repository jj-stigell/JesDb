import React from 'react'
import { Outlet } from 'react-router-dom'

import Modal from './Modal'
import Menu from './Menu'
import Footer from './Footer'

export default function MainLayout (): React.JSX.Element {
  return (
    <>
      <div
        className="dark:bg-jesdark-900"
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Modal />
        <Menu />
        <Outlet/>
      </div>
      <Footer />
    </>
  )
}
