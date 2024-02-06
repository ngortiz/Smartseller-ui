import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import OrderDetails from '../OrderDetails'

test('verifica si "Producto 1" está presente en la salida renderizada', () => {
  const orderItems = [
    {
      quantity: 2,
      internalCode: 'ABC123',
      productName: 'Producto 1', // This is the product we will verify
      unitPrice: 10,
      offerPrice: 8,
      exempt: 0,
      iva10: 1,
      iva5: 0.5
    }
  ]

  const shippingCost = 5
  const subtotal = 30
  const discountCoupon = 'DESCUENTO20'
  const totalAmount = 30
  const liquidationIVA5 = 0.5
  const liquidationIVA10 = 2.5
  const totalIVA = 3

  const { getByText } = render(
    <OrderDetails
      orderItems={orderItems}
      shippingCost={shippingCost}
      subtotal={subtotal}
      discountCoupon={discountCoupon}
      totalAmount={totalAmount}
      liquidationIVA5={liquidationIVA5}
      liquidationIVA10={liquidationIVA10}
      totalIVA={totalIVA}
    />
  )

  // We check if the text "Product 1" is present
  const product1Element = getByText('Producto 1')
  expect(product1Element).toBeInTheDocument()
})
