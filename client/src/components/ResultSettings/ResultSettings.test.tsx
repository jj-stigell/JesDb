import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ResultSettings from './ResultSettings'

describe('ResultSettings Component', () => {
  const mockSetResultsPerPage = jest.fn()
  const mockToggleCompactView = jest.fn()
  const mockToggleFurigana = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with initial prop values', () => {
    const { asFragment } = render(
      <ResultSettings
        resultsPerPage={10}
        showCompact={false}
        showFurigana={true}
        setResultsPerPage={mockSetResultsPerPage}
        toggleCompactView={mockToggleCompactView}
        toggleFurigana={mockToggleFurigana}
      />
    )
    expect(screen.getByLabelText('Compact')).not.toBeChecked()
    expect(screen.getByLabelText('Furigana')).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls toggleCompactView when the compact view checkbox is clicked', () => {
    render(
      <ResultSettings
        resultsPerPage={10}
        showCompact={false}
        showFurigana={true}
        setResultsPerPage={mockSetResultsPerPage}
        toggleCompactView={mockToggleCompactView}
        toggleFurigana={mockToggleFurigana}
      />
    )
    fireEvent.click(screen.getByLabelText('Compact'))

    expect(mockToggleCompactView).toHaveBeenCalledTimes(1)
  })

  it('calls toggleFurigana when the show furigana checkbox is clicked', () => {
    render(
      <ResultSettings
        resultsPerPage={10}
        showCompact={false}
        showFurigana={true}
        setResultsPerPage={mockSetResultsPerPage}
        toggleCompactView={mockToggleCompactView}
        toggleFurigana={mockToggleFurigana}
      />
    )
    fireEvent.click(screen.getByLabelText('Furigana'))

    expect(mockToggleFurigana).toHaveBeenCalledTimes(1)
  })

  it('calls setResultsPerPage when a new page number is selected', () => {
    render(
      <ResultSettings
        resultsPerPage={10}
        showCompact={false}
        showFurigana={true}
        setResultsPerPage={mockSetResultsPerPage}
        toggleCompactView={mockToggleCompactView}
        toggleFurigana={mockToggleFurigana}
      />
    )
    fireEvent.change(screen.getByTestId('per_page_value_selector'), { target: { value: 25 } })

    expect(mockSetResultsPerPage).toHaveBeenCalledWith(25)
  })
})
