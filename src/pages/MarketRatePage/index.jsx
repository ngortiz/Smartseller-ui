import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
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

const GET_MARKET_RATES = gql`
	query GetMarketRates {
		getMarketRates {
			id
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

const MarketRatePage = () => {
	const { t } = useTranslation();
	const { loading, error, data } = useQuery(GET_MARKET_RATES);
	const [currencyType, setCurrencyType] = useState('');
	const [buyPrice, setBuyPrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');

	const handleSearch = () => {};

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
						) : error ? (
							<p>Error: {error.message}</p>
						) : (
							<Table bordered hover>
								<thead>
									<tr>
										<th>{t('marketRatePage.money')}</th>
										<th>{t('marketRatePage.purchasePrice')}</th>
										<th>{t('marketRatePage.salePrice')}</th>
									</tr>
								</thead>
								<tbody>
									{data.getMarketRates.map((rate, index) => (
										<tr key={rate.id}>
											<td>{rate.money.name}</td>
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
