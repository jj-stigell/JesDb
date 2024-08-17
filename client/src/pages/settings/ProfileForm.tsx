import React, { useEffect, useRef, useState } from 'react'
import { Button, Label, Radio, Select, TextInput } from 'flowbite-react'

import CloseButton from 'src/components/CloseButton'
import FormSelect from 'src/components/FormSelect'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { getDeckNames, getModelNamesAndIds } from 'src/features/ankiSlice'
import { RootState } from 'src/app/store'
import { executeAction } from 'src/lib/anki'
import { addProfile } from 'src/features/profileSlice'

interface IProfileForm {
  toggleForm: () => void
}

export default function ProfileForm ({
  toggleForm
}: IProfileForm): React.JSX.Element {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLFormElement | null>(null)
  const { deckNames, modelNames } = useAppSelector((store: RootState) => store.anki)
  const { processing } = useAppSelector((store: RootState) => store.profile)

  const [selectedModel, setSelectedModel] = useState<string>('')
  const [modelFields, setModelFields] = useState<string[]>([])

  useEffect(() => {
    void dispatch(getDeckNames())
    void dispatch(getModelNamesAndIds())
  }, [])

  useEffect(() => {
    if (selectedModel.length !== 0) {
      executeAction('modelFieldNames', { modelName: selectedModel })
        .then((fields) => {
          if (fields.result !== null) {
            setModelFields(['omit', ...fields.result])
          }
        })
        .catch((err) => { console.log(err) })
    }
  }, [selectedModel])

  const handleModelType = (event: any): void => {
    setSelectedModel(event.target.value)
  }

  const closeModal = (): void => {
    ref.current?.reset()
    toggleForm()
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    dispatch(addProfile({
      name: event.target.new_profile_name.value,
      deck_name: event.target.deck_name.value,
      note_type: event.target.note_type.value,
      action_type: event.target.action_type.value,
      expression_field: event.target.sentence.value,
      reading_field: event.target.furigana.value,
      translation_field: event.target.translation.value,
      audio_field: event.target.audio.value,
      image_field: event.target.image.value
    })).then((result) => {
      if (result.payload !== undefined) {
        closeModal()
      }
    }).catch((err) => {
      console.log('err', err)
    })
  }

  return (
    <>
      <CloseButton onClick={toggleForm}/>
      <form
          id="create-profile-form"
          className="overflow-y-auto p-4"
          ref={(el) => { ref.current = el }}
          onSubmit={handleSubmit}
          aria-labelledby="create-profile-form-heading"
        >
        <div className="mt-4">
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="new_profile_name" value="Profile name" />
            </div>
            <TextInput
              disabled={processing}
              id="new_profile_name"
              type="text"
              placeholder="e.g., Japanese recall deck"
              required
              aria-describedby="new-profile-name-helper"
            />
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="deck_name" value="Select deck where new notes are placed" />
            </div>
            <Select
              id="deck_name"
              disabled={processing}
              required
              aria-describedby="deck-name-helper"
            >
              {deckNames.map((deckName: string) => (
                <option key={deckName} value={deckName}>{deckName}</option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="note_type" value="Select note type used" />
            </div>
            <Select
              id="note_type"
              disabled={processing}
              onChange={handleModelType}
              required
              aria-describedby="note-type-helper"
            >
              {Object.entries(modelNames).map(([key, _value]) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </Select>
          </div>
        </div>
        {modelFields.length !== 0
          ? (
              <>
                <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"/>
                <div>
                  <h1
                    className="block mb-3 text-lg font-medium text-gray-900 dark:text-white"
                    id="map-fields-heading"
                  >
                    Map export fields
                  </h1>
                </div>
                <div className="grid grid-cols-2 grid-rows-3 gap-2">
                  <FormSelect
                    id="sentence"
                    disabled={processing}
                    options={modelFields}
                    labelText={<>Place <b className="text-red-600">example sentence</b> to field</>}
                    helperText="Whole sentence, e.g., &quot;これは鉛筆です。&quot;"
                    aria-describedby="sentence-field-helper"
                  />
                  <FormSelect
                    id="furigana"
                    disabled={processing}
                    options={modelFields}
                    labelText={
                      <>Place <b className="text-red-600">sentence with furigana</b> to field</>
                    }
                    helperText="Sentence with furigana, e.g., &quot;これは 鉛筆[えんぴつ]です。&quot;"
                    aria-describedby="furigana-field-helper"
                  />
                  <FormSelect
                    id="translation"
                    disabled={processing}
                    options={modelFields}
                    labelText={<>Place <b className="text-red-600">translation</b> to field</>}
                    helperText="Translation for the sentence, e.g., &quot;This is a pencil&quot;"
                    aria-describedby="translation-field-helper"
                  />
                  <FormSelect
                    id="audio"
                    disabled={processing}
                    options={modelFields}
                    labelText={<>Place <b className="text-red-600">audio</b> to field</>}
                    helperText="mp3 audio file for the sentence"
                    aria-describedby="audio-field-helper"
                  />
                  <FormSelect
                    id="image"
                    disabled={processing}
                    options={modelFields}
                    labelText={<>Place <b className="text-red-600">image</b> to field</>}
                    helperText="screenshot of the source material"
                    aria-describedby="image-field-helper"
                  />
                </div>
                <div>
                  <h1
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    id="note-action-heading"
                  >
                    Add / update note action:
                  </h1>
                  <p
                    id="helper-text-action-type"
                    className="mb-2 text-sm text-gray-500 dark:text-gray-200"
                  >
                    Create a new note from example or update the latest created note.
                  </p>
                  <fieldset aria-describedby="helper-text-action-type">
                    <div className="grid grid-cols-2 grid-rows-1 gap-2">
                      <div className="flex items-center">
                        <Radio id="option-1" name="action_type" value="addNote" defaultChecked />
                        <Label htmlFor="option-1" className="ml-2">Create a new note</Label>
                      </div>
                      <div className="flex items-center">
                        <Radio id="option-2" name="action_type" value="updateNote" />
                        <Label htmlFor="option-2" className="ml-2">Update latest note</Label>
                      </div>
                    </div>
                  </fieldset>
                  <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"/>
                </div>
              </>
            )
          : (
              <p className="dark:text-white" aria-live="polite">
                Select note type to load the fields
              </p>
            )}
        <div className="flex flex-row mt-4 gap-4">
          <Button
            type="submit"
            color="blue"
            disabled={modelFields.length === 0 || processing}
            aria-label="Save profile"
          >
            Save profile
          </Button>
          <Button
            type="button"
            color="warning"
            disabled={processing}
            onClick={closeModal}
            aria-label="Close without saving"
          >
            Close without saving
          </Button>
        </div>
      </form>
    </>
  )
}
