import { constructParams, getFileName, parseRuby, scrollToTop } from './helpers'
import { exampleNoteJa, exampleProfile } from './constants'
import { Profile } from 'src/types'

describe('getFileName', () => {
  test('should extract .mp3 filename from URL', () => {
    const url = 'http://example.com/music/song.mp3'
    expect(getFileName(url)).toBe('song.mp3')
  })

  test('should extract .jpg filename from URL', () => {
    const url = 'http://example.com/images/photo.jpg'
    expect(getFileName(url)).toBe('photo.jpg')
  })

  test('should extract .png filename from URL', () => {
    const url = 'http://example.com/images/photo.png'
    expect(getFileName(url)).toBe('photo.png')
  })

  test('should generate a timestamp-based filename for URLs without .mp3, .jpg, or .png', () => {
    const url = 'http://example.com/video.mp4'
    const result = getFileName(url)
    expect(result).toMatch(/\w+\.(file|mp4)$/)
  })
})

describe('scrollToTop', () => {
  test('should scroll to the top of the page smoothly', () => {
    const mockScrollTo = jest.fn()
    global.window.scrollTo = mockScrollTo

    scrollToTop()
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })
})

describe('constructParams', () => {
  test('should construct params correctly when all fields are included', () => {
    const exampleNote = exampleNoteJa
    const params = constructParams(exampleNote, exampleProfile)

    expect(params).toEqual({
      note: {
        fields: {
          expression: exampleNote.sentence,
          reading: exampleNote.sentence_furigana,
          translation: exampleNote.translation,
          audio: '',
          image: ''
        },
        tags: ['JesDb', exampleNote.source_id],
        audio: [
          {
            url: exampleNote.audio,
            filename: 'gBumdOWWMhY_s102_e104.mp3',
            fields: ['audio']
          }
        ],
        picture: [
          {
            url: exampleNote.image,
            filename: 'gBumdOWWMhY_s102_e104.jpg',
            fields: ['image']
          }
        ]
      }
    })
  })

  test('should construct params correctly when some fields are omitted', () => {
    const profile: Profile = {
      ...exampleProfile,
      expression_field: 'omit',
      translation_field: 'omit',
      image_field: 'omit'
    }

    const exampleNote = exampleNoteJa
    const params = constructParams(exampleNote, profile)

    expect(params).toEqual({
      note: {
        fields: {
          reading: exampleNote.sentence_furigana,
          audio: ''
        },
        tags: ['JesDb', exampleNote.source_id],
        audio: [
          {
            url: exampleNote.audio,
            filename: 'gBumdOWWMhY_s102_e104.mp3',
            fields: ['audio']
          }
        ],
        picture: [{}]
      }
    })
  })

  test('should construct params correctly when all fields are omitted', () => {
    const profile: Profile = {
      ...exampleProfile,
      expression_field: 'omit',
      reading_field: 'omit',
      translation_field: 'omit',
      audio_field: 'omit',
      image_field: 'omit'
    }

    const exampleNote = exampleNoteJa
    const params = constructParams(exampleNote, profile)

    expect(params).toEqual({
      note: {
        fields: {},
        tags: ['JesDb', exampleNote.source_id],
        audio: [{}],
        picture: [{}]
      }
    })
  })
})

describe('parseRuby', () => {
  test('should parse single kanji with furigana', () => {
    const input = '漢字[かんじ]'
    const expectedOutput = '<ruby>漢字<rt>かんじ</rt></ruby>'
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should parse multiple different kanji words in sentence when starting with kanji', () => {
    const input = '昔[むかし]から 自動車[じどうしゃ]の 会社[かいしゃ]をやっていて'
    // eslint-disable-next-line max-len
    const expectedOutput = '<ruby>昔<rt>むかし</rt></ruby>から<ruby>自動車<rt>じどうしゃ</rt></ruby>の<ruby>会社<rt>かいしゃ</rt></ruby>をやっていて'
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should parse multiple different kanji words in sentence when ending with kanji', () => {
    const input = 'その 時[とき]の 答[こた]えは。。。 猫[ねこ]'
    // eslint-disable-next-line max-len
    const expectedOutput = 'その<ruby>時<rt>とき</rt></ruby>の<ruby>答<rt>こた</rt></ruby>えは。。。<ruby>猫<rt>ねこ</rt></ruby>'
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should parse multiple kanji words in sentence when starting with non-kanji char', () => {
    const input = 'わたしは昔[むかし]から 自動車[じどうしゃ]の 会社[かいしゃ]をやっていて'
    // eslint-disable-next-line max-len
    const expectedOutput = '<ruby>わたしは昔<rt>むかし</rt></ruby>から<ruby>自動車<rt>じどうしゃ</rt></ruby>の<ruby>会社<rt>かいしゃ</rt></ruby>をやっていて'
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should handle leading spaces before kanji with furigana', () => {
    const input = ' 文字列[もじれつ]'
    const expectedOutput = '<ruby>文字列<rt>もじれつ</rt></ruby>'
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should handle trailing spaces after kanji with furigana', () => {
    const input = '漢字[かんじ] '
    const expectedOutput = '<ruby>漢字<rt>かんじ</rt></ruby> '
    expect(parseRuby(input)).toBe(expectedOutput)
  })

  test('should handle empty input string', () => {
    const input = ''
    expect(parseRuby(input)).toBe(input)
  })

  test('should handle input string without any kanji and furigana pattern', () => {
    const input = 'ここはかんじがない'
    expect(parseRuby(input)).toBe(input)
  })
})
