import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Table,
	Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';
import moment from 'moment';

const GET_MARKET_RATES = gql`
	query GetMarketRates {
		getMarketRates {
			id
			createdAt
			money {
				id
				name
				symbol
			}
			priceBuy
			priceSell
		}
	}
`;

const CREATE_MARKET_RATE_MUTATION = gql`
	mutation CreateMarketRate($moneyId: Int!, $priceBuy: Int!, $priceSell: Int!) {
		createMarketRate(
			marketRate: {
				moneyId: $moneyId
				priceBuy: $priceBuy
				priceSell: $priceSell
			}
		) {
			id
			createdAt
			priceBuy
			priceSell
		}
	}
`;

const MarketRatePage = () => {
	const { t } = useTranslation();
	const { loading, error, data } = useQuery(GET_MARKET_RATES);
	const [createMarketRate] = useMutation(CREATE_MARKET_RATE_MUTATION);

	const [marketRates, setMarketRates] = useState([]);
	const [currencyType, setCurrencyType] = useState('1');
	const [buyPrice, setBuyPrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [notification, setNotification] = useState('');
	const [isSaving, setIsSaving] = useState(false);

	React.useEffect(() => {
		if (data && data.getMarketRates) {
			setMarketRates(data.getMarketRates);
		}
	}, [data]);

	const handleSave = async () => {
		if (currencyType && buyPrice && sellPrice) {
			setIsSaving(true);
			try {
				const { data: newMarketRateData } = await createMarketRate({
					variables: {
						moneyId: parseInt(currencyType),
						priceBuy: parseInt(buyPrice),
						priceSell: parseInt(sellPrice),
					},
				});

				setMarketRates([...marketRates, newMarketRateData.createMarketRate]);

				setNotification('Se ha agregado la nueva cotización');
			} catch (err) {
				console.error('Error creating market rate:', err);
			} finally {
				setIsSaving(false);
			}
		} else {
			alert('Por favor, completa todos los campos.');
		}
	};

	React.useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	return (
		<>
			<Row>
				<header className='market-rate-header'>
					{t('marketRatePage.quotes')}
				</header>
			</Row>
			<Container className='market-rate-container'>
				<Row>
					<header className='market-header2'>
						{t('marketRatePage.enterQuoteValues')}
					</header>
				</Row>

				<Row>
					<Col>
						<Form className='market-rate-form'>
							<Row className='align-items-end'>
								<Col md={3}>
									<Form.Group controlId='formCurrencyType'>
										<Form.Label>
											{t('marketRatePage.typeOfCurrency')}
										</Form.Label>
										<Form.Select
											value={currencyType}
											onChange={e => setCurrencyType(e.target.value)}
											disabled={isSaving} // Disable select while saving
										>
											<option value=''>
												{t('marketRatePage.selectCurrency')}
											</option>
											<option value='1'>Dolar</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={3}>
									<Form.Group controlId='formBuyPrice'>
										<Form.Label>{t('marketRatePage.purchasePrice')}</Form.Label>
										<Form.Control
											value={buyPrice}
											onChange={e => setBuyPrice(e.target.value)}
											type='number'
											disabled={isSaving} // Disable input while saving
										/>
									</Form.Group>
								</Col>
								<Col md={3}>
									<Form.Group controlId='formSellPrice'>
										<Form.Label>{t('marketRatePage.salePrice')}</Form.Label>
										<Form.Control
											value={sellPrice}
											onChange={e => setSellPrice(e.target.value)}
											type='number'
											disabled={isSaving} // Disable input while saving
										/>
									</Form.Group>
								</Col>
								<Col md={3}>
									<Button
										className='market-rate-button'
										onClick={handleSave}
										disabled={isSaving} // Disable select while saving
									>
										{isSaving ? (
											<Spinner
												as='span'
												animation='border'
												size='sm'
												role='status'
												aria-hidden='true'
											/>
										) : (
											t('marketRatePage.save')
										)}
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>

				{notification && <div className='notification'>{notification}</div>}

				<Row className='market-rate-table'>
					<Col>
						{loading ? (
							<div className='spinner-container'>
								<Spinner animation='border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							</div>
						) : error ? (
							<p>Error: {error.message}</p>
						) : (
							<Table bordered hover>
								<thead>
									<tr>
										<th>{t('marketRatePage.date')}</th>
										<th>{t('marketRatePage.money')}</th>
										<th>{t('marketRatePage.purchasePrice')}</th>
										<th>{t('marketRatePage.salePrice')}</th>
									</tr>
								</thead>
								<tbody>
									{marketRates.map(rate => (
										<tr key={rate.id}>
											<td>
												{moment(rate.createdAt).format('DD-MM-YYYY HH:mm')}
											</td>

											<td>
												{rate.money && rate.money.name === 'Guarani'
													? 'Dolar'
													: rate.money
														? rate.money.name
														: 'Dolar'}
											</td>
											<td>{rate.priceBuy}</td>
											<td>{rate.priceSell}</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default MarketRatePage;
