/* eslint-disable max-len */
import React from 'react'
import { Provider } from '@supabase/supabase-js'
import { Button } from 'flowbite-react'

interface IThirdPartyButton {
  provider: Provider
  buttonText: string
  disabled: boolean
  isProcessing: boolean
  onClick: () => void
}

const providerLogos: Record<string, React.ReactNode> = {
  google: (
    <svg
      className="w-4 h-4 me-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 19"
    >
      <path
        fillRule="evenodd"
        d={`
          M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1
          8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27
          5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091
          0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088
          1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z
        `}
        clipRule="evenodd"
      />
    </svg>
  ),
  twitter: (
    <svg
      className="w-4 h-4 me-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 17"
    >
      <path
        fillRule="evenodd"
        d={`
          M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235
          8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0
          0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006
          4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057
          0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831
          2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502
          11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z
        `}
        clipRule="evenodd"
      />
    </svg>
  ),
  github: (
    <svg
      className="w-5 h-5 me-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d={`
          M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0
          1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494
          0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0
          0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079
          2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022
          0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1
          5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406
          1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471
          0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0
          5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0
          0 0 12.007 2Z`
        }
        clipRule="evenodd"
      />
    </svg>
  ),
  facebook: (
    <svg
      className="w-4 h-4 me-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 8 19"
    >
      <path
        fillRule="evenodd"
        d={`
          M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142
          4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z
        `}
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function ThirdPartyButton ({
  provider,
  buttonText,
  disabled,
  isProcessing,
  onClick
}: IThirdPartyButton): React.JSX.Element {
  return (
    <Button
      type="button"
      color="light"
      onClick={onClick}
      disabled={disabled}
      isProcessing={isProcessing}
      className="w-3/4 dark:bg-jesdark-700 dark:hover:bg-jesdark-800"
      aria-label={`${buttonText} with ${provider}`}
      aria-disabled={disabled}
    >
      {providerLogos[provider]}
      {buttonText}
    </Button>
  )
}
