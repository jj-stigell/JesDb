import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import CloseButton from './CloseButton'

describe('CloseButton Component', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { asFragment } = render(<CloseButton onClick={mockOnClick} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onClick when the button is clicked', () => {
    render(<CloseButton onClick={mockOnClick} />)
    fireEvent.click(screen.getByRole('button'))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when the button is disabled', () => {
    const { asFragment } = render(<CloseButton onClick={mockOnClick} disabled />)
    fireEvent.click(screen.getByRole('button'))

    expect(mockOnClick).not.toHaveBeenCalled()
    expect(asFragment()).toMatchSnapshot()
  })
})
