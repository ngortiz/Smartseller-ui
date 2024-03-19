import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BankPaymentsPage = () => {
  const [selectedOption, setSelectedOption] = useState('all')
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const { t } = useTranslation()

  const listPayments = [
    {
      id: 3,
      orderNumber: '103',
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
      id: 4,
      orderNumber: '104',
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
      id: 5,
      orderNumber: '105',
      invoiceNumber: 'INV-005',
      amount: '18.75 US$',
      client: 'María López',
      paymentMethod: 'Sucursal',
      paymentDate: '2024-02-28',
      dueDate: '2024-03-13',
      paid: false,
      cancelled: false,
      creationDate: '2024-02-23',
      orderState: 'No atendido',
      paymentState: 'Cancelado'
    },
    {
      id: 6,
      orderNumber: '106',
      invoiceNumber: 'INV-006',
      amount: '18.75 US$',
      client: 'María López',
      paymentMethod: 'Sucursal',
      paymentDate: '2024-02-28',
      dueDate: '2024-03-13',
      paid: true,
      cancelled: true,
      creationDate: '2024-02-23',
      orderState: 'Atendido',
      paymentState: 'Completado'
    },
    {
      id: 7,
      orderNumber: '107',
      invoiceNumber: 'INV-007',
      amount: '18.75 US$',
      client: 'María Vera',
      paymentMethod: 'Sucursal',
      paymentDate: '2024-02-28',
      dueDate: '2024-03-13',
      paid: true,
      cancelled: true,
      creationDate: '2024-02-23',
      orderState: 'No atendido',
      paymentState: 'No completado'
    }
  ]

  const handleSelectorChange = e => {
    const selectedValue = e.target.value
    setSelectedOption(selectedValue)

    let filteredPayments = [...listPayments]

    if (selectedValue !== 'all') {
      filteredPayments = filteredPayments.filter(
        payment =>
          payment.paymentState.toLowerCase() === selectedValue.toLowerCase()
      )
    }
    setPayments(filteredPayments)
  }

  const handleOrderNumberChange = e => {
    const search = e.target.value
    let filteredPayments = [...listPayments]
    if (search.trim() !== '') {
      const searchTermLowerCase = search.trim().toLowerCase()
      filteredPayments = filteredPayments.filter(
        payment =>
          payment.orderNumber.includes(searchTermLowerCase) ||
          payment.invoiceNumber.toLowerCase().includes(searchTermLowerCase)
      )
    }
    setSearchTerm(search)
    setPayments(filteredPayments)
  }

  const handleBackButtonClick = () => {
    setSelectedOption('all')
    setPayments([])
  }

  const handlePaymentClick = payment => {
    setSelectedPayment(payment)
    setShowPaymentModal(true) // Mostrar la ventana emergente
  }

  const handleCloseModal = () => {
    setShowPaymentModal(false) // Ocultar la ventana emergente
  }

  return (
    <div>
      <header className='bank-header'>{t('bankPaymentsPage.header')}</header>

      <div className='bank-flex-container'>
        <div className='bank-container'>
          <span className='heard-state'>Estado:</span>
          <select
            className='bank-select'
            aria-label='large-select-example'
            value={selectedOption}
            onChange={handleSelectorChange}
          >
            <option value='all'>Seleccionar</option>
            <option value='Pendiente'>Pendiente</option>
            <option value='No completado'>No completado</option>
            <option value='Completado'>Completado</option>
            <option value='Cancelado'>Cancelado</option>
          </select>
        </div>

        <div className='bank-container'>
          <span className='heard-number'>Número de Orden:</span>
          <input
            type='text'
            className='bank-input'
            placeholder='Buscar por número de pedido'
            value={searchTerm}
            onChange={handleOrderNumberChange}
          />
        </div>
      </div>

      {showPaymentModal && (
        <div className='payment-modal'>
          <div className='payment-modal-content'>
            <p>
              {t('bankPaymentsPage.client')}: {selectedPayment.client}
            </p>
            <p>
              {t('bankPaymentsPage.orderNumber')}: {selectedPayment.orderNumber}
            </p>
            {/* Agregar aquí los campos para registrar el pago y cargar la imagen del comprobante */}
            <button onClick={handleCloseModal}>
              {t('bankPaymentsPage.close')}
            </button>
          </div>
        </div>
      )}

      <table className='bank-table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Número</th>
            <th>Cliente</th>
            <th>Estado del Pedido</th>
            <th>Estado del Pago</th>
            <th>Forma de Pago</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Expiración</th>
            <th>Total</th>
            <th>Registrar Pago</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/orders/${payment.orderNumber}`}>
                  {payment.orderNumber}
                </Link>
              </td>

              <td>{payment.client}</td>
              <td> {payment.orderState}</td>
              <td>{payment.paymentState}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.creationDate}</td>
              <td>{payment.dueDate}</td>
              <td>{payment.amount}</td>
              <td>
                <button
                  className='btn-pagar'
                  onClick={() => handlePaymentClick(payment)}
                >
                  Pagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='bank-btn' onClick={handleBackButtonClick}>
        Atrás
      </button>
    </div>
  )
}

export default BankPaymentsPage
