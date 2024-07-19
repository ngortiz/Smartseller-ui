import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
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
			<Container className='registerProduct-container'>
				<header className='unique-page-header'>
					{t('registerProductsFromExcel.enterFormToLoadProducts')}
				</header>
				<Form className='unique-form'>
					<Form.Group controlId='formExcelFile' className='mb-3'>
						<Form.Label className='label-register'>
							{t('registerProductsFromExcel.selectExcelFile')}:
						</Form.Label>
						<Form.Control type='file' accept='.xlsx, .xls' />
					</Form.Group>
					<Form.Group controlId='formZipFile' className='mb-3'>
						<Form.Label className='label-register'>
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
			</Container>
			<Container className='registerProduct-container'>
				<Row className='mt-4'>
					<Col>
						<Table bordered hover className='unique-table'>
							<thead>
								<tr>
									<th>{t('registerProductsFromExcel.requiredColumns')}</th>
								</tr>
							</thead>
							<tbody>
								{COLUMN_NAMES.map((name, index) => (
									<tr key={index}>
										<td>{name}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
					<Col>
						<Table bordered hover className='unique-table'>
							<thead>
								<tr>
									<th>{t('registerProductsFromExcel.availableTaxType')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{t('registerProductsFromExcel.iva10')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.iva5')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.exempt')}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col>
						<Table bordered hover className='unique-table'>
							<thead>
								<tr>
									<th>{t('registerProductsFromExcel.availableCategories')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{t('registerProductsFromExcel.bazar')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.hardwareStore')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.home')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.illuminaries')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.toyStore')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.bookshop')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.christmasItems')}</td>
								</tr>
								<tr>
									<td>
										{t('registerProductsFromExcel.beachesCampingOutdoors')}
									</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.automobiles')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.cotillon')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.appliance')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.closet')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.cosmetic')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.cleaningProduct')}</td>
								</tr>
								<tr>
									<td>{t('registerProductsFromExcel.accessories')}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default RegisterProductsFromExcelPage;
