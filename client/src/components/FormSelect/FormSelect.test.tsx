import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import FormSelect from './FormSelect'

describe('FormSelect Component', () => {
  const defaultProps = {
    id: 'test-select',
    disabled: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
    labelText: 'Select an option',
    helperText: 'Helper text'
  }

  it('should render the component with all props', () => {
    const { asFragment } = render(<FormSelect {...defaultProps} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument()
    expect(screen.getByText('Helper text')).toBeInTheDocument()
    defaultProps.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('should display the label text correctly', () => {
    render(<FormSelect {...defaultProps} />)

    expect(screen.getByLabelText('Select an option')).toBeInTheDocument()
  })

  it('should display the helper text correctly', () => {
    render(<FormSelect {...defaultProps} />)

    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  it('should render the correct number of options', () => {
    render(<FormSelect {...defaultProps} />)
    const options = screen.getAllByRole('option')

    // +1 for the default "-" option (omit)
    expect(options).toHaveLength(defaultProps.options.length + 1)
  })

  it('should disable the select element when disabled prop is true', () => {
    const { asFragment } = render(<FormSelect {...defaultProps} disabled={true} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByLabelText('Select an option')).toBeDisabled()
  })

  it('should enable the select element when disabled prop is false', () => {
    render(<FormSelect {...defaultProps} disabled={false} />)

    expect(screen.getByLabelText('Select an option')).toBeEnabled()
  })
})
