import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from 'flowbite-react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store'
import { logout } from 'src/features/accountSlice'
import { setModal } from 'src/features/modalSlice'

export default function General (): React.JSX.Element {
  const account = useAppSelector((store: RootState) => store.account)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { computedMode, toggleMode } = useThemeMode()

  const logoutUser = (): void => {
    void dispatch(logout())
      .then(() => {
        navigate('/')
      })
  }

  return (
    <>
      {account.isLoggedIn && (
        <>
          <div>
            <p className="py-2 text-xl font-semibold dark:text-white" id="profile-heading">
              Profile
            </p>
            <div
              className="flex flex-col sm:flex-col sm:items-left sm:justify-between gap-4"
              aria-labelledby="profile-heading"
            >
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: <span id="user-email">{account.email}</span>
                </p>
              </div>
              <div>
                <button
                  className="link"
                  onClick={logoutUser}
                  aria-label="Sign out of your account"
                >
                  Sign out
                </button>
              </div>
              <div>
                <button
                  className="link"
                  onClick={() => {
                    dispatch(setModal({ activeModal: 'delete', size: 'md', dismissible: true }))
                  }}
                  aria-label="Delete your account"
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
          <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"/>
        </>
      )}
      <div>
        <p className="py-2 text-xl font-semibold dark:text-white" id="dark-mode-heading">
          Dark mode
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label
            className="inline-flex items-center cursor-pointer"
            htmlFor="toggle_darkmode"
            aria-labelledby="dark-mode-heading"
            aria-describedby="dark-mode-instructions"
          >
            <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Light
            </span>
            <input
              id="toggle_darkmode"
              onClick={toggleMode}
              type="checkbox"
              className="sr-only peer"
              defaultChecked={computedMode === 'dark'}
              aria-label="Toggle dark mode"
            />
            <div
              className={`
                relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4
                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:content-['']
                after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300
                after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                dark:border-gray-600 peer-checked:bg-blue-600
              `}
            />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Dark
            </span>
          </label>
        </div>
        <p id="dark-mode-instructions" className="sr-only">
          Use this switch to toggle between light and dark modes.
        </p>
      </div>
    </>
  )
}
