import { Note, Profile } from 'src/types'

export const repoLink = 'https://github.com/jj-stigell/JesDb'

export const feedbackLink = 'https://forms.gle/SVNcSrujPHoy6UuG9'

export const ankiConnectDefaultAddress = 'http://127.0.0.1:8765'

// This one has highlighted_language set to 'ja' therefore it will have sentence_furigana_highlight
export const exampleNoteJa: Note = {
  id: 1863,
  sentence: '昔から 自動車の会社をやっていて',
  len: 16,
  sentence_furigana: '昔[むかし]から 自動車[じどうしゃ]の 会社[かいしゃ]をやっていて',
  translation: 'long time a go I had a car company',
  audio: `https://jynhfjtxpodsmjlnexrx.supabase.co/storage/v1/
  object/public/jesdb-media/gBumdOWWMhY/gBumdOWWMhY_s102_e104.mp3`,
  image: `https://jynhfjtxpodsmjlnexrx.supabase.co/storage/v1/
  object/public/jesdb-media/gBumdOWWMhY/gBumdOWWMhY_s102_e104.jpg`,
  start_time: 102,
  source_id: 'gBumdOWWMhY',
  highlighted_sentence: '昔から <span class="keyword">自動車</span>の会社をやっていて',
  highlighted_language: 'ja',
  sentence_furigana_highlight: '昔[むかし]から <span class="keyword">自動車</span>[じどうしゃ]の 会社[かいしゃ]をやっていて'
}

// This one has highlighted_language set to 'en' therefore sentence_furigana_highlight is empty
export const exampleNoteEn: Note = {
  id: 1135,
  sentence: 'それが怖くなったのでございます',
  len: 15,
  sentence_furigana: 'それが 怖[こわ]くなったのでございます',
  translation: 'I was scared of what was waiting for me.',
  audio: `https://jynhfjtxpodsmjlnexrx.supabase.co/storage/v1/
  object/public/jesdb-media/ylEimFz8KOo/ylEimFz8KOo_s159_e162.mp3`,
  image: `https://jynhfjtxpodsmjlnexrx.supabase.co/storage/v1/
  object/public/jesdb-media/ylEimFz8KOo/ylEimFz8KOo_s159_e162.jpg`,
  start_time: 159,
  source_id: 'ylEimFz8KOo',
  highlighted_sentence: 'I was <span class="keyword">scared</span> of what was waiting for me.',
  highlighted_language: 'en',
  sentence_furigana_highlight: ''
}

export const exampleProfile: Profile = {
  id: 1,
  name: 'Test Profile',
  deck_name: 'Test Deck',
  note_type: 'Basic',
  action_type: 'addNote',
  expression_field: 'expression',
  reading_field: 'reading',
  translation_field: 'translation',
  audio_field: 'audio',
  image_field: 'image',
  created_at: '2021-09-01T00:00:00.000Z',
  user_id: '1af8625c-0771-4c53-9851-42274e8e2385'
}
