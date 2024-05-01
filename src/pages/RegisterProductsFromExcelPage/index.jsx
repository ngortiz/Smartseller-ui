import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './style.css';

const RegisterProductsFromExcelPage = () => {
	const { t } = useTranslation();

	const COLUMN_NAMES = [
		t('registerProductsFromExcel.name'),
		t('registerProductsFromExcel.productId'),
		t('registerProductsFromExcel.internalCode'),
		t('registerProductsFromExcel.mainProduct'),
		t('registerProductsFromExcel.description'),
		t('registerProductsFromExcel.lastSupplier'),
		t('registerProductsFromExcel.totalStock'),
		t('registerProductsFromExcel.category'),
		t('registerProductsFromExcel.price1'),
		t('registerProductsFromExcel.price2'),
	];

	const handleUpload = () => {};

	return (
		<div className='unique-register-products-page'>
			<header className='unique-title-header'>
				{t('registerProductsFromExcel.massiveIncome')}
			</header>
			<header className='unique-page-header'>
				{t('registerProductsFromExcel.enterFormToLoadProducts')}
			</header>
			<Form className='unique-form'>
				<Form.Group controlId='formExcelFile' className='mb-3'>
					<Form.Label>
						{t('registerProductsFromExcel.selectExcelFile')}:
					</Form.Label>
					<Form.Control type='file' accept='.xlsx, .xls' />
				</Form.Group>
				<Form.Group controlId='formZipFile' className='mb-3'>
					<Form.Label>
						{t('registerProductsFromExcel.selectZIPFile')}:
					</Form.Label>
					<Form.Control type='file' accept='.zip' />
				</Form.Group>
			</Form>
			<Button
				variant='primary'
				onClick={handleUpload}
				className='unique-button'
			>
				{t('registerProductsFromExcel.charge')}
			</Button>
			<Row>
				<Col>
					<header className='unique-subHeard'>
						{t('registerProductsFromExcel.requiredColumns')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('registerProductsFromExcel.name')}
							</Card.Title>
							<ul className='unique-list'>
								{COLUMN_NAMES.map((name, index) => (
									<li key={index} className='unique-list-item'>
										{name}
									</li>
								))}
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<header className='unique-subHeard'>
						{t('registerProductsFromExcel.availableTaxType')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('registerProductsFromExcel.name')}
							</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.iva10')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.iva5')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.exempt')}
								</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<header className='unique-subHeard'>
						{t('registerProductsFromExcel.availableCategories')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('registerProductsFromExcel.name')}
							</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.bazar')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.hardwareStore')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.home')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.illuminaries')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.toyStore')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.bookshop')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.christmasItems')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.beachesCampingOutdoors')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.automobiles')}
								</li>

								<li className='unique-list-item'>
									{t('registerProductsFromExcel.cotillon')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.appliance')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.closet')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.cosmetic')}
								</li>

								<li className='unique-list-item'>
									{t('registerProductsFromExcel.cleaningProduct')}
								</li>
								<li className='unique-list-item'>
									{t('registerProductsFromExcel.accessories')}
								</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default RegisterProductsFromExcelPage;
