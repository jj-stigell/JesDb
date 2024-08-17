import React from 'react'
import { Link } from 'react-router-dom'

import { setModal } from 'src/features/modalSlice'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { feedbackLink } from 'src/utils/constants'

export default function Menu (): React.JSX.Element {
  const isLoggedIn: boolean = useAppSelector(state => state.account.isLoggedIn)
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center mt-2 mb-4">
      <div className="flex justify-center grid grid-cols-3 w-11/12 sm:w-1/2">
        <div className="w-1/2 text-center col-span-1">
          <h1
            className={`
              text-4xl font-extrabold bg-gradient-to-r from-orange-500
              to-yellow-300 inline-block text-transparent bg-clip-text
            `}
          >
            <Link to="/" aria-label="Home page">JesDb</Link>
          </h1>
        </div>
        <div className="flex flex-wrap text-wrap gap-2 sm:gap-4 col-span-2 items-start justify-end">
          <Link
            className="link"
            to="/"
            aria-label="Navigate to Home"
          >
            Home
          </Link>
          <Link
            className="link"
            to="/settings/general"
            aria-label="Navigate to Settings"
          >
            Settings
          </Link>
          <a
            className="link"
            href={feedbackLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Give Feedback"
          >
            Feedback
          </a>
          {!isLoggedIn && (
            <>
              <button
                className="link"
                aria-label="Open login modal"
                onClick={() => {
                  dispatch(setModal({ activeModal: 'login', size: 'md', dismissible: true }))
                }}
              >
                Sign in
              </button>
              <button
                className="link"
                aria-label="Open registration modal"
                onClick={() => {
                  dispatch(setModal({ activeModal: 'register', size: 'md', dismissible: true }))
                }}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
