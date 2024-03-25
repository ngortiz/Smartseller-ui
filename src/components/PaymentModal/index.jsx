import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './style.css'

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [voucherNumber, setVoucherNumber] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [accountType, setAccountType] = useState('')

  const handlePaymentSubmit = () => {
    const paymentData = {
      orderId: payment.id,
      amount: paymentAmount,
      method: paymentMethod,
      receipt: receiptImage,
      voucherNumber: voucherNumber,
      paymentDate: paymentDate,
      accountType: accountType
    }
    onPaymentRegister(paymentData)
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='formVoucherNumber'>
          <Form.Label>Cliente</Form.Label>
          <Form.Control type='text' value={payment.client} readOnly disabled />
        </Form.Group>
        <Form.Group controlId='formVoucherNumber'>
          <Form.Label>Numero pedido</Form.Label>
          <Form.Control
            type='text'
            value={payment.orderNumber}
            readOnly
            disabled
          />
        </Form.Group>
        <Form.Group controlId='formVoucherNumber'>
          <Form.Label>Nro. Comprobante</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese el número de comprobante'
            value={voucherNumber}
            onChange={e => setVoucherNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentDate'>
          <Form.Label>Fecha de Pago</Form.Label>
          <Form.Control
            type='date'
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentAmount'>
          <Form.Label>Monto de Pago</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese el monto del pago'
            value={paymentAmount}
            onChange={e => setPaymentAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentMethod'>
          <Form.Label>Método de Pago</Form.Label>
          <Form.Control
            as='select'
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <option>Seleccione...</option>
            <option>Efectivo</option>
            <option>Tarjeta de Crédito</option>
            <option>Transferencia Bancaria</option>
            <option>Otro</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='formAccountType'>
          <Form.Label>Cuenta</Form.Label>
          <Form.Control
            as='select'
            value={accountType}
            onChange={e => setAccountType(e.target.value)}
          >
            <option>Seleccione...</option>
            <option>$USD</option>
            <option>Gs</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Subir comprobante</Form.Label>
          <Form.Control type='file' />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className='modal-btn-primary'
          variant='primary'
          onClick={handlePaymentSubmit}
        >
          Confirmar
        </Button>
        <Button
          className='modal-btn-secondary '
          variant='secondary'
          onClick={onClose}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
PaymentModal.propTypes = {
  payment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentRegister: PropTypes.func.isRequired
}

export default PaymentModal
