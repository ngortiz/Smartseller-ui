import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import OrderPayment from '../OrderPayment'

describe('OrderPayment component', () => {
  it('renders payment state correctly', () => {
    const paymentState = 'Paid'

    const { getByText } = render(
      <OrderPayment
        paymentState={paymentState}
        total='100'
        totalPaid='80'
        totalDebt='20'
      />
    )
    //renders payment state correctly
    expect(getByText('Estado de Pago:')).toBeInTheDocument()
    expect(getByText(paymentState)).toBeInTheDocument()
  })
})
