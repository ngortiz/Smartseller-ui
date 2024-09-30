import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';

const PAY_ORDER_MUTATION = gql`
	mutation PayOrder(
		$orderId: Int!
		$moneyId: Int!
		$voucherNumber: String!
		$total: Float!
		$userId: Int!
	) {
		payOrder(
			payOrder: {
				orderId: $orderId
				moneyId: $moneyId
				voucherNumber: $voucherNumber
				total: $total
				userId: $userId
			}
		) {
			id
			comment
			moneyId
			moneyValue
			voucherNumber
		}
	}
`;

const PaymentModal = ({ payment, onClose, onPaymentRegister, marketRate }) => {
	const { t } = useTranslation();
	const voucherNumberRef = useRef(null);
	const accountTypeRef = useRef(null);

	const [payOrder] = useMutation(PAY_ORDER_MUTATION);

	// Realiza la conversión de USD a Gs
	const convertUsdToGs = totalUsd => {
		return totalUsd * (marketRate?.priceBuy ?? 1); // Utiliza la tasa de cambio si está disponible
	};

	const handlePaymentSubmit = async () => {
		if (!voucherNumberRef.current || !accountTypeRef.current) {
			console.error('Referencia de formulario no encontrada');
			return;
		}

		const voucherNumber = voucherNumberRef.current.value;
		const accountType = accountTypeRef.current.value;
		if (!voucherNumber) {
			console.error('El número de comprobante es requerido');
			return;
		}

		const paymentData = {
			orderId: payment.id,
			total: payment.debtUss,
			moneyId: accountType === 'Gs' ? 1 : 2,
			voucherNumber,
			userId: payment.userId,
		};

		try {
			const { data } = await payOrder({
				variables: {
					...paymentData,
				},
			});
			console.log('Payment success:', data);
			onPaymentRegister(paymentData);
		} catch (error) {
			console.error('Payment error:', error);
		}
	};

	const deudaUsd = payment.total ?? 0;
	const deudaGs = convertUsdToGs(deudaUsd);

	return (
		<Modal show={true} onHide={onClose} size='sm'>
			<Modal.Header closeButton>
				<Modal.Title>{t('paymentModal.paymentDetails')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group controlId='formClient'>
					<Form.Label>Cliente:</Form.Label>
					<Form.Control
						type='text'
						value={payment.username}
						readOnly
						disabled
					/>
				</Form.Group>
				<Form.Group controlId='formOrderNumber'>
					<Form.Label>Nro. de Pedido:</Form.Label>
					<Form.Control type='text' value={payment.number} readOnly disabled />
				</Form.Group>
				<Form.Group controlId='formVoucherNumber'>
					<Form.Label>Nro. Comprobante*:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese el número de comprobante'
						ref={voucherNumberRef}
					/>
				</Form.Group>

				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Label>Imagen:</Form.Label>
					<Form.Control type='file' disabled />
					<Form.Text>No file chosen</Form.Text>
				</Form.Group>

				<Form.Group controlId='formDebt'>
					<Form.Label>Deuda USS:</Form.Label>
					<Form.Control
						type='text'
						value={`US$ ${deudaUsd.toFixed(2)}`}
						readOnly
						disabled
					/>
				</Form.Group>

				<Form.Group controlId='formDebtGs'>
					<Form.Label>Deuda Gs:</Form.Label>
					<Form.Control
						type='text'
						value={`Gs. ${deudaGs.toFixed(0)}`}
						readOnly
						disabled
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={handlePaymentSubmit}>
					{t('paymentModal.confirm')}
				</Button>
				<Button variant='secondary' onClick={onClose}>
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
	marketRate: PropTypes.shape({
		priceBuy: PropTypes.number,
	}),
};

export default PaymentModal;
