import React from 'react'
import { Button } from 'flowbite-react'
import { HiOutlinePlusSm } from 'react-icons/hi'

import ProfileItem from 'src/components/ProfileItem'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store'
import { deleteProfile } from 'src/features/profileSlice'
import { setModal } from 'src/features/modalSlice'

export default function Profiles (): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { connectionOk } = useAppSelector((store: RootState) => store.anki)
  const { processing, profiles } = useAppSelector((store: RootState) => store.profile)

  return (
    <>
      <div>
        <p id="export-profiles-heading" className="mb-4 text-xl font-semibold dark:text-white">
          Note Export Profiles
        </p>
      </div>
      <p id="new-profile-heading" className="mb-4 text-lg font-semibold dark:text-white">
        New profile
      </p>
      <div className="flex w-full">
        <Button
          color="blue"
          disabled={!connectionOk || processing}
          onClick={() => {
            dispatch(setModal({ activeModal: 'profile', size: '2xl', dismissible: true }))
          }}
          aria-label="Add new export profile"
          aria-describedby="new-profile-heading"
        >
          <HiOutlinePlusSm className="mr-2 h-5 w-5" aria-hidden="true" />
          Add New Profile
        </Button>
      </div>
      {!connectionOk && (
        <p className="mt-4 text-red-600" role="alert">
          Cannot connect to Anki. Make sure Anki is open and
          AnkiConnect is installed and configured correctly.
        </p>
      )}
      <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700" />
      {profiles.length === 0
        ? (
            <p className="mt-4 dark:text-white" aria-live="polite">
              No profiles found, create a new one using the button above.
            </p>
          )
        : (
            <>
              <div>
                <h1
                  id="your-profiles-heading"
                  className="mb-4 text-lg font-semibold dark:text-white"
                >
                  Your export profiles:
                </h1>
              </div>
              <ul aria-labelledby="your-profiles-heading">
                {profiles.map((profile) => (
                  <ProfileItem
                    key={profile.id}
                    profile={profile}
                    deleteProfile={() => { void dispatch(deleteProfile(profile.id)) }}
                    aria-label={`Export profile: ${profile.name}`}
                  />
                ))}
              </ul>
            </>
          )}
    </>
  )
}
