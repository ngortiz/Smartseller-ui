import React, { useState, useEffect } from 'react';
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

const MarketRatePage = () => {
	const [currencyType, setCurrencyType] = useState('');
	const [buyPrice, setBuyPrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const [marketRates, setMarketRates] = useState([]);

	useEffect(() => {
		setTimeout(() => {
			setMarketRates([
				{
					date: '2024-05-30',
					money: { id: 1, name: 'Dolar', symbol: 'USD' },
					buyPrice: 7284.05,
					sellPrice: 7300.2,
				},
			]);
			setLoading(false);
		}, 2000);
	}, []);

	const handleSearch = () => {};

	return (
		<Container className='market-rate-container'>
			<Row className='market-rate-header'>
				<header>{t('marketRatePage.quotes')}</header>
			</Row>
			<Row className='market-header2'>
				<header>{t('marketRatePage.enterQuoteValues')}</header>
			</Row>

			<Row>
				<Col>
					<Form className='market-rate-form'>
						<Row className='align-items-end'>
							<Col md={3}>
								<Form.Group controlId='formCurrencyType'>
									<Form.Label>{t('marketRatePage.typeOfCurrency')}</Form.Label>
									<Form.Select
										value={currencyType}
										onChange={e => setCurrencyType(e.target.value)}
									>
										<option value=''>
											{t('marketRatePage.selectCurrency')}
										</option>
										<option value='USD'>USD</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Form.Group controlId='formBuyPrice'>
									<Form.Label>{t('marketRatePage.purchasePrice')}</Form.Label>
									<Form.Control
										value={buyPrice}
										onChange={e => setBuyPrice(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Form.Group controlId='formSellPrice'>
									<Form.Label>{t('marketRatePage.salePrice')}</Form.Label>
									<Form.Control
										value={sellPrice}
										onChange={e => setSellPrice(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Button className='market-rate-button' onClick={handleSearch}>
									{t('marketRatePage.save')}
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row className='market-rate-table'>
				<Col>
					{loading ? (
						<div className='spinner-container'>
							<Spinner animation='border' role='status'>
								<span className='visually-hidden'>Loading...</span>
							</Spinner>
						</div>
					) : (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>{t('marketRatePage.date')}</th>
									<th>{t('marketRatePage.money')}</th>
									<th>{t('marketRatePage.purchasePrice')}</th>
									<th>{t('marketRatePage.salePrice')}</th>
								</tr>
							</thead>
							<tbody>
								{marketRates.map((rate, index) => (
									<tr key={index}>
										<td>{rate.date}</td>
										<td>{rate.currency}</td>
										<td>{rate.buyPrice}</td>
										<td>{rate.sellPrice}</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default MarketRatePage;
