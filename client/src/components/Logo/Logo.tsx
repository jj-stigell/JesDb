import React from 'react'

export default function Logo (): React.JSX.Element {
  return (
    <h1
      className={`
        text-4xl text-center font-extrabold bg-gradient-to-r
        from-orange-500 to-yellow-300 text-transparent bg-clip-text`
      }
      role="img"
      aria-label="JesDb logo"
    >
      JesDb
    </h1>
  )
}
