import React from 'react'
import { Button, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

import CloseButton from 'src/components/CloseButton'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { deleteAccount } from 'src/features/accountSlice'

interface IDelete {
  toggleModal: () => void
}

export default function ProfileForm ({
  toggleModal
}: IDelete): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { processing } = useAppSelector(store => store.account)
  const [disabled, setDisabled] = React.useState<boolean>(true)

  const deleteProfile = (): void => {
    dispatch(deleteAccount())
      .then(() => {
        navigate('/')
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === 'delete-me-please') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <div
      className="relative bg-white rounded-lg shadow dark:bg-gray-700"
      aria-labelledby="delete-account-heading"
    >
      <CloseButton onClick={toggleModal} aria-label="Close delete account form"/>
      <div className="p-4 md:p-5 text-center">
        <svg
          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 id="delete-account-heading" className="mb-5 text-lg font-normal dark:text-white">
          Are you sure you want to delete this account? This cannot be undone!
        </h3>
        <p className="mb-5 text-base font-normal dark:text-white">
          Write &quot;delete-me-please&quot; in the field below and press delete button to proceed:
        </p>
        <TextInput
          disabled={processing}
          onChange={handleChange}
          id="confirmation-input"
          aria-describedby="confirmation-instructions"
          type="text"
          className="mb-4"
          placeholder="delete-me-please"
          required
        />
        <p id="confirmation-instructions" className="sr-only">
          Enter &quot;delete-me-please&quot; to enable the delete button.
        </p>
        <div className="flex flex-row justify-evenly">
          <Button
            onClick={deleteProfile}
            disabled={disabled}
            color="failure"
            type="button"
            aria-label="Delete account"
          >
            Delete profile
          </Button>
          <Button
            onClick={toggleModal}
            type="button"
            color="warning"
            aria-label="Cancel delete account"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
