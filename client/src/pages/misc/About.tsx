import React, { useEffect } from 'react'

import { feedbackLink, repoLink } from 'src/utils/constants'
import { scrollToTop } from 'src/utils/helpers'

export default function About (): React.JSX.Element {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <div
      className="mx-auto overflow-y-auto rounded-md w-full items-center px-8"
      role="main"
      aria-labelledby="about-heading"
    >
      <div className="relative mx-auto max-w-[50rem] my-4">
        <h1 id="about-heading" className="title text-4xl">About JesDb</h1>
      </div>
      <div className="mx-auto max-w-[50rem] text-gray-500 dark:text-gray-400">
        <p className="mb-4">
          JesDb is a Japanese example sentence database. It lets you find example
          sentences quickly and easily. Our goal is to provide a comprehensive
          resource that helps you understand any Japanese text by providing
          contextual examples from a diverse range of sources.
        </p>
        <p className="mb-4">
          Our database includes over 100,000 sentences collected from YouTube
          videos on topics like vlogging, cooking, technology, TEDx Talks, history,
          politics, and pop culture. This variety ensures that you can find sentences
          relevant to many different contexts and interests.
        </p>
        <p className="mb-4">
          JesDb aims to be more than just a dictionary. By allowing you to search
          for specific words, phrases, and kanji, and providing rich example sentences,
          we hope to be an indispensable tool for anyone learning Japanese. Whether
          you’re a beginner or an advanced learner, JesDb has something to offer.
        </p>
        <p className="mb-4">
          JesDb is a non-profit open source project and is free to use. Our mission is to
          provide a valuable resource to the language learning community, and we
          are committed to continuously improving and expanding the database.
        </p>
        <h3 id="anki-heading" className="title">Anki</h3>
        <p className="mb-4">
          JesDb has integration with a popular flashcard application
          <a
            href="https://apps.ankiweb.net"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Anki flashcard application, opens in a new tab"
          >
            Anki.
          </a>
          By using the
          <a
            href="https://ankiweb.net/shared/info/2055492159"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="AnkiConnect add-on, opens in a new tab"
          >
            AnkiConnect
          </a> addon, you can quickly export sentences with example audio and translations
          to your Anki decks, enhancing your learning experience.
        </p>
        <h2></h2>
        <h3 className="title" id="data-sources-heading">Data sources</h3>
        <h3 className="title text-base mt-4" id="vocabulary-synonyms-heading">
          Vocabulary synonyms
        </h3>
        <p className="mb-4">
          Word synonyms are derived from the
           <a
            href="https://github.com/WorksApplications/SudachiDict"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="SudachiDict project, opens in a new tab"
          >
            SudachiDict
          </a>
          project which is a lexicon for Japanese tokenizer
          <a
            href="https://github.com/WorksApplications/Sudachi"
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Sudachi Japanese tokenizer, opens in a new tab"
          >
            Sudachi.
          </a>
        </p>
        <h3 className="title text-base" id="example-sources-heading">Example sources</h3>
        <p className="mb-4">
          JesDb uses YouTube videos as the primary source of example sentences.
          We believe that video content provides a more engaging and authentic
          learning experience compared to traditional text-based resources.
        </p>
        <p className="mb-4">
          You can request new videos to be added to JesDb by filling out the
          <a
            href={feedbackLink}
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Feedback form, opens in a new tab"
          >
            feedback form.
          </a>
        </p>
        <p className="mb-4">
          If you are a owner of a YouTube channel whose content is being used on JesDb and
          would like to remove your videos, please contact us via the feedback form mentioned above.
        </p>
        <h3 className="title" id="open-source-heading">Open Source Contributions</h3>
        <p className="mb-4">
          JesDb is an open-source project. We believe in the power of community and welcome
          contributions from developers, linguists, and language enthusiasts alike. You can
          find our source code on
          <a
            href={repoLink}
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="JesDb source code on GitHub, opens in a new tab"
          >
            GitHub.
          </a>
        </p>
        <h3 className="title" id="get-in-touch-heading">Get in Touch</h3>
        <p className="mb-4">
          We are always looking for feedback and suggestions. If you have any questions,
          feel free to contact us via
          <a
            href={feedbackLink}
            target="_blank"
            className="link"
            rel="noreferrer"
            aria-label="Feedback form, opens in a new tab"
          >
            feedback form.
          </a>
        </p>
        <button
          className="link"
          onClick={scrollToTop}
          aria-label="Back to top of page"
        >
          Back to top
        </button>
      </div>
    </div>
  )
}
