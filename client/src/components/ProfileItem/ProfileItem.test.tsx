import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import ProfileItem from './ProfileItem'
import { Profile } from 'src/types'
import { exampleProfile } from '../../utils/constants'

describe('ProfileItem Component', () => {
  const mockDeleteProfile = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders profile information correctly', () => {
    const { asFragment } =
      render(<ProfileItem profile={exampleProfile} deleteProfile={mockDeleteProfile} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText(exampleProfile.name)).toBeInTheDocument()
    expect(screen.getByText(`Target deck: ${exampleProfile.deck_name}`)).toBeInTheDocument()
    expect(screen.getByText(`Note type: ${exampleProfile.note_type}`)).toBeInTheDocument()
    expect(screen.getByText('Action type: Add new note')).toBeInTheDocument()
  })

  it('calls deleteProfile when the delete button is clicked', () => {
    render(<ProfileItem profile={exampleProfile} deleteProfile={mockDeleteProfile} />)
    fireEvent.click(screen.getByText('Delete'))

    expect(mockDeleteProfile).toHaveBeenCalledTimes(1)
  })

  it('renders "Update latest note" when actionType is updateNote', () => {
    const updatedProfile: Profile = {
      ...exampleProfile,
      action_type: 'updateNote'
    }
    const { asFragment } =
      render(<ProfileItem profile={updatedProfile} deleteProfile={mockDeleteProfile} />)

    expect(asFragment()).toMatchSnapshot()
    expect(screen.getByText('Action type: Update latest note')).toBeInTheDocument()
  })
})
