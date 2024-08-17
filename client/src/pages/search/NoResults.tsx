import React, { useRef } from 'react'

interface INoResults {
  keyword: string
}

export default function NoResults ({
  keyword
}: INoResults): React.JSX.Element {
  const keywordRef = useRef(keyword)

  const dictionaryLinks = [
    {
      name: 'Yahoo!辞書',
      href: `https://dic.yahoo.co.jp/search/?p=${keywordRef.current}&fr=dic&stype=full&ei=UTF-8`
    },
    {
      name: 'goo辞書',
      href: `https://dictionary.goo.ne.jp/srch/all/${keywordRef.current}/m0u/`
    },
    {
      name: 'Weblio',
      href: `https://ejje.weblio.jp/content/${keywordRef.current}`
    },
    {
      name: 'Jisho',
      href: `https://jisho.org/search/${keywordRef.current}%23sentences`
    },
    {
      name: 'Tangorin',
      href: `https://tangorin.com/sentences?search=${keywordRef.current}`
    },
    {
      name: 'Massif',
      href: `https://massif.la/ja/search?q=${keywordRef.current}`
    }
  ]

  return (
    <div className="max-w-xl mx-auto mt-4 p-6 dark:text-white">
      <div className='flex flex-wrap text-xl font-bold mb-4 gap-2'>
        <h2 id="no-results-heading">
          No examples found for <span aria-label={keywordRef.current}>{keywordRef.current}</span>...
        </h2>
        <h2 aria-hidden="true">(⋟﹏⋞) ( ༎ຶ⌑༎ຶ ) (˃̣̣̥⌓˂̣̣̥ )</h2>
      </div>
      <p id="alternative-resources" className="mb-4">
        You can also try the following sites for example sentences for this word:
      </p>
      <ul className="list-disc pl-8 mt-1" aria-labelledby="alternative-resources">
        {dictionaryLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="link"
              aria-label={`Search for ${keywordRef.current} on ${link.name}`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
