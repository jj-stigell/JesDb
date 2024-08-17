import {
  Action,
  AddNoteParams,
  Body,
  ErrorResult,
  ExecuteActionParams,
  ExecuteActionReturnType,
  ExportResult,
  Note,
  Profile,
  UpdateNoteParams
} from 'src/types'
import { ankiConnectDefaultAddress } from '../utils/constants'
import { constructParams } from '../utils/helpers'

export async function executeAction<T extends Action> (
  action: T,
  params: ExecuteActionParams<T>,
  version: number = 6,
  address: string = ankiConnectDefaultAddress
): Promise<ExecuteActionReturnType<T> | ErrorResult> {
  const body: Body<T> = {
    action,
    version
  }

  if (params !== undefined) {
    body.params = params
  }

  try {
    const response = await fetch(address, {
      method: 'POST',
      body: JSON.stringify(body)
    })

    return await response.json()
  } catch (err: unknown) {
    return {
      result: null,
      error: err instanceof Error
        ? err.message
        : 'Unknown error occurred while communicating with Anki'
    }
  }
}

export async function exportNote (
  {
    note,
    profile,
    address
  }: {
    note: Note
    profile: Profile
    address: string
  }
): Promise<ExportResult> {
  const actionType = profile.action_type

  if (actionType === 'updateNote') {
    const { result, error } = await executeAction('findNotes', { query: 'added:2' }, 6, address)

    if (error !== null) {
      return {
        result: null,
        error
      }
    }

    if (result !== null) {
      const params = constructParams(note, profile) as UpdateNoteParams
      // params = params as UpdateNoteParams
      const sorted: number[] = result.sort((a, b) => a - b)
      if (sorted.length === 0) {
        return {
          result: null,
          error: 'No recently created notes found! No notes updated!'
        }
      }

      const lastNoteId = sorted[sorted.length - 1]
      params.note.id = lastNoteId

      const tags = await executeAction('getNoteTags', { note: lastNoteId }, 6, address)

      if (tags.result !== null) {
        params.note.tags = tags.result.concat(params.note.tags)
      }

      const update = await executeAction(actionType, params, 6, address)

      if (update.error !== null) {
        return {
          result: null,
          error: `Error occurred, message ${update.error}!`
        }
      } else {
        return {
          result: `Note id ${lastNoteId} updated succesfully!`,
          error: null
        }
      }
    }

    return {
      result: null,
      error: 'No notes found to update.'
    }
  } else {
    const params = constructParams(note, profile) as AddNoteParams

    params.note.deckName = profile.deck_name
    params.note.modelName = profile.note_type

    params.note.options = {
      allowDuplicate: false,
      duplicateScope: 'deck',
      duplicateScopeOptions: {
        deckName: profile.deck_name,
        checkChildren: false,
        checkAllModels: false
      }
    }

    const { result, error } = await executeAction(actionType, params, 6, address)

    if (error !== null) {
      return {
        result: null,
        error: `Error occurred, message ${error}!`
      }
    }

    return {
      result: `New note with id ${result} created succesfully!`,
      error: null
    }
  }
}
