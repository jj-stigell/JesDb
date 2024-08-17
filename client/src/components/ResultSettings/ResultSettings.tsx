import React from 'react'
import { Checkbox } from 'flowbite-react'

interface IResultSettings {
  resultsPerPage: number
  showCompact: boolean
  showFurigana: boolean
  setResultsPerPage: (value: number) => void
  toggleCompactView: () => void
  toggleFurigana: () => void
}

export default function ResultSettings ({
  resultsPerPage,
  showCompact,
  showFurigana,
  setResultsPerPage,
  toggleCompactView,
  toggleFurigana
}: IResultSettings): React.JSX.Element {
  const handleChange = (e: any): void => {
    setResultsPerPage(Number(e.target.value))
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Result settings">
      <div>
        <label
          id="compact_view_label"
          htmlFor="compact_view"
          className="mr-2 text-xs sm:text-base dark:text-white"
        >
          Compact
        </label>
        <Checkbox
          id="compact_view"
          className="mr-4"
          checked={showCompact}
          aria-checked={showCompact}
          aria-labelledby="compact_view_label"
          onChange={toggleCompactView}
        />
      </div>
      <div>
        <label
          id="furigana_label"
          htmlFor="show_furigana"
          className="mr-2 text-xs sm:text-base dark:text-white"
        >
          Furigana
        </label>
        <Checkbox
          id="show_furigana"
          className="mr-4"
          checked={showFurigana}
          aria-checked={showFurigana}
          aria-labelledby="furigana_label"
          onChange={toggleFurigana}
        />
      </div>
      <label
        id="per_page_label"
        htmlFor="per_page_value_selector"
        className="mr-2 text-xs text-gray-900 dark:text-jesdark-200"
      >
        Show results per page
      </label>
      <select
        onChange={handleChange}
        defaultValue={resultsPerPage}
        id="per_page_value_selector"
        aria-labelledby="per_page_label"
        data-testid="per_page_value_selector"
        className={`
          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-jesdark-500 dark:focus:border-jesdark-500
        `}
      >
        {[5, 10, 25, 50].map((amount: number) => (
          <option key={`perpage_${amount}`} value={amount}>{amount}</option>
        ))}
      </select>
    </div>
  )
}
