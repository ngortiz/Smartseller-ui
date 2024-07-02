import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css';

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
	const { t } = useTranslation();
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
			accountType: accountTypeRef.current.value,
		};
		onPaymentRegister(paymentData);
	};

	return (
		<Modal show={true} onHide={onClose} size='sm'>
			<Modal.Header closeButton>
				<Modal.Title>{t('paymentModal.paymentDetails')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group controlId='formVoucherNumber'>
					<Form.Label>{t('paymentModal.client')}</Form.Label>
					<Form.Control
						type='text'
						value={payment.username}
						readOnly
						disabled
					/>
				</Form.Group>
				<Form.Group controlId='formVoucherNumber'>
					<Form.Label>{t('paymentModal.orderNumber')}</Form.Label>
					<Form.Control type='text' value={payment.number} readOnly disabled />
				</Form.Group>
				<Form.Group controlId='formVoucherNumber'>
					<Form.Label>{t('paymentModal.voucherNumber')}</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese el número de comprobante'
						ref={voucherNumberRef}
					/>
				</Form.Group>
				<Form.Group controlId='formPaymentDate'>
					<Form.Label>{t('paymentModal.paymentDate')}</Form.Label>
					<Form.Control type='date' ref={paymentDateRef} />
				</Form.Group>
				<Form.Group controlId='formPaymentAmount'>
					<Form.Label>{t('paymentModal.paymentAmount')}</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese el monto del pago'
						ref={paymentAmountRef}
					/>
				</Form.Group>
				<Form.Group controlId='formPaymentMethod'>
					<Form.Label>{t('paymentModal.paymentMethod')}</Form.Label>
					<Form.Control as='select' ref={paymentMethodRef}>
						<option>{t('paymentModal.select')}...</option>
						<option>{t('paymentModal.cash')}</option>
						<option>{t('paymentModal.creditCard')}</option>
						<option>{t('paymentModal.bankTransference')}</option>
						<option>{t('paymentModal.others')}</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='formAccountType'>
					<Form.Label>{t('paymentModal.account')}</Form.Label>
					<Form.Control as='select' ref={accountTypeRef}>
						<option>{t('paymentModal.select')}...</option>
						<option>$USD</option>
						<option>Gs</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Label>{t('paymentModal.uploadVoucher')}</Form.Label>
					<Form.Control type='file' />
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className='modal-btn-primary'
					variant='primary'
					onClick={handlePaymentSubmit}
				>
					{t('paymentModal.confirm')}
				</Button>
				<Button
					className='modal-btn-secondary '
					variant='secondary'
					onClick={onClose}
				>
					{t('paymentModal.cancel')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

PaymentModal.propTypes = {
	payment: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onPaymentRegister: PropTypes.func.isRequired,
};

export default PaymentModal;
