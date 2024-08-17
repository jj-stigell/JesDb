import React from 'react'

interface ICloseButton {
  onClick: () => void
  disabled?: boolean
}

export default function CloseButton ({
  onClick,
  disabled
}: ICloseButton): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Close"
      className={
        `absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
        rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center
        dark:hover:bg-gray-600 dark:hover:text-white`
      }
      data-modal-hide="popup-modal"
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  )
}
