import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound (): React.JSX.Element {
  return (
    <div className="mt-12 flex flex-col items-center justify-center" role="main">
      <div className="w-full md:w-3/4 flex flex-col items-center justify-center text-center">
        <p
          className="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-white mt-10 mb-4"
          role="alert"
        >
          Page you were looking for was not found
        </p>
        <Link
          to="/"
          className="link text-xl"
          aria-label="Go back to the homepage"
        >
          Back Home
        </Link>
      </div>
    </div>
  )
}
