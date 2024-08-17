import React from 'react'
import { Button } from 'flowbite-react'

import { Profile } from 'src/types'

interface IProfileItem {
  profile: Profile
  deleteProfile: () => void
}

export default function ProfileItem ({
  profile,
  deleteProfile
}: IProfileItem): React.JSX.Element {
  return (
    <li
      className={`
        flex justify-between items-center bg-gray-100
        dark:bg-jesdark-600 dark:border-jesdark-700 p-2 rounded-lg my-2
      `}
      role="listitem"
    >
      <div>
        <p
          id={`profile-name-${profile.name}`}
          className="text-lg dark:text-white"
          role="heading"
          aria-level={3}
        >
          {profile.name}
        </p>
        <p className="text-sm dark:text-gray-200">Target deck: {profile.deck_name}</p>
        <p className="text-sm dark:text-gray-200">Note type: {profile.note_type}</p>
        <p className="text-sm dark:text-gray-200">
          Action type: {profile.action_type === 'addNote' ? 'Add new note' : 'Update latest note'}
        </p>
      </div>
      <div>
        <Button
          color="failure"
          onClick={deleteProfile}
          aria-label={`Delete profile: ${profile.name}`}
        >
          Delete
        </Button>
      </div>
    </li>
  )
}
