import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useMutation, gql, useQuery } from '@apollo/client';

const UPDATE_OFFER_DISCOUNT = gql`
	mutation UpdateOfferDiscount($offerDiscount: OfferDiscountInput!) {
		updateOfferDiscount(offerDiscount: $offerDiscount) {
			discount
			enabled
			id
			name
		}
	}
`;

const GET_OFFER_DISCOUNT = gql`
	query GetOfferDiscount {
		getOfferDiscount {
			discount
			enabled
			id
			name
		}
	}
`;

const OfferDiscountPage = () => {
	const { t } = useTranslation();
	const [discount, setDiscount] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [showNotification, setShowNotification] = useState(false);

	const { loading, error, data } = useQuery(GET_OFFER_DISCOUNT);

	const [
		updateOfferDiscount,
		{ loading: mutationLoading, error: mutationError },
	] = useMutation(UPDATE_OFFER_DISCOUNT, {
		onCompleted: () => {
			setShowNotification(true);
			setTimeout(() => setShowNotification(false), 3000);
		},
	});

	useEffect(() => {
		if (data && data.getOfferDiscount) {
			setDiscount(data.getOfferDiscount.discount.toString());
			setIsChecked(data.getOfferDiscount.enabled);
		}
	}, [data]);

	const handleUpdate = () => {
		updateOfferDiscount({
			variables: {
				offerDiscount: {
					name: 'Descuento General',
					enabled: isChecked,
					discount: parseFloat(discount),
				},
			},
		}).catch(err => {
			console.error('Error ejecutando la mutación:', err);
		});
	};

	return (
		<>
			<Row>
				<Col>
					<header className='offer-discount-header'>
						{t('offerDiscountPage.offerDiscount')}
					</header>
				</Col>
			</Row>
			<Container className='offer-discount-container'>
				{loading ? (
					<div className='spinner-container'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : error ? (
					<p>Error loading discount: {error.message}</p>
				) : (
					<>
						<Row className='offer-discount-subheader'>
							<Col>
								<h2 className='offer-discount-subheader'>
									{t('offerDiscountPage.enterDiscountPerOffer')}
								</h2>
							</Col>
						</Row>
						<Row className='offer-discount-form'>
							<Col md={3}>
								<Form.Group controlId='formDiscount'>
									<Form.Label>{t('offerDiscountPage.discount')}</Form.Label>
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
										{t('offerDiscountPage.enable')}
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
										? t('offerDiscountPage.updating')
										: t('offerDiscountPage.update')}
								</Button>
							</Col>
						</Row>
						{mutationError && (
							<p>Error updating discount: {mutationError.message}</p>
						)}
					</>
				)}
			</Container>
			<div className={`notification ${showNotification ? 'show' : 'hide'}`}>
				<button
					className='notification-close'
					onClick={() => setShowNotification(false)}
				></button>
				{t('offerDiscountPage.successMessage')}
			</div>
		</>
	);
};

export default OfferDiscountPage;
