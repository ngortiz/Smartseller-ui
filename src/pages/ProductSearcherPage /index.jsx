import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { gql, useQuery } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
	query GetCategories {
		getCategories {
			name
			id
		}
	}
`;

const ProductSearcherPage = () => {
	const [internalCode, setInternalCode] = useState('');
	const [barcode, setBarcode] = useState('');
	const [description, setDescription] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [category, setCategory] = useState('');
	const [checked, setChecked] = useState(false);
	const { t } = useTranslation();
	const [products, setProducts] = useState([
		{
			id: 1,
			productCode: '001',
			internalCode: '001',
			barcode: '123456789',
			mainProduct: 'Producto 1',
			description: '',
			stock: 100,
			category: 'Categoria',
			subcategory: 'Subcategoría',
			costPrice: 10.5,
			salePrice: 15.99,
			onSale: true,
			specification: '',
		},
		{
			id: 2,
			productCode: '002',
			internalCode: '002',
			barcode: '987654321',
			mainProduct: 'Producto 2',
			description: '',
			stock: 50,
			category: 'Categoria',
			subcategory: 'Subcategoría',
			costPrice: 8.75,
			salePrice: 12.49,
			onSale: false,
			specification: '',
		},
	]);
	const [productCode, setProductCode] = useState('');

	const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

	useEffect(() => {
		if (data && data.getCategories) {
			setCategory(data.getCategories);
		}
	}, [data]);
	console.log(data);

	const handleSearch = () => {};
	const handleSearchByProductCode = event => {
		event.preventDefault();
	};
	const handleEditProduct = productId => {};

	const handleDeleteProduct = productId => {};

	return (
		<Container id='product-searcher-page'>
			<Row className='mt-4'>
				<header className='product-heard'>
					{t('productSearcherPage.searchVariantProducts')}
				</header>
			</Row>
			<Row className='mt-4'>
				<Form.Group
					as={Col}
					controlId='formInternalCode'
					className='product-form-control'
				>
					<Form.Label>{t('productSearcherPage.internoCode')}:</Form.Label>
					<Form.Control
						type='text'
						placeholder={t('productSearcherPage.enterTheInternalCode')}
						value={internalCode}
						onChange={e => setInternalCode(e.target.value)}
						className='product-form-control'
					/>
				</Form.Group>
				<Form.Group
					as={Col}
					controlId='formBarcode'
					className='product-form-control'
				>
					<Form.Label>{t('productSearcherPage.baCode')}:</Form.Label>
					<Form.Control
						type='text'
						placeholder={t('productSearcherPage.enterBarCode')}
						value={barcode}
						onChange={e => setBarcode(e.target.value)}
						className='product-form-control'
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formDescription'>
					<Form.Label>{t('productSearcherPage.description')}:</Form.Label>
					<Form.Control
						type='text'
						placeholder={t('productSearcherPage.enterDescription')}
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='product-form-control'
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formSubcategory'>
					<Form.Label>{t('productSearcherPage.categories')}:</Form.Label>
					<Form.Select
						aria-label={t('productSearcherPage.category')}
						value={subcategory}
						onChange={e => setSubcategory(e.target.value)}
						className='product-form-select'
					>
						{loading ? (
							<option>{t('productSearcherPage.loading')}</option>
						) : (
							<>
								<option>{t('productSearcherPage.select')}...</option>
								{data.getCategories.map(category => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</>
						)}
					</Form.Select>
				</Form.Group>
				<Form.Group
					as={Col}
					controlId='formCheckbox'
					className='product-frominput'
				>
					<Form.Check
						type='checkbox'
						label={t('productSearcherPage.post')}
						checked={checked}
						onChange={e => setChecked(e.target.checked)}
						className=' product-check-input'
					/>
				</Form.Group>

				<Col className='mt-3'>
					<Button
						variant='primary'
						onClick={handleSearch}
						className='product-button'
					>
						<i className='bi bi-search'></i> {t('productSearcherPage.searcher')}
					</Button>
				</Col>
			</Row>

			<Row className='mt-4'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>{t('productSearcherPage.productCode')}</th>
							<th>{t('productSearcherPage.internalCode')}</th>
							<th>{t('productSearcherPage.barCode')}</th>
							<th>{t('productSearcherPage.mainProduct')}</th>
							<th>{t('productSearcherPage.description')}</th>
							<th>{t('productSearcherPage.stock')}</th>
							<th>{t('productSearcherPage.category')}</th>
							<th>{t('productSearcherPage.subCategory')}</th>
							<th>{t('productSearcherPage.costPrice')}</th>
							<th>{t('productSearcherPage.salePrice')}</th>
							<th>{t('productSearcherPage.inOffer')}</th>
							<th>{t('productSearcherPage.specification')}</th>
							<th>{t('productSearcherPage.edit')}</th>
							<th>{t('productSearcherPage.delete')}</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>{product.productCode}</td>
								<td>{product.internalCode}</td>
								<td>{product.barcode}</td>
								<td>{product.mainProduct}</td>
								<td>{product.description}</td>
								<td>{product.stock}</td>
								<td>{product.category}</td>
								<td>{product.subcategory}</td>
								<td>US$ {product.costPrice}</td>
								<td>US$ {product.salePrice}</td>
								<td>{product.onSale ? 'Sí' : 'No'}</td>
								<td>{product.specification}</td>
								<td>
									<Button
										variant='info'
										onClick={() => handleEditProduct(product.id)}
										className='product-button-edit'
									>
										<i className='bi bi-pencil-square'></i>
									</Button>
								</td>
								<td>
									<Button
										className='product-button-delete '
										variant='danger'
										onClick={() => handleDeleteProduct(product.id)}
									>
										<i className='bi bi-trash3'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default ProductSearcherPage;
