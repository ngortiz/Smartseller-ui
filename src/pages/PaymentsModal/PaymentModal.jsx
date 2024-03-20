import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import './style.css'

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [receiptImage, setReceiptImage] = useState(null)
  const [operationType, setOperationType] = useState('')
  const [receiptNumber, setReceiptNumber] = useState('')
  const [paymentDate, setPaymentDate] = useState('')

  const handlePaymentSubmit = () => {
    const paymentData = {
      orderId: payment.id,
      amount: paymentAmount,
      method: paymentMethod,
      receipt: receiptImage,
      operationType: operationType,
      receiptNumber: receiptNumber,
      paymentDate: paymentDate
    }
    onPaymentRegister(paymentData)
  }

  return (
    <div className='payment-modal'>
      <div className='payment-modal-content'>
        <h2>Detalles del Pago</h2>
        <p>Cliente: {payment.client}</p>
        <p>Número de Pedido: {payment.orderNumber}</p>
        <Row>
          <label htmlFor='paymentAmount'>Tipo de Operación:</label>
          <input
            type='text'
            id='operationType'
            value={operationType}
            onChange={e => setOperationType(e.target.value)}
          />
          <label htmlFor='receiptNumber'>Nro. Comprobante:</label>
          <input
            type='text'
            id='receiptNumber'
            value={receiptNumber}
            onChange={e => setReceiptNumber(e.target.value)}
          />
          <label htmlFor='paymentDate'>Fecha de Pago:</label>
          <input
            type='date'
            id='paymentDate'
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
          />
          <label htmlFor='paymentAmount'>Monto del Pago:</label>
          <input
            type='text'
            id='paymentAmount'
            value={paymentAmount}
            onChange={e => setPaymentAmount(e.target.value)}
          />
          <label htmlFor='paymentMethod'>Método de Pago:</label>
          <input
            type='text'
            id='paymentMethod'
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='receiptImage'>Comprobante de Pago:</label>
          <input
            type='file'
            id='receiptImage'
            onChange={e => setReceiptImage(e.target.files[0])}
          />
        </Row>
        <div>
          <button onClick={handlePaymentSubmit}>Registrar Pago</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
