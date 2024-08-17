import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { useThemeMode } from 'flowbite-react'

import Toast from './Toast'

// Mock useThemeMode and window.innerWidth
jest.mock('flowbite-react', () => ({
  useThemeMode: jest.fn()
}))

describe('Toast Component', () => {
  beforeEach(() => {
    (useThemeMode as jest.Mock).mockImplementation(() => ({ computedMode: 'light' }))
  })

  it('matches snapshot for large screen', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 650 })
    const { asFragment } = render(<Toast />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot for small screen', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 649 })
    const { asFragment } = render(<Toast />)

    expect(asFragment()).toMatchSnapshot()
  })
})
