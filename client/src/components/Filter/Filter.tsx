import React, { FormEvent } from 'react'
import { Label, Radio } from 'flowbite-react'

import { Filters } from 'src/types'

export const initFilters: Filters = {
  sort: 'relevance',
  onlyTranslated: false
}

interface IFilter {
  setFilters: (filters: Filters) => void
  filters: Filters
  disable: boolean
}

export default function Filter ({
  setFilters,
  filters,
  disable
}: IFilter): React.JSX.Element {
  const setSort = (event: FormEvent<HTMLFieldSetElement>): void => {
    const target = event.target as HTMLInputElement
    const value = target.value as Filters['sort']
    setFilters({ ...filters, sort: value })
  }

  const setTranslation = (event: FormEvent<HTMLFieldSetElement>): void => {
    const target = event.target as HTMLInputElement
    const value = target.value
    setFilters({ ...filters, onlyTranslated: value === 'translation-required' })
  }

  const resetFilters = (): void => {
    setFilters(initFilters)
  }

  return (
    <div
      className={`
        mb-2 border-x-2 border-b-2 rounded-lg border-blue-100
        p-2 mt-1 dark:border-jesdark-800 dark:bg-jesdark-600
      `}
    >
      <div className="flex justify-end">
        <button
          onClick={resetFilters}
          disabled={disable}
          className="underline text-red-400 hover:text-red-500"
          aria-label="Reset filters"
        >
          Reset filters
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3/6">
          <fieldset
            onChange={setSort}
            className="flex max-w-md flex-rows flex-wrap gap-4"
            aria-labelledby="sort-by-legend"
          >
            <legend id="sort-by-legend" className="mb-2 dark:text-white">
              Sort by
            </legend>
            <div className="flex items-center gap-1">
              <Radio
                id="relevance"
                name="sort"
                value="relevance"
                checked={filters.sort === 'relevance'}
                onChange={() => {}}
                disabled={disable}
              />
              <Label htmlFor="relevance">Relevance</Label>
            </div>
            <div className="flex items-center gap-1">
              <Radio
                id="shortness"
                name="sort"
                value="shortness"
                checked={filters.sort === 'shortness'}
                onChange={() => {}}
                disabled={disable}
              />
              <Label htmlFor="shortness">Shortness</Label>
            </div>
            <div className="flex items-center gap-1">
              <Radio
                id="longness"
                name="sort"
                value="longness"
                checked={filters.sort === 'longness'}
                onChange={() => {}}
                disabled={disable}
              />
              <Label htmlFor="longness">Longness</Label>
            </div>
          </fieldset>
        </div>
        <div className="w-3/6">
          <fieldset
            onChange={setTranslation}
            className="flex max-w-md flex-rows flex-wrap gap-4"
            aria-labelledby="translation-legend"
          >
            <legend id="translation-legend" className="mb-2 dark:text-white">
              Only examples with translation
            </legend>
            <div className="flex items-center gap-1">
              <Radio
                id="translation-required"
                name="translation"
                value="translation-required"
                checked={filters.onlyTranslated}
                onChange={() => {}}
                disabled={disable}
                aria-checked={filters.onlyTranslated}
              />
              <Label htmlFor="translation-required">Yes</Label>
            </div>
            <div className="flex items-center gap-1">
              <Radio
                id="translation-optional"
                name="translation"
                value="translation-optional"
                checked={!filters.onlyTranslated}
                onChange={() => {}}
                disabled={disable}
                aria-checked={!filters.onlyTranslated}
              />
              <Label htmlFor="translation-optional">No</Label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
