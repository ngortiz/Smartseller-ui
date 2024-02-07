import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { OrderData } from '../OrderData'

test('checks if the text "Order" is present in the rendered output', () => {
  // Render the component
  const { getByText } = render(
    <OrderData
      number='123456'
      voucher='123ABC'
      state='Pendiente'
      date='2024-02-06'
    />
  )

  // Check if the text "Order" is present
  const orderText = getByText('Pedido')
  expect(orderText).toBeInTheDocument()
})
