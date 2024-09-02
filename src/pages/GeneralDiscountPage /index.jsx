import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, gql } from '@apollo/client';

const GET_GENERAL_DISCOUNT = gql`
	query GetGeneralDiscount {
		getGeneralDiscount {
			id
			discount
			enabled
		}
	}
`;

const UPDATE_GENERAL_DISCOUNT = gql`
	mutation UpdateGeneralDiscount($generalDiscount: GeneralDiscountInput!) {
		updateGeneralDiscount(generalDiscount: $generalDiscount) {
			id
			name
			discount
		}
	}
`;

const GeneralDiscountPage = () => {
	const { t } = useTranslation();
	const [discount, setDiscount] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showNotification, setShowNotification] = useState(false);

	const {
		loading: queryLoading,
		error: queryError,
		data,
	} = useQuery(GET_GENERAL_DISCOUNT);

	const [
		updateGeneralDiscount,
		{ loading: mutationLoading, error: mutationError },
	] = useMutation(UPDATE_GENERAL_DISCOUNT, {
		onCompleted: () => {
			setShowNotification(true);
			setTimeout(() => setShowNotification(false), 3000);
		},
	});

	useEffect(() => {
		if (data && data.getGeneralDiscount) {
			setDiscount(data.getGeneralDiscount.discount.toString());
			setIsChecked(data.getGeneralDiscount.enabled);
		}
		setLoading(queryLoading);
	}, [data, queryLoading]);

	const handleUpdate = () => {
		updateGeneralDiscount({
			variables: {
				generalDiscount: {
					name: 'Descuento General',
					enabled: isChecked,
					discount: parseFloat(discount),
				},
			},
		}).catch(err => {
			console.error('Error executing mutation:', err);
		});
	};

	return (
		<>
			<Row>
				<Col>
					<header className='general-discount-header'>
						{t('generalDiscount.generalDiscount')}
					</header>
				</Col>
			</Row>
			<Container className='general-discount-container'>
				{loading ? (
					<div className='spinner-container'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<>
						<Row className='general-discount-subheader'>
							<Col>
								<h2 className='general-discount-subheader'>
									{t('generalDiscount.discountRate')}
								</h2>
							</Col>
						</Row>
						<Row className='general-discount-form'>
							<Col md={3}>
								<Form.Group controlId='formDiscount'>
									<Form.Label>{t('generalDiscount.discount')}</Form.Label>
									<Form.Control
										type='number'
										value={discount}
										onChange={e => setDiscount(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={2} className='align-self-center'>
								<Form.Group
									controlId='formIsChecked'
									className='form-check-group'
								>
									<Form.Label className='form-check-label'>
										{t('generalDiscount.enable')}
									</Form.Label>
									<Form.Check
										type='checkbox'
										checked={isChecked}
										onChange={e => setIsChecked(e.target.checked)}
										className='discount-check-input'
									/>
								</Form.Group>
							</Col>
							<Col md={7} className='align-self-end'>
								<Button
									onClick={handleUpdate}
									className='update-button'
									disabled={mutationLoading}
								>
									{mutationLoading
										? t('generalDiscount.updating')
										: t('generalDiscount.update')}
								</Button>
							</Col>
						</Row>
						{mutationError && (
							<p>Error updating discount: {mutationError.message}</p>
						)}
						{queryError && <p>Error loading discount: {queryError.message}</p>}
					</>
				)}
			</Container>
			<div className={`notification ${showNotification ? 'show' : 'hide'}`}>
				<button
					className='notification-close'
					onClick={() => setShowNotification(false)}
				></button>
				la operación ha sido existosa!
			</div>
		</>
	);
};

export default GeneralDiscountPage;
