import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import SearchBar from './SearchBar'

describe('SearchBar Component', () => {
  const setKeyword = jest.fn()

  beforeEach(() => {
    setKeyword.mockClear()
  })

  it('renders with correct placeholder for large screens', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 650 })
    const { asFragment } =
      render(<SearchBar keyword="" loading={false} disabled={false} setKeyword={setKeyword} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByPlaceholderText('Search with Japanese or English, e.g, 頑張る...'))
      .toBeInTheDocument()
  })

  it('renders with correct placeholder for small screens', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 649 })
    const { asFragment } =
      render(<SearchBar keyword="" loading={false} disabled={false} setKeyword={setKeyword} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByPlaceholderText('Search e.g., 頑張る...')).toBeInTheDocument()
  })

  it('updates keyword on input change', () => {
    render(<SearchBar keyword="" loading={false} disabled={false} setKeyword={setKeyword} />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'test' } })

    expect(setKeyword).toHaveBeenCalledWith('test')
  })

  it('resets keyword when reset button is clicked', () => {
    render(<SearchBar keyword="test" loading={false} disabled={false} setKeyword={setKeyword} />)
    fireEvent.click(screen.getByTestId('reset-button'))

    expect(setKeyword).toHaveBeenCalledWith('')
  })

  it('disables input and buttons when disabled', () => {
    render(<SearchBar keyword="test" loading={false} disabled={true} setKeyword={setKeyword} />)
    const input = screen.getByRole('searchbox')
    const searchButton = screen.getByTestId('search-button')
    const resetButton = screen.getByTestId('reset-button')

    expect(input).toBeDisabled()
    expect(searchButton).toBeDisabled()
    expect(resetButton).toBeDisabled()
  })

  it('shows spinner when loading', () => {
    render(<SearchBar keyword="test" loading={true} disabled={false} setKeyword={setKeyword} />)
    expect(screen.getByTestId('load-spinner')).toBeInTheDocument()
  })

  it('matches snapshot with keyword set', () => {
    const { asFragment } =
      render(<SearchBar keyword="test" loading={false} disabled={false} setKeyword={setKeyword} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
