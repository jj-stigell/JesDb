import { NoteParams, Note, Profile } from 'src/types'

export function getFileName (url: string): string {
  const regex = /[^/]+\.(mp3|jpg|png)$/
  const match = url.match(regex)

  if (match !== null) {
    return match[0]
  } else {
    return `${(+new Date()).toString(36)}.${url.split('.').pop() ?? 'file'}`
  }
}

export function scrollToTop (): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export function constructParams (
  example: Note,
  profile: Profile
): NoteParams {
  const fields: any = {}
  const audio: any = {}
  const picture: any = {}

  if (profile.expression_field !== 'omit' && profile.expression_field !== null) {
    fields[profile.expression_field] = example.sentence
  }

  if (profile.reading_field !== 'omit' && profile.reading_field !== null) {
    fields[profile.reading_field] = example.sentence_furigana
  }

  if (profile.translation_field !== 'omit' && profile.translation_field !== null) {
    fields[profile.translation_field] = example.translation
  }

  if (profile.audio_field !== 'omit' && example.audio !== null && profile.audio_field !== null) {
    fields[profile.audio_field] = ''
    audio.url = example.audio
    audio.filename = getFileName(example.audio)
    audio.fields = [profile.audio_field]
  }

  if (profile.image_field !== 'omit' && example.image !== null && profile.image_field !== null) {
    fields[profile.image_field] = ''
    picture.url = example.image
    picture.filename = getFileName(example.image)
    picture.fields = [profile.image_field]
  }

  const params: any = {
    note: {
      fields,
      tags: ['JesDb', example.source_id],
      audio: [audio],
      picture: [picture]
    }
  }

  return params
}

export function parseRuby (input: string): string {
  const regex = /(^|\s|<[^>]+>)([^[<\s]+)\[([^\]]+)\]/g
  return input.replace(regex, (match, p1, kanji: string, furigana: string) => {
    const prefix: string = p1.trim().length > 0 ? p1 : ''
    return `${prefix}<ruby>${kanji}<rt>${furigana}</rt></ruby>`
  })
}
