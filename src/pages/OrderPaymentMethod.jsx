import './OrderPaymentMethod.css'
import React, { useState } from 'react'

const OrderPaymentMethod = () => {
  const [showTransactions, setShowTransactions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const toggleTransactions = () => {
    setShowTransactions(!showTransactions)
  }

  const handleOptionClick = option => {
    setSelectedOption(option)
  }

  const handleSearch = () => {}

  const transactionsContent = (
    <div className='transactions-dropdown'>
      <button onClick={() => handleOptionClick('Transacciones Rechazadas')}>
        Transacciones Rechazadas
      </button>
      <button onClick={() => handleOptionClick('Transacciones Aceptadas')}>
        Transacciones Aceptadas
      </button>
    </div>
  )

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
      cancelled: true,
      creationDate: '2024-02-21'
    }
  ]

  return (
    <div>
      <header className='payment-header'>
        Transacciones hechas por tarjetas de crédito
      </header>
      <div className='arrow-box' onClick={toggleTransactions}>
        {selectedOption && <span>{selectedOption}</span>}
        {showTransactions && transactionsContent}▼
      </div>
      {selectedOption && (
        <div className='search-container'>
          <input
            type='text'
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      )}

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
