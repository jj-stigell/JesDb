import React, { useEffect, useRef, useCallback } from 'react'
import { Button, Dropdown, Tooltip } from 'flowbite-react'
import { HiFilm } from 'react-icons/hi'
import { FaPlay, FaStop } from 'react-icons/fa6'
import { TiExport } from 'react-icons/ti'

import Furigana from '../Furigana'
import { Note, Profile } from 'src/types'

export interface IExample {
  note: Note
  profiles: Profile[]
  isPlaying: boolean
  showCompact: boolean
  showFurigana: boolean
  exportNote: (profile: Profile, note: Note) => void
  playAudio: (url: string) => void
}

export default function Example ({
  note,
  profiles,
  isPlaying,
  showCompact,
  showFurigana,
  exportNote,
  playAudio
}: IExample): React.JSX.Element {
  const audioRef = useRef(new Audio(note.audio ?? ''))
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const handleLoad = (): void => {
    setImageLoaded(true)
  }

  const togglePlay = useCallback((): void => {
    playAudio(note.audio)
  }, [isPlaying, note.audio, playAudio])

  useEffect(() => {
    if (isPlaying) {
      void audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const handleEnded = (): void => { togglePlay() }
    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded)
      audioRef.current.pause()
    }
  }, [isPlaying, note.audio, togglePlay])

  const Skeleton = (): React.JSX.Element => (
    <div
      className={`
        flex items-center justify-center w-full h-44
        bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl`
      }
    >
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
          <path
            d={`
              M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5
              4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0
              1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1
              1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z`
            }
          />
      </svg>
    </div>
  )

  const PlayButton = (): React.JSX.Element => (
    <Button
      size="xs"
      onClick={togglePlay}
      color={isPlaying ? 'failure' : 'blue'}
      aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
    >
      {isPlaying ? <FaStop className="my-0.5" /> : <FaPlay className="my-0.5" />}
    </Button>
  )

  const ExampleTranslation = (): React.JSX.Element => (
    <div className="text-xs dark:text-white">
      {note.highlighted_language === 'en'
        ? (
            <p dangerouslySetInnerHTML={{ __html: note.highlighted_sentence }} />
          )
        : (
            note.translation
          )
      }
    </div>
  )

  const ExportProfilesList = ({ textOnly }: { textOnly: boolean }): React.JSX.Element => {
    if (profiles.length === 0) return <></>

    return (
      <div className="hidden sm:block">
        <Dropdown
          color="blue"
          label={textOnly ? 'Export to Anki' : <TiExport className="h-4 w-4" />}
          dismissOnClick={true}
          size="xs"
          aria-label="Export to Anki dropdown"
        >
          {profiles.map(profile => (
            <Dropdown.Item
              key={profile.name}
              onClick={() => { exportNote(profile, note) }}
              aria-label={`Export to ${profile.name}`}
            >
              {profile.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    )
  }

  const CompactView = (): React.JSX.Element => (
    <div
      className={`
        relative flex flex-col md:flex-row md:space-x-1 space-y-1 md:space-y-0
        rounded-xl shadow-lg p-1 mx-auto border-blue-300 border bg-blue-100
        my-3 dark:bg-jesdark-600 dark:border-jesdark-700
      `}
    >
      <div className="w-full bg-inherit flex flex-col pl-2">
        <div>
          <Furigana
            text={note.sentence}
            withFurigana={note.sentence_furigana}
            withHighlight={note.highlighted_sentence}
            highlightedLanguage={note.highlighted_language}
            withFuriganaAndHighlight={note.sentence_furigana_highlight}
            showFurigana={showFurigana}
          />
        </div>
          <ExampleTranslation />
      </div>
      <div className="flex flex-row gap-3">
        <div>
          <PlayButton />
        </div>
        <Tooltip content="Open source video in new tab">
          <Button
            data-testid="source-button"
            color="blue"
            size="xs"
            onClick={() => {
              window.open(
                `https://youtube.com/watch?v=${note.source_id}&t=${note.start_time}s`,
                '_blank'
              )
            }}>
            <HiFilm className="my-0.5" />
          </Button>
        </Tooltip>
        <ExportProfilesList textOnly={false} />
      </div>
    </div>
  )

  const FullView = (): React.JSX.Element => (
    <div
      className={`
        relative flex flex-col md:flex-row md:space-x-1 space-y-1 md:space-y-0
        rounded-xl shadow-lg p-1 mx-auto border-blue-300 border bg-blue-100
        my-3 dark:bg-jesdark-600 dark:border-jesdark-700
      `}
    >
      <div className="w-full md:w-1/2 bg-inherit grid place-items-center">
        {!imageLoaded && <Skeleton />}
        <img
          className="rounded-xl"
          src={note.image}
          alt={`image for example id ${note.id}`}
          onLoad={handleLoad}
        />
      </div>
      <div className="w-full md:w-2/3 bg-inherit flex flex-col space-y-2 p-2">
        <div className="flex justify-between item-center">
          <p className="text-xs dark:text-white">
            Source:
            <a
              href={`https://youtube.com/watch?v=${note.source_id}&t=${note.start_time}s`}
              target="_blank"
              rel="noreferrer"
              data-testid="source-link"
              className={`
                text-blue-600 hover:text-blue-900 underline ml-1
                dark:text-blue-300 dark:hover:text-blue-400
              `}
            >
              {note.source_id}
            </a>
          </p>
          <ExportProfilesList textOnly={true} />
          <PlayButton />
        </div>
        <div className="flex justify-between item-center mt-2">
          <Furigana
            text={note.sentence}
            withFurigana={note.sentence_furigana}
            withHighlight={note.highlighted_sentence}
            highlightedLanguage={note.highlighted_language}
            withFuriganaAndHighlight={note.sentence_furigana_highlight}
            showFurigana={showFurigana}
          />
        </div>
        <ExampleTranslation />
      </div>
    </div>
  )

  return showCompact ? <CompactView /> : <FullView />
}
