import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { Button, Pagination } from 'flowbite-react'
import { HiOutlineFilter } from 'react-icons/hi'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Example from 'src/components/Example'
import Filter, { initFilters } from 'src/components/Filter'
import NoResults from './NoResults'
import ResultSettings from 'src/components/ResultSettings'
import SearchBar from 'src/components/SearchBar'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { scrollToTop } from 'src/utils/helpers'
import { setResultsPerPage, toggleCompact, toggleFurigana } from 'src/features/settingsSlice'
import { Filters, Note, Profile } from 'src/types'
import { exportNote } from 'src/lib/anki'
import { search } from 'src/lib/supabase'

export default function Search (): React.JSX.Element {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const { address } = useAppSelector(state => state.anki)
  const { resultsPerPage, compactExample, showFurigana } = useAppSelector(state => state.settings)
  const { profiles } = useAppSelector(state => state.profile)

  const q: string | null = searchParams.get('q')

  const [keyword, setKeyword] = useState<string>('')
  const [filters, setFilters] = useState<Filters>(initFilters)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const [results, setResults] = useState<Note[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null)

  const searchNotes = (keyword: string, filters: Filters): void => {
    setSearching(true)
    search(keyword, filters).then(({ error, data }) => {
      if (error !== null) {
        toast.error(error.message)
      }

      if (data !== null) {
        setResults(data)
        setTotalPages(Math.ceil(data.length / resultsPerPage))
        setCurrentPage(1)
      }
    }).catch(error => {
      toast.error(error.message)
    }).finally(() => {
      setSearching(false)

      if (inputRef.current !== null) {
        inputRef.current.select()
      }
    })
  }

  useEffect(() => {
    if (q !== null) {
      setKeyword(q)
      searchNotes(q, filters)
    }
  }, [])

  useEffect(() => {
    setTotalPages(Math.ceil(results.length / resultsPerPage))

    // If resultsPerPage is changed, change page if the new page is out of bounds.
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1)
    }
  }, [resultsPerPage])

  const changePage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      scrollToTop()
    }
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set('q', keyword)
    history.pushState({}, '', url)
    searchNotes(keyword, filters)
  }

  const exportToAnki = (profile: Profile, example: Note): void => {
    exportNote({ profile, note: example, address })
      .then(({ error, result }) => {
        if (error !== null) {
          toast.error(error)
        }

        if (result !== null) {
          toast.success(result)
        }
      }).catch(error => {
        toast.error(error.message)
      })
  }

  const playAudio = (url: string): void => {
    audioPlayingId === url ? setAudioPlayingId(null) : setAudioPlayingId(url)
  }

  const handleChange = (value: number): void => {
    dispatch(setResultsPerPage(value))
  }

  const toggleCompactView = (): void => {
    dispatch(toggleCompact())
  }

  const toggleFuriganas = (): void => {
    dispatch(toggleFurigana())
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center grid grid-cols-1 w-11/12 md:w-9/12 lg:w-6/12">
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2"
          aria-label="Search Form"
        >
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            disabled={searching}
            loading={searching}
            inputRef={inputRef}
            aria-label="Search for notes"
          />
          <div className="w-1/6">
            <Button
              disabled={searching}
              type="button"
              onClick={() => { setShowFilters(!showFilters) }}
              color="blue"
              className="dark:bg-jesdark-500 dark:hover:bg-jesdark-700"
              aria-expanded={showFilters}
              aria-controls="filter-section"
            >
              <p className="hidden sm:block">Filters</p>
              <HiOutlineFilter className="sm:ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </form>
        {showFilters && (
          <Filter
            setFilters={setFilters}
            filters={filters}
            disable={searching}
            aria-label="Filter options"
          />
        )}
        {results.length !== 0 && (
          <div>
            <div className="flex flex-wrap justify-between sm:gap-2 mt-2">
              <div>
                <p
                  className="text-xs md:text-base text-blue-600 my-2 dark:text-jesdark-200"
                  aria-live="polite"
                >
                  {results.length} {results.length > 1 ? 'results' : 'result'}
                </p>
              </div>
              <div>
                <ResultSettings
                  setResultsPerPage={handleChange}
                  resultsPerPage={resultsPerPage}
                  showCompact={compactExample}
                  showFurigana={showFurigana}
                  toggleCompactView={toggleCompactView}
                  toggleFurigana={toggleFuriganas}
                />
              </div>
            </div>
            <div>
            {
              results
                .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
                .map(example => (
                  <Example
                    key={example.id}
                    note={example}
                    profiles={profiles}
                    isPlaying={audioPlayingId === example.audio}
                    showCompact={compactExample}
                    showFurigana={showFurigana}
                    exportNote={exportToAnki}
                    playAudio={playAudio}
                    aria-label={`Example ${example.id}`}
                  />
                ))
            }
            </div>
            {(results.length / resultsPerPage) > 1 && (
              <div className="my-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={changePage}
                  previousLabel=""
                  nextLabel=""
                  showIcons
                  aria-label="Pagination"
                />
              </div>
            )}
          </div>
        )}
        {(!searching && results.length === 0) && (
          <NoResults keyword={keyword} aria-live="polite" />
        )}
      </div>
    </div>
  )
}
