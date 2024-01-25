import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CustomDatePicker from '../CustomDatePicker'

describe('CustomDatePicker', () => {
  test('renders CustomDatePicker with date and icon', () => {
    const selectedDate = new Date('2024-01-23 23:00')
    const handleChange = jest.fn()

    render(
      <CustomDatePicker
        selectedDate={selectedDate}
        handleChange={handleChange}
      />
    )

    // Check if the DatePicker is rendered with the correct date
    const datePickerInput = screen.getByDisplayValue('23/01/2024')
    expect(datePickerInput).toBeInTheDocument()
  })
})
