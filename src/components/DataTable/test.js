import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import DataTable from '../DataTable'

test('checks the presence of the table and the search form', () => {
  const { getByPlaceholderText, getByRole } = render(<DataTable orders={[]} />)

  // Verify that the search form is present
  const searchInput = getByPlaceholderText('Buscar por Cliente o Número')
  expect(searchInput).toBeInTheDocument()

  // Verify that the table is present
  const table = getByRole('table')
  expect(table).toBeInTheDocument()
})
