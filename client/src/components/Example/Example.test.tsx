import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Example, { IExample } from './Example'
import { exampleNoteJa, exampleProfile } from '../../utils/constants'
import { Profile } from 'src/types'

const mockProfiles: Profile[] = [
  {
    ...exampleProfile,
    id: 1,
    name: 'Profile 1'
  },
  {
    ...exampleProfile,
    id: 2,
    name: 'Profile 2'
  }
]

const defaultProps: IExample = {
  note: exampleNoteJa,
  profiles: mockProfiles,
  isPlaying: false,
  showCompact: false,
  showFurigana: false,
  exportNote: jest.fn(),
  playAudio: jest.fn()
}

// Mock HTMLMediaElement methods
window.HTMLMediaElement.prototype.play = jest.fn()
window.HTMLMediaElement.prototype.pause = jest.fn()

describe('Example Component', () => {
  it('renders component properly, full view', () => {
    const { asFragment } = render(<Example {...defaultProps} />)
    const furiganaComponent = screen.getByTestId('furigana-component')

    expect(asFragment()).toMatchSnapshot()
    expect(furiganaComponent).toBeInTheDocument()
    expect(furiganaComponent.innerHTML).toContain(exampleNoteJa.highlighted_sentence)
  })

  it('renders component properly, compact view', () => {
    const { asFragment } = render(<Example {...defaultProps} showCompact={true} />)
    const furiganaComponent = screen.getByTestId('furigana-component')

    expect(asFragment()).toMatchSnapshot()
    expect(furiganaComponent).toBeInTheDocument()
    expect(furiganaComponent.innerHTML).toContain(exampleNoteJa.highlighted_sentence)
  })

  it('calls playAudio when play button is clicked', () => {
    render(<Example {...defaultProps} />)
    const playButton = screen.getByRole('button', { name: 'Play audio' })
    fireEvent.click(playButton)

    expect(defaultProps.playAudio).toHaveBeenCalledWith(defaultProps.note.audio)
  })

  it('calls stopAudio when stop button is clicked', () => {
    render(<Example {...defaultProps} isPlaying={true} />)
    const stopButton = screen.getByRole('button', { name: 'Stop audio' })
    fireEvent.click(stopButton)

    expect(defaultProps.playAudio).toHaveBeenCalled()
  })

  it('calls exportNote when export profile is selected', () => {
    render(<Example {...defaultProps} />)
    const exportButton = screen.getByText(/export to anki/i)
    fireEvent.click(exportButton)
    const profileOption = screen.getByText(/Profile 1/i)
    fireEvent.click(profileOption)

    expect(defaultProps.exportNote).toHaveBeenCalledWith(mockProfiles[0], exampleNoteJa)
  })

  it('calls exportNote when other export profile is selected', () => {
    render(<Example {...defaultProps} />)
    const exportButton = screen.getByText(/export to anki/i)
    fireEvent.click(exportButton)
    const profileOption = screen.getByText(/Profile 2/i)
    fireEvent.click(profileOption)

    expect(defaultProps.exportNote).toHaveBeenCalledWith(mockProfiles[0], exampleNoteJa)
  })
})
