import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Furigana from './Furigana'
import { exampleNoteJa } from '../../utils/constants'
import { parseRuby } from '../../utils/helpers'

const defaultProps = {
  text: exampleNoteJa.sentence,
  withFurigana: exampleNoteJa.sentence_furigana,
  withHighlight: exampleNoteJa.highlighted_sentence,
  highlightedLanguage: exampleNoteJa.highlighted_language,
  withFuriganaAndHighlight: exampleNoteJa.sentence_furigana_highlight,
  showFurigana: false
}

describe('Furigana Component', () => {
  it('renders highlighted text without furigana', () => {
    const { asFragment } = render(<Furigana {...defaultProps} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('furigana-component').innerHTML)
      .toContain(exampleNoteJa.highlighted_sentence)
  })

  it('renders non-highlighted text without furigana', () => {
    const { asFragment } = render(<Furigana {...defaultProps} highlightedLanguage='en' />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('furigana-component').innerHTML)
      .toContain(exampleNoteJa.sentence)
  })

  it('does not render highlighted text with furigana even if showFurigana true', () => {
    const { asFragment } = render(<Furigana {...defaultProps} showFurigana={true} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('furigana-component').innerHTML)
      .toContain(parseRuby(exampleNoteJa.sentence_furigana))
  })

  it('renders non-highlighted text with furigana', () => {
    const { asFragment } =
      render(<Furigana {...defaultProps} showFurigana={true} highlightedLanguage='en' />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByTestId('furigana-component').innerHTML)
      .toContain(parseRuby(exampleNoteJa.sentence_furigana))
  })
})
