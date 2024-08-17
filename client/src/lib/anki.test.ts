import { Action } from 'src/types'
import { ankiConnectDefaultAddress } from '../utils/constants'
import { executeAction } from './anki'

global.fetch = jest.fn()

describe('executeAction function', () => {
  const defaultVersion = 6

  const testCases: Array<{
    action: Action
    params: any
    mockResponse: any
  }> = [
    {
      action: 'deckNames',
      params: undefined,
      mockResponse: {
        result: ['Default'],
        error: null
      }
    },
    {
      action: 'modelNames',
      params: undefined,
      mockResponse: {
        result: ['Basic'],
        error: null
      }
    },
    {
      action: 'modelNamesAndIds',
      params: undefined,
      mockResponse: {
        result: [{ Basic: 12345 }],
        error: null
      }
    },
    {
      action: 'modelFieldNames',
      params: { modelName: 'Basic' },
      mockResponse: {
        result: ['Front', 'Back'],
        error: null
      }
    },
    {
      action: 'findNotes',
      params: { query: 'deck:Default' },
      mockResponse: {
        result: [1, 2, 3],
        error: null
      }
    },
    {
      action: 'getNoteTags',
      params: { note: 1 },
      mockResponse: {
        result: ['tag1', 'tag2'],
        error: null
      }
    },
    {
      action: 'addNote',
      params: {
        note: {
          deckName: 'Default',
          modelName: 'Basic',
          fields: {
            Front: 'test',
            Back: 'test'
          },
          tags: ['test']
        }
      },
      mockResponse: {
        result: 12345,
        error: null
      }
    },
    {
      action: 'updateNote',
      params: {
        note: {
          id: 1,
          fields: { Front: 'updated' },
          tags: ['updated']
        }
      },
      mockResponse: {
        result: null,
        error: null
      }
    }
  ]

  testCases.forEach(({ action, params, mockResponse }) => {
    test(`executes ${action} action successfully`, async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      })

      const result = await executeAction(action, params, defaultVersion)

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(ankiConnectDefaultAddress, {
        method: 'POST',
        body: JSON.stringify({
          action,
          version: defaultVersion,
          params
        })
      })
    })
  })

  test('handles network errors gracefully', async () => {
    const errorMessage = 'Network Error';
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

    const result = await executeAction('deckNames', undefined)

    expect(result).toEqual({ result: null, error: errorMessage })
  })

  test('handles unknown errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce('Unknown Error')

    const result = await executeAction('deckNames', undefined)

    expect(result).toEqual(
      {
        result: null,
        error: 'Unknown error occurred while communicating with Anki'
      }
    )
  })
})
