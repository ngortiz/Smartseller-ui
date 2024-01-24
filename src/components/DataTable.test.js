import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import DataTable from './DataTable'

const sampleOrders = [
  {
    id: 1,
    number: 101,
    client: 'John Doe',
    state: 'Pending',
    payment_state: 'Unpaid',
    payment_method: 'Credit Card',
    created_date: '2022-01-01',
    expiration_date: '2022-01-15',
    total: 100.0
  }
]

test('renders DataTable component', () => {
  // Render the component
  const { getByText, getByPlaceholderText } = render(
    <DataTable orders={sampleOrders} />
  )

  // Check that the table and search form are present
  const table = getByText('Numero')
  const searchInput = getByPlaceholderText('Buscar por Cliente o Número')

  expect(table).toBeInTheDocument()
  expect(searchInput).toBeInTheDocument()
})
