import React, { useState } from 'react'

const BankPaymentsPage = () => {
  const [selectedOption, setSelectedOption] = useState('all')
  const payments = [
    {
      id: 1,
      orderNumber: 'ORD-003',
      invoiceNumber: 'INV-003',
      amount: '20.00 US$',
      client: 'Ana Rodríguez',
      paymentMethod: 'Depósito',
      paymentDate: '2024-02-27',
      dueDate: '2024-03-12',
      paid: false,
      cancelled: false,
      creationDate: '2024-02-22',
      orderState: 'Preparando',
      paymentState: 'Pendiente'
    },
    {
      id: 2,
      orderNumber: 'ORD-004',
      invoiceNumber: 'INV-004',
      amount: '25.50 US$',
      client: 'Pedro Martinez',
      paymentMethod: 'Transferencia',
      paymentDate: '2024-02-28',
      dueDate: '2024-03-13',
      paid: false,
      cancelled: false,
      creationDate: '2024-02-23',
      orderState: 'No atendido',
      paymentState: 'Pendiente'
    },
    {
      id: 3,
      orderNumber: 'ORD-005',
      invoiceNumber: 'INV-005',
      amount: '18.75 US$',
      client: 'María López',
      paymentMethod: 'Sucursal',
      paymentDate: '2024-02-28',
      dueDate: '2024-03-13',
      paid: true,
      cancelled: true,
      creationDate: '2024-02-23',
      orderState: 'No atendido',
      paymentState: 'Cancelado'
    }
  ]

  const handleBackButtonClick = () => {
    setSelectedOption('all')
  }

  return (
    <div>
      <header className='payment-header'>
        Pagos por Depósito/Transferencia/Sucursal
      </header>
      <table className='table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Estado del Pedido</th>
            <th>Estado del Pago</th>
            <th>Forma de Pago</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Expiracion</th>
            <th>Total</th>
            <th>Registrar Pago</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.orderNumber}</td>
              <td>{payment.client}</td>
              <td>{payment.orderState}</td>
              <td>{payment.paymentState}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.creationDate}</td>
              <td>{payment.dueDate}</td>
              <td>{payment.amount}</td>
              <td>
                <button onClick={() => handlePaymentRegistration(payment.id)}>
                  Registrar Pago
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='button-back' onClick={handleBackButtonClick}>
        Atrás
      </button>
    </div>
  )
}

export default BankPaymentsPage
