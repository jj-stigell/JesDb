import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Flowbite } from 'flowbite-react'
import { Provider } from 'react-redux'

import About from '../pages/misc/About'
import Home from '../pages/home'
import MainLayout from '../layout'
import NotFound from '../pages/errors/NotFound'
import OAuth from '../pages/auth/OAuth'
import PrivacyPolicy from '../pages/misc/PrivacyPolicy'
import RouterError from '../pages/errors/RouteError'
import Search from '../pages/search'
import Settings from '../pages/settings'
import Toast from '../components/Toast'
import Tos from '../pages/misc/Tos'

import { persistor, store } from './store'

export default function App (): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Flowbite>
          <Toast/>
          <Router>
            <Routes>
              <Route element={<MainLayout />} errorElement={<RouterError />}>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path="/auth/callback" element={<OAuth />} />
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='/search' element={<Search />} />
                <Route path='/settings/:tab' element={<Settings />} />
                <Route path='/tos' element={<Tos />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </Flowbite>
      </PersistGate>
    </Provider>
  )
}
