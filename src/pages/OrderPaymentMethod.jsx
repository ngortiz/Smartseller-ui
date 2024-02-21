import React from 'react'
import './OrderPaymentMethod.css'

const OrderPaymentMethod = () => {
  const payments = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      invoiceNumber: 'INV-001',
      amount: '10.00 US$',
      client: 'Juan Valdez',
      paymentMethod: 'TC',
      paymentDate: '2024-02-25',
      dueDate: '2024-03-10',
      paid: true,
      cancelled: false,
      creationDate: '2024-02-20'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      invoiceNumber: 'INV-002',
      amount: '15.20 US$',
      client: 'Valeria Ortiz',
      paymentMethod: 'TC',
      paymentDate: '2024-02-26',
      dueDate: '2024-03-11',
      paid: false,
      cancelled: false,
      creationDate: '2024-02-21'
    }
  ]

  return (
    <div>
      <header className='order-control-header'>
        Transacciones hechas por tarjetas de crédito
      </header>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nro Pedido</th>
            <th>Nro Comprobante</th>
            <th>Importe</th>
            <th>Cliente</th>
            <th>Método Pago</th>
            <th>Fecha Pago</th>
            <th>Vencimiento</th>
            <th>Pagado</th>
            <th>Cancelado</th>
            <th>Fecha Creación</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.orderNumber}</td>
              <td>{payment.invoiceNumber}</td>
              <td>{payment.amount}</td>
              <td>{payment.client}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.dueDate}</td>
              <td>{payment.paid ? 'Sí' : 'No'}</td>
              <td>{payment.cancelled ? 'Sí' : 'No'}</td>
              <td>{payment.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderPaymentMethod
