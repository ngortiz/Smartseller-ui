import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import OrderClientInformation from '../OrderClientInformation'

test('Check if the text "Customer" is present in the rendered output', () => {
  const { getByText } = render(
    <OrderClientInformation
      client='Juan Pérez'
      address='Calle 123'
      phone='123456789'
      ruc='1234567890'
    />
  )

  // Check if the text "Customer" is present in the rendered output
  const clienteTexto = getByText('Cliente')
  expect(clienteTexto).toBeInTheDocument()
})
