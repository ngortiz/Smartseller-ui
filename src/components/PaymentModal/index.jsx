import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css';

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
  const paymentAmountRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const voucherNumberRef = useRef(null);
  const paymentDateRef = useRef(null);
  const accountTypeRef = useRef(null);

  const handlePaymentSubmit = () => {
    const paymentData = {
      orderId: payment.id,
      amount: paymentAmountRef.current.value,
      method: paymentMethodRef.current.value,
      voucherNumber: voucherNumberRef.current.value,
      paymentDate: paymentDateRef.current.value,
      accountType: accountTypeRef.current.value
    };
    onPaymentRegister(paymentData);
  };

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
            ref={voucherNumberRef}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentDate'>
          <Form.Label>Fecha de Pago</Form.Label>
          <Form.Control
            type='date'
            ref={paymentDateRef}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentAmount'>
          <Form.Label>Monto de Pago</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese el monto del pago'
            ref={paymentAmountRef}
          />
        </Form.Group>
        <Form.Group controlId='formPaymentMethod'>
          <Form.Label>Método de Pago</Form.Label>
          <Form.Control
            as='select'
            ref={paymentMethodRef}
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
            ref={accountTypeRef}
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
  );
};

PaymentModal.propTypes = {
  payment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentRegister: PropTypes.func.isRequired
};

export default PaymentModal;
