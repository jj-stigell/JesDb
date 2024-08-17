import React, { ReactNode } from 'react'
import { Select } from 'flowbite-react'

interface IFormSelect {
  id: string
  disabled: boolean
  options: string[]
  labelText: string | ReactNode
  helperText: string | ReactNode
}

export default function FormSelect ({
  id,
  disabled,
  options,
  labelText,
  helperText
}: IFormSelect): React.JSX.Element {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <Select
        id={id}
        disabled={disabled}
        aria-describedby={`helper-text-${id}`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((fieldName: string) => (
          <option key={`${id}_${fieldName}`} value={fieldName}>
            {fieldName}
          </option>
        ))}
      </Select>
      <p
        id={`helper-text-${id}`}
        className="mt-2 text-sm text-gray-500 dark:text-gray-200"
      >
        {helperText}
      </p>
    </div>
  )
}
