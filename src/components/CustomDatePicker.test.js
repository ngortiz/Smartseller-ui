import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CustomDatePicker from './CustomDatePicker'

test('renders content', () => {
  const selectedDate = new Date()
  const { getByText } = render(
    <CustomDatePicker selectedDate={selectedDate} handleChange={() => {}} />
  )

  const componentText = getByText('Tu texto del componente')
  expect(componentText).toBeInTheDocument()

  console.log(
    'Componente renderizado correctamente:',
    componentText.textContent
  )
})
