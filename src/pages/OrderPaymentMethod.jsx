import './OrderPaymentMethod.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const allPayments = [
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
    cancelled: true,
    creationDate: '2024-02-21'
  }
]

const OrderPaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [payments, setPayments] = useState(allPayments)

  const filterPayments = (payments, selectedOption) => {
    if (selectedOption === 'all') {
      return allPayments
    }
    const isPaid = selectedOption === 'Transacciones Aceptadas'
    const filteredPayments = payments.filter(payment => payment.paid === isPaid)
    return filteredPayments
  }

  const handleSelectorChange = e => {
    const selectedValue = e.target.value
    setSelectedOption(selectedValue)
    const filteredPayments = filterPayments(allPayments, selectedValue)
    setPayments(filteredPayments)
  }

  const handleBackButtonClick = () => {
    setSelectedOption('all')
    setPayments(allPayments)
  }

  return (
    <div>
      <header className='payment-header'>
        Transacciones hechas por tarjetas de crédito
      </header>

      <div className='search-container'>
        <select
          className='form-select-lg'
          aria-label='large-select-example'
          value={selectedOption}
          onChange={handleSelectorChange}
        >
          <option value='all' className='transacciones-body'>
            Todas las transacciones
          </option>
          <option
            value='Transacciones Rechazadas'
            className='transacciones-body'
          >
            Transacciones Rechazadas
          </option>
          <option
            value='Transacciones Aceptadas'
            className='transacciones-body'
          >
            Transacciones Aceptadas
          </option>
        </select>
      </div>

      <table className='table'>
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
              <td>
                <Link to={`/orderInformation/${payment.orderNumber}`}>
                  {payment.orderNumber}
                </Link>
              </td>
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
      <button className='button-back' onClick={handleBackButtonClick}>
        Atrás
      </button>
    </div>
  )
}

export default OrderPaymentMethod
