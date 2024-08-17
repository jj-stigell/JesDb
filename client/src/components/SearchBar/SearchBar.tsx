import React from 'react'
import { HiOutlineSearch, HiX } from 'react-icons/hi'

interface ISearchBar {
  keyword: string
  disabled: boolean
  loading: boolean
  inputRef?: React.RefObject<HTMLInputElement>
  setKeyword: (q: string) => void
}

export default function SearchBar ({
  keyword,
  disabled,
  loading,
  inputRef,
  setKeyword
}: ISearchBar): React.JSX.Element {
  const width = window.innerWidth
  const placeholder = width > 649
    ? 'Search with Japanese or English, e.g, 頑張る...'
    : 'Search e.g., 頑張る...'

  const handleChange = (event: any): void => {
    setKeyword(event.target.value)
  }

  const handleFocus = (): void => {
    if (inputRef?.current !== null) {
      inputRef?.current.select()
    }
  }

  const reset = (): void => {
    setKeyword('')
    if (inputRef?.current !== null) {
      inputRef?.current.focus()
    }
  }

  return (
    <div className="w-full">
      <label
        htmlFor="search"
        id="search-label"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative" role="search">
        <input
          id="search"
          type="search"
          ref={inputRef}
          required
          autoFocus
          value={keyword}
          disabled={disabled}
          aria-labelledby="search-label"
          aria-busy={loading}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder={placeholder}
          className={`
            block w-full p-3 ps-6 md:ps-10 text-lg text-gray-900 border border-2 border-gray-300
            rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-300 dark:text-white
            dark:focus:ring-jesdark-500 dark:focus:border-jesdark-500
          `}
        />
        <button
          type="submit"
          disabled={disabled}
          aria-label="Search"
          data-testid="search-button"
          className={`
            text-white absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none
            focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
            ${disabled
              ? 'bg-blue-400 dark:bg-jesdark-700'
              : 'dark:bg-jesdark-500 bg-blue-600 hover:bg-blue-800 dark:hover:bg-jesdark-700'
            }
          `}
        >
          {loading
            ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="load-spinner"
                  className={`
                  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current
                  border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]
                  `
                  }
                />
              )
            : (
                <HiOutlineSearch className="h-5 w-5" />
              )}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={disabled}
          aria-label="Reset input"
          data-testid="reset-button"
          className={`
            text-grey absolute end-16 bottom-2.5 font-medium
            rounded-lg text-sm px-4 py-2 dark:text-white
          `}
        >
          <HiX className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
