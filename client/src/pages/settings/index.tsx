import React from 'react'
import { Tabs } from 'flowbite-react'
import { HiUserCircle, HiPuzzle } from 'react-icons/hi'
import { TiExport } from 'react-icons/ti'

import Profiles from './Profiles'
import General from './General'
import Anki from './Anki'

import { useAppSelector } from 'src/app/hooks'

export default function Settings (): React.JSX.Element {
  const isLoggedIn = useAppSelector(store => store.account.isLoggedIn)

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center grid grid-cols-1 w-11/12 sm:w-1/2">
        <div className="my-6 text-center">
          <h1
            id="settings-heading"
            className={`
              text-4xl font-extrabold leading-none tracking-tight
              text-gray-900 dark:text-white
            `}
          >
            Settings
          </h1>
        </div>
        <Tabs aria-label="Settings tab menu" variant="underline" className="dark:text-white">
          <Tabs.Item
            defaultChecked
            title="General"
            icon={HiUserCircle}
            aria-labelledby="general-tab"
          >
            <div aria-labelledby="general-tab">
              <General />
            </div>
          </Tabs.Item>
          <Tabs.Item
            disabled={!isLoggedIn}
            title="Anki"
            icon={HiPuzzle}
            aria-labelledby="anki-tab"
          >
            <div aria-labelledby="anki-tab">
              <Anki />
            </div>
          </Tabs.Item>
          <Tabs.Item
            disabled={!isLoggedIn}
            title="Export"
            icon={TiExport}
            aria-labelledby="export-tab"
          >
            <div aria-labelledby="export-tab">
              <Profiles />
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  )
}
