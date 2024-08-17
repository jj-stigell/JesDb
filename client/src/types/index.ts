import { Database } from './database.types'

/**
 * No params for deckNames, modelNamesAndIds, modelNames
 */
export type Action =
  'deckNames' |
  'updateNote' |
  'modelNamesAndIds' |
  'modelFieldNames' |
  'modelNames' |
  'findNotes' |
  'addNote' |
  'getNoteTags'

export interface UpdateNoteParams {
  note: {
    id: number
    fields: Record<string, string>
    tags: string[]
  }
}

export interface AddNoteParams {
  note: {
    deckName: string
    modelName: string
    fields: Record<string, string>
    options?: {
      allowDuplicate?: boolean
      duplicateScope?: string
      duplicateScopeOptions?: {
        deckName?: string
        checkChildren?: boolean
        checkAllModels?: boolean
      }
    }
    tags?: string[]
    audio?: Array<{
      url: string
      filename: string
      skipHash: string
      fields: string[]
    }>
    video?: Array<{
      url: string
      filename: string
      skipHash: string
      fields: string[]
    }>
    picture?: Array<{
      url: string
      filename: string
      skipHash: string
      fields: string[]
    }>
  }
}

export type NoteParams = UpdateNoteParams | AddNoteParams

interface ModelFieldNamesParams {
  modelName: string
}

interface FindNotesParams {
  query: string
}

interface GetNoteTagsParams {
  note: number
}

interface ActionParamsMap {
  deckNames: undefined
  updateNote: UpdateNoteParams
  modelNamesAndIds: undefined
  modelFieldNames: ModelFieldNamesParams
  modelNames: undefined
  findNotes: FindNotesParams
  addNote: AddNoteParams
  getNoteTags: GetNoteTagsParams
}

export interface ErrorResult {
  result: null
  error: string
}

interface ResultStringArray {
  result: string[]
  error: null
}

export interface FindNotes {
  result: number[]
  error: null
}

export interface AddNote {
  result: number
  error: null
}

export interface UpdateNoteResult {
  result: null
  error: null
}

interface ModelNamesAndIdsResult {
  result: Array<Record<string, number>>
  error: null
}

interface ActionResultMap {
  deckNames: ResultStringArray
  updateNote: UpdateNoteResult
  modelNamesAndIds: ModelNamesAndIdsResult
  modelFieldNames: ResultStringArray
  modelNames: ResultStringArray
  findNotes: FindNotes
  addNote: AddNote
  getNoteTags: ResultStringArray
}

export type ExecuteActionParams<T extends Action> =
  T extends keyof ActionParamsMap ? ActionParamsMap[T] : never

export type ExecuteActionReturnType<T extends Action> = ActionResultMap[T]

export interface Body<T extends Action> {
  action: Action
  version: number
  params?: ExecuteActionParams<T>
}

// Represents the note type that search function returns
export type Note = Database['public']['Functions']['search_sentences']['Returns'][0]

export type Profile = Database['public']['Tables']['profiles']['Row']

export type ActionType = Database['public']['Enums']['action_type']

export interface NewProfile extends Omit<Profile, 'id' | 'user_id' | 'created_at'> {}

export interface ExportResult {
  result: string | null
  error: string | null
}

export interface Filters {
  sort: 'relevance' | 'shortness' | 'longness'
  onlyTranslated: boolean
}
