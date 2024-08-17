import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SearchBar from 'src/components/SearchBar'

export default function Home (): React.JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const navigate = useNavigate()

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    navigate(`/search?q=${keyword}`)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center grid grid-cols-1 w-11/12 md:w-1/2">
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2"
          aria-labelledby="search-form"
        >
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            disabled={false}
            loading={false}
            aria-label="Search for Japanese sentences"
          />
        </form>
        <div className="max-w-xl mx-auto mt-4 p-6 dark:text-white">
          <h2
            id="home-title"
            className="text-2xl font-bold mb-4"
          >
            JesDb - Japanese example sentence Database
          </h2>
          <p className="mb-4">
            +100k example sentence database gathered from Youtube videos. Examples vary from
            vlogging, cooking, tech, TEDx Talks to history, politics, pop culture, and much more!
          </p>
          <p className="mb-4">
            JesDb lets you find example sentences based on words,
            sentences and kanji, quickly and easily.
          </p>
          <p className="mb-4">
            Quickly export to your
            <a
              href="https://apps.ankiweb.net/"
              target="_blank"
              className="link"
              rel="noreferrer"
              aria-label="Anki website"
            >
              Anki
            </a>
            decks with example audio,
            translations, and much more. Install
            <a
              href="https://ankiweb.net/shared/info/2055492159"
              target="_blank"
              className="link"
              rel="noreferrer"
              aria-label="AnkiConnect addon"
            >
              AnkiConnect
            </a>
              addon to get started.
          </p>
          <p className="mb-4">
            Enter any Japanese text or English word in the search box,
            and JesDb will search best examples for you.
          </p>
          <h3
            id="example-searches-title"
            className="text-xl font-semibold mb-2"
          >
            Example Searches
          </h3>
          <p>Here’s a few example searches to get you started:</p>
          <ul className="list-disc pl-8 mb-4 mt-1" aria-labelledby="example-searches-title">
            <li>
              <strong>English search:</strong>
              <button
                className="link"
                onClick={() => { navigate('/search?q=house') }}
                aria-label="Search for 'house' in English"
              >
                house
              </button>
            </li>
            <li>
              <strong>Japanese search:</strong>
              <button
                className="link"
                onClick={() => { navigate('/search?q=自動車') }}
                aria-label="Search for '自動車' (car) in Japanese"
              >
                自動車
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
