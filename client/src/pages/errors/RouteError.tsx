import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function RouterError (): React.JSX.Element {
  const error = useRouteError()

  return (
    <div role="alert" aria-live="assertive">
      {(isRouteErrorResponse(error))
        ? <p>{error.statusText}</p>
        : (error instanceof Error)
            ? <p>{error.message}</p>
            : <p>Error occurred!</p>
      }
    </div>
  )
}
