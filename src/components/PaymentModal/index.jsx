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

const PaymentModal = ({ payment, onClose, onPaymentRegister }) => {
	const { t } = useTranslation();
	const voucherNumberRef = useRef(null);
	const accountTypeRef = useRef(null);

	const [payOrder] = useMutation(PAY_ORDER_MUTATION);

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
			total: payment.totalDebt,
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
	const totalGs = payment.totalGs ?? 0;

	const formatNumber = number => new Intl.NumberFormat('es-PY').format(number);

	return (
		<Modal show={true} onHide={onClose} size='sm'>
			<Modal.Header closeButton>
				<Modal.Title>{t('paymentModal.paymentDetails')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
					<Form.Control type='text' value={payment.number} readOnly disabled />
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
						<option>$USD</option>
						<option>Gs</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Label>{t('paymentModal.image')}:</Form.Label>
					<Form.Control type='file' disabled />
				</Form.Group>

				<Form.Group controlId='formDebt'>
					<Form.Label>{t('paymentModal.ussDebt')}</Form.Label>
					<Form.Control
						type='text'
						value={`US$ ${deudaUsd.toFixed(2)}`}
						readOnly
						disabled
					/>
				</Form.Group>

				<Form.Group controlId='formDebtGs'>
					<Form.Label>{t('paymentModal.gsDebt')}</Form.Label>
					<Form.Control
						type='text'
						value={`Gs. ${formatNumber(totalGs)}`}
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
};

export default PaymentModal;
