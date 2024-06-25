import React, { useState } from 'react';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const ProductsTable = () => {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState('');

	const products = [
		{
			code: '001',
			name: 'Producto 1',
			category: 'Categoría 1',
			subCategory: 'Sub Categoría 1',
			provider: 'Proveedor 1',
			variants: 'Variante 1, Variante 2',
		},
		{
			code: '002',
			name: 'Producto 2',
			category: 'Categoría 2',
			subCategory: 'Sub Categoría 2',
			provider: 'Proveedor 2',
			variants: 'Variante 1',
		},
	];

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='products-table-container'>
			<Row className='productsTableContainer'>
				<Col md={6}>
					<Form.Group controlId='show' className='searchContainer-select'>
						<Form.Label>{t('productsTable.show')}</Form.Label>
						<Form.Control as='select'>
							<option>10</option>
							<option>25</option>
							<option>50</option>
							<option>100</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group controlId='search' className='searchContainer-input '>
						<Form.Label>{t('productsTable.search')}</Form.Label>
						<Form.Control
							type='text'
							placeholder={t('productsTable.searchPlaceholder')}
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Table striped bordered hover className='productsTable'>
				<thead>
					<tr>
						<th>{t('productsTable.code')}</th>
						<th>{t('productsTable.name')}</th>
						<th>{t('productsTable.category')}</th>
						<th>{t('productsTable.subcategory')}</th>
						<th>{t('productsTable.provider')}</th>
						<th>{t('productsTable.variants')}</th>
						<th>{t('productsTable.edit')}</th>
						<th>{t('productsTable.delete')}</th>
					</tr>
				</thead>
				<tbody>
					{filteredProducts.map((product, index) => (
						<tr key={index}>
							<td>{product.code}</td>
							<td>{product.name}</td>
							<td>{product.category}</td>
							<td>{product.subCategory}</td>
							<td>{product.provider}</td>
							<td>
								<Button variant='warning' className='btnVariabts'>
									{t('productsTable.variants')}
								</Button>
							</td>
							<td>
								<Button variant='warning' className='editButton'>
									<i className='bi bi-pencil-square'></i>
								</Button>
							</td>
							<td>
								<Button variant='danger' className='deleteButton '>
									<i className='bi bi-trash'></i>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default ProductsTable;
