import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './style.css';

const MarketRatePage = () => {
	const [currencyType, setCurrencyType] = useState('');
	const [buyPrice, setBuyPrice] = useState('');
	const [sellPrice, setSellPrice] = useState('');
	const [marketRates, setMarketRates] = useState([
		{
			date: '2024-05-30',
			currency: 'USD',
			buyPrice: 7284.05,
			sellPrice: 7300.2,
		},
	]);

	const handleSearch = () => {};

	return (
		<Container className='market-rate-container'>
			<Row className='market-rate-header'>
				<header>Cotizaciones</header>
			</Row>
			<Row className='market-header2'>
				<header>Ingresar los valores de la cotización</header>
			</Row>

			<Row>
				<Col>
					<Form className='market-rate-form'>
						<Row className='align-items-end'>
							<Col md={3}>
								<Form.Group controlId='formCurrencyType'>
									<Form.Label>Tipo de Moneda</Form.Label>
									<Form.Select
										value={currencyType}
										onChange={e => setCurrencyType(e.target.value)}
									>
										<option value=''>Seleccionar...</option>
										<option value='USD'>USD</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Form.Group controlId='formBuyPrice'>
									<Form.Label>Precio de Compra</Form.Label>
									<Form.Control
										value={buyPrice}
										onChange={e => setBuyPrice(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Form.Group controlId='formSellPrice'>
									<Form.Label>Precio de Venta</Form.Label>
									<Form.Control
										value={sellPrice}
										onChange={e => setSellPrice(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={3}>
								<Button className='market-rate-button' onClick={handleSearch}>
									Buscar
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row className='market-rate-table'>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Moneda</th>
								<th>Precio de Compra</th>
								<th>Precio de Venta</th>
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
				</Col>
			</Row>
		</Container>
	);
};

export default MarketRatePage;
