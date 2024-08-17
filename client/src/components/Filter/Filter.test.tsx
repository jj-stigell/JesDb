import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Filter, { initFilters } from './Filter'
import { Filters } from 'src/types'

describe('Filter Component', () => {
  let setFilters: jest.Mock
  let filters: Filters

  beforeEach(() => {
    setFilters = jest.fn()
    filters = initFilters
  })

  it('renders without crashing and displays all filter options', () => {
    const { asFragment } =
      render(<Filter setFilters={setFilters} filters={filters} disable={false} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument()
    expect(screen.getByText(/Only examples with translation/i)).toBeInTheDocument()
  })

  it('calls setFilters with the correct sort value when a sort option is selected', () => {
    render(<Filter setFilters={setFilters} filters={filters} disable={false} />)
    const shortnessRadio = screen.getByLabelText(/Shortness/i)
    fireEvent.click(shortnessRadio)

    expect(setFilters).toHaveBeenCalledWith({ ...filters, sort: 'shortness' })
  })

  it(
    'calls setFilters with the correct translation value when a translation option is selected',
    () => {
      render(<Filter setFilters={setFilters} filters={filters} disable={false} />)
      const translationRequiredRadio = screen.getByLabelText(/Yes/i)
      fireEvent.click(translationRequiredRadio)

      expect(setFilters).toHaveBeenCalledWith({ ...filters, onlyTranslated: true })
    })

  it('resets filters to initial values when reset filters button is clicked', () => {
    render(<Filter setFilters={setFilters} filters={filters} disable={false} />)
    const clearButton = screen.getByText(/reset filters/i)
    fireEvent.click(clearButton)

    expect(setFilters).toHaveBeenCalledWith(initFilters)
  })

  it('disables all filter options when disable prop is true', () => {
    const { asFragment } =
      render(<Filter setFilters={setFilters} filters={filters} disable={true} />)

    const relevanceRadio = screen.getByLabelText(/Relevance/i)
    const shortnessRadio = screen.getByLabelText(/Shortness/i)
    const longnessRadio = screen.getByLabelText(/Longness/i)
    const translationRequiredRadio = screen.getByLabelText(/Yes/i)
    const translationOptionalRadio = screen.getByLabelText(/No/i)

    expect(relevanceRadio).toBeDisabled()
    expect(shortnessRadio).toBeDisabled()
    expect(longnessRadio).toBeDisabled()
    expect(translationRequiredRadio).toBeDisabled()
    expect(translationOptionalRadio).toBeDisabled()
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot when filters are changed', () => {
    const customFilters: Filters = {
      sort: 'longness',
      onlyTranslated: true
    }

    const { asFragment } =
      render(<Filter setFilters={setFilters} filters={customFilters} disable={false} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
