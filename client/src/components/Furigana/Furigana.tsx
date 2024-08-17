import React from 'react'
import { parseRuby } from '../../utils/helpers'

interface IFurigana {
  text: string
  withFurigana: string
  withHighlight: string
  highlightedLanguage: string
  withFuriganaAndHighlight: string
  showFurigana: boolean
}

export default function Furigana ({
  text,
  withFurigana,
  withHighlight,
  highlightedLanguage,
  withFuriganaAndHighlight,
  showFurigana
}: IFurigana): React.JSX.Element {
  const style = 'text-lg dark:text-white'

  if (!showFurigana) {
    if (highlightedLanguage === 'ja') {
      return (
        <div
          className={style}
          data-testid="furigana-component"
          lang="ja"
          aria-live="polite"
          dangerouslySetInnerHTML={{ __html: withHighlight }}
        />
      )
    } else {
      return (
        <div
          className={style}
          data-testid="furigana-component"
          aria-live="polite"
        >
          {text}
        </div>
      )
    }
  }

  const createMarkup = (): { __html: string } => {
    return {
      __html: parseRuby(withFurigana)
    }
  }

  return (
    <div
      className={style}
      data-testid="furigana-component"
      lang="ja"
      aria-live="polite"
      dangerouslySetInnerHTML={createMarkup()}
    />
  )
}
