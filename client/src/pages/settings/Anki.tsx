import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from 'flowbite-react'
import { toast } from 'react-toastify'
import { IoClipboard } from 'react-icons/io5'

import { ankiConnectDefaultAddress } from 'src/utils/constants'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { pingAnki, setAddress } from 'src/features/ankiSlice'
import { RootState } from 'src/app/store'

export default function Anki (): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { address, connectionOk } = useAppSelector((store: RootState) => store.anki)
  const [input, setInput] = useState<string>(address)

  const handleChange = (event: any): void => {
    setInput(event.target.value)
  }

  const update = (): void => {
    void dispatch(setAddress(input))
  }

  const ping = (response: boolean): void => {
    void dispatch(pingAnki())
    if (response) {
      toast.info('Connection checked')
    }
  }

  useEffect(() => {
    ping(false)
  }, [])

  const copyText = (): void => {
    const textToCopy = 'https://www.jesdb.org'
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Link copied to clipboard')
      }).catch(() => {
        toast.error('Failed to copy text')
      })
  }

  return (
    <div>
      <p className="mb-4 text-xl font-semibold dark:text-white" id="anki-settings-heading">
        Anki settings
      </p>
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="flex">
          <span
            className="relative flex h-3 w-3 mt-1"
            role="status"
            aria-live="polite"
            aria-label={connectionOk ? 'Connected to Anki' : 'Cannot connect to Anki'}
          >
            <span
              className={`
                animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                ${connectionOk ? 'bg-green-400' : 'bg-red-400'}
              `}
            />
            <span
              className={`
                relative inline-flex rounded-full h-3 w-3
                ${connectionOk ? 'bg-green-500' : 'bg-red-500'}
              `}
            />
          </span>
          <p className="ml-2 text-sm dark:text-white">
            {connectionOk
              ? 'Connected to Anki'
              : 'Cannot connect to Anki. Make sure Anki is open and check AnkiConnect CORS policy.'
            }
          </p>
        </div>
        <div>
          <Button
            color="blue"
            size="xs"
            onClick={() => { ping(true) }}
            aria-label="Check Anki connection status"
          >
            Check connection
          </Button>
        </div>
      </div>
      <h2
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        id="ankiconnect-url-heading"
      >
        AnkiConnect URL:
      </h2>
      <div className="flex flex-row gap-2 mb-4">
        <div className="w-1/2">
          <input
            value={input}
            onChange={handleChange}
            type="text"
            id="ankiconnect_url"
            className={`
              shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-jesdark-500 dark:focus:border-jesdark-500 dark:shadow-sm-light
            `}
            required
            aria-labelledby="ankiconnect-url-heading"
          />
        </div>
        <Button
          disabled={input === address}
          color="warning"
          onClick={update}
          aria-label="Update AnkiConnect URL"
        >
          Update
        </Button>
      </div>
      <ul className="list-disc pl-4 mb-4 mt-2">
        <li
          id="helper-text-explanation-anki-connect-port"
          className="mt-2 text-sm text-gray-500 dark:text-gray-100"
        >
          Address and port AnkiConnect is listening, default <b>{ankiConnectDefaultAddress}</b>
        </li>
        <li
          id="helper-text-explanation-anki-connect-cors"
          className="mt-2 text-sm text-gray-500 dark:text-gray-100"
        >
          Remember to add <span>https://www.jesdb.org</span>
          <button
            className="link"
            onClick={copyText}
            aria-label="Copy URL to clipboard"
            aria-describedby="helper-text-explanation-anki-connect-cors"
          >
            <Tooltip content="Copy URL to clipboard">
              <IoClipboard />
            </Tooltip>
          </button>
          to AnkiConnect
          <a
            className="link"
            href="https://i.ibb.co/Z6DTHNr/instructions.jpg"
            target="_blank"
            rel="noreferrer"
            aria-label="Instructions for AnkiConnect CORS policy"
          >
            CORS policy
          </a>
        </li>
        <li
          id="helper-text-explanation-anki-connect-install-link"
          className="mt-2 text-sm text-gray-500 dark:text-gray-100"
        >
          If you have not installed Anki yet, you can do it from
          <a
            href="https://apps.ankiweb.net/"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Download Anki from the official website"
          >
            here
          </a>
        </li>
        <li
          id="helper-text-explanation-anki-connect-install-link"
          className="mt-2 text-sm text-gray-500 dark:text-gray-100"
        >
          If you have not installed AnkiConnect yet, you can do it from
          <a
            href="https://ankiweb.net/shared/info/2055492159"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Install AnkiConnect from the official website"
          >
            here
          </a>
        </li>
      </ul>
    </div>
  )
}
