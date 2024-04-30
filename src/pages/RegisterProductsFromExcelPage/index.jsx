import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './style.css';

const RegisterProductsFromExcelPage = () => {
	const { t } = useTranslation();

	const COLUMN_NAMES = [
		t('columnNames.name'),
		t('columnNames.productId'),
		t('columnNames.internalCode'),
		t('columnNames.mainProduct'),
		t('columnNames.description'),
		t('columnNames.lastSupplier'),
		t('columnNames.totalStock'),
		t('columnNames.category'),
		t('columnNames.price1'),
		t('columnNames.price2'),
	];

	const handleUpload = () => {};

	return (
		<div className='unique-register-products-page'>
			<header className='unique-title-header'>
				{t('headers.massiveincome')}
			</header>
			<header className='unique-page-header'>
				Ingresar planilla para cargar productos
			</header>
			<Form className='unique-form'>
				<Form.Group controlId='formExcelFile' className='mb-3'>
					<Form.Label>{t('labels.selectExcelFile')}:</Form.Label>
					<Form.Control type='file' accept='.xlsx, .xls' />
				</Form.Group>
				<Form.Group controlId='formZipFile' className='mb-3'>
					<Form.Label>{t('labels.selectZIPFile')}:</Form.Label>
					<Form.Control type='file' accept='.zip' />
				</Form.Group>
			</Form>
			<Button
				variant='primary'
				onClick={handleUpload}
				className='unique-button'
			>
				{t('buttons.charge')}
			</Button>
			<Row>
				<Col>
					<header className='unique-subHeard'>
						{t('headers.requiredcolumns')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('headers.name')}
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
						{t('headers.availableTaxType')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('columnNames.name')}
							</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>{t('columnNames.iva10')}</li>
								<li className='unique-list-item'>{t('columnNames.iva5')}</li>
								<li className='unique-list-item'>{t('columnNames.exempt')}</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<header className='unique-subHeard'>
						{t('headers.availableCategories')}
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>
								{t('columnNames.name')}
							</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>{t('columnNames.bazaar')}</li>
								<li className='unique-list-item'>
									{t('columnNames.hardwareStore')}
								</li>
								<li className='unique-list-item'>{t('columnNames.home')}</li>
								<li className='unique-list-item'>
									{t('columnNames.illuminaries')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.toyStore')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.bookshop')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.christmasItems')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.beachesCampingOutdoors')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.automobiles')}
								</li>

								<li className='unique-list-item'>
									{t('columnNames.cotillon')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.appliance')}
								</li>
								<li className='unique-list-item'>{t('columnNames.closet')}</li>
								<li className='unique-list-item'>
									{t('columnNames.cosmetic')}
								</li>

								<li className='unique-list-item'>
									{t('columnNames.cleaningProduct')}
								</li>
								<li className='unique-list-item'>
									{t('columnNames.accessories')}
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
