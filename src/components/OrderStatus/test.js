import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import OrderStatus from '.'

test('renders OrderStatus component with amount and background', () => {
  const testData = {
    color: 'blue',
    amount: 100,
    status: 'Processing'
  }

  const { getByText, getByTestId } = render(
    <OrderStatus
      color={testData.color}
      amount={testData.amount}
      status={testData.status}
    />
  )

  // Check the presence of the amount text and the Card component background
  const amountElement = getByText(testData.amount.toString())
  const cardContainer = getByTestId('order-status-card')

  // Verify that the elements are present
  expect(amountElement).toBeInTheDocument()
  expect(cardContainer).toHaveStyle(`background: ${testData.color}`)
})
