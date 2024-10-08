import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';

const PAY_ORDER_MUTATION = gql`
	mutation PayOrder($input: PayOrderInput!) {
		payOrder(input: $input) {
			id
			comment
			moneyId
			moneyValue
		}
	}
`;

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
	const { t } = useTranslation();
	const voucherNumberRef = useRef(null);
	const accountTypeRef = useRef(null);

	const [payOrder, { loading }] = useMutation(PAY_ORDER_MUTATION);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState('');
	const [notificationType, setNotificationType] = useState('success');

	const handlePaymentSubmit = async () => {
		const voucherNumber = voucherNumberRef.current?.value;
		const accountType = accountTypeRef.current?.value;

		// Validar si faltan datos importantes
		if (!voucherNumber) {
			setError('El número de comprobante es requerido');
			return;
		}

		// Ejecutar la mutación
		try {
			const { data } = await payOrder({
				variables: {
					input: {
						orderId: payment.id,
						moneyId: accountType === 'Gs' ? 1 : 2,
						voucherNumber,
						total: accountType === 'Gs' ? payment.totalGs : payment.total,
					},
				},
			});

			onPaymentRegister(data.payOrder);
			setNotification(t('El pago se ha procesado con éxito'));
			setNotificationType('success');

			setTimeout(() => {
				onClose();
			}, 3000);
		} catch (error) {
			// Manejo de errores
			setError('Error en el pago. Intente nuevamente.');
			console.error('Error en la mutación:', error);
			setNotification(error.message);
			setNotificationType('danger');
		}
	};

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const deudaUsd = payment.total ?? 0;
	const deudaGs = payment.totalGs ?? 0;

	const formatNumber = (number, currency) => {
		if (currency === 'USD') {
			return `US$ ${number.toFixed(2)}`;
		}
		return `Gs. ${new Intl.NumberFormat('es-PY').format(number)}`;
	};

	return (
		<>
			<Modal show={true} onHide={onClose} size='sm'>
				<Modal.Header closeButton>
					<Modal.Title>{t('paymentModal.paymentDetails')}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{notification && (
						<Alert variant={notificationType} className='notification'>
							{notification}
						</Alert>
					)}

					<Form.Group controlId='formClient'>
						<Form.Label>{t('paymentModal.client')}:</Form.Label>
						<Form.Control
							type='text'
							value={payment.username}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId='formOrderNumber'>
						<Form.Label>{t('paymentModal.orderNumber')}:</Form.Label>
						<Form.Control
							type='text'
							value={payment.number}
							readOnly
							disabled
						/>
					</Form.Group>
					<Form.Group controlId='formVoucherNumber'>
						<Form.Label>{t('paymentModal.voucherNumber')}:</Form.Label>
						<Form.Control
							type='text'
							placeholder='Ingrese el número de comprobante'
							ref={voucherNumberRef}
						/>
					</Form.Group>

					<Form.Group controlId='formAccountType'>
						<Form.Label>{t('paymentModal.account')}:</Form.Label>
						<Form.Control as='select' ref={accountTypeRef}>
							<option>{t('paymentModal.select')}...</option>
							<option value='USD'>Dólar (USD)</option>
							<option value='Gs'>Guaraní (Gs)</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId='formDebt'>
						<Form.Label>{t('paymentModal.ussDebt')}</Form.Label>
						<Form.Control
							type='text'
							value={formatNumber(deudaUsd, 'USD')}
							readOnly
							disabled
						/>
					</Form.Group>

					<Form.Group controlId='formDebtGs'>
						<Form.Label>{t('paymentModal.gsDebt')}</Form.Label>
						<Form.Control
							type='text'
							value={formatNumber(deudaGs, 'Gs')}
							readOnly
							disabled
						/>
					</Form.Group>

					{error && <p className='text-danger'>{error}</p>}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						onClick={handlePaymentSubmit}
						disabled={loading}
					>
						{loading ? (
							<Spinner animation='border' size='sm' />
						) : (
							t('paymentModal.confirm')
						)}
					</Button>
					<Button variant='secondary' onClick={onClose}>
						{t('paymentModal.cancel')}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

PaymentModal.propTypes = {
	payment: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onPaymentRegister: PropTypes.func.isRequired,
};

export default PaymentModal;
