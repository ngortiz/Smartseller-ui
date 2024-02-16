import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import OrderCard from '../OrderCard'

test('renders client name correctly', () => {
  const order = {
    id: 1,
    number: 'ORD-001',
    client: 'John Doe',
    endCreation: '2024-02-16',
    paymentMethod: 'Credit Card',
    total: 100
  }

  const getClassForState = jest.fn()
  const column = { filterState: 'active' }

  const { getByText } = render(
    <MemoryRouter>
      {' '}
      {/* Utiliza MemoryRouter */}
      <OrderCard
        order={order}
        getClassForState={getClassForState}
        column={column}
      />
    </MemoryRouter>
  )

  expect(getByText(order.client)).toBeInTheDocument()
})
