import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Logo from './Logo'

describe('Logo Component', () => {
  it('should render the component with all props', () => {
    const { asFragment } = render(<Logo />)

    expect(screen.getByText('JesDb')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
