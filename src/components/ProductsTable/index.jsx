import React, { useState, useEffect } from 'react';
import { Table, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import VariantsModal from '../../components/VariantsModal';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './style.css';

const GET_PRODUCTS_QUERY = gql`
	query GetProducts($limit: Int!, $offset: Int!) {
		getProducts(limit: $limit, offset: $offset) {
			count
			rows {
				category {
					id
					name
				}
				code
				id
				name
				provider {
					id
					name
				}
				subCategory {
					name
					id
				}
			}
		}
	}
`;

const ProductsTable = () => {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const offset = (page - 1) * limit;

	const { loading, data, refetch } = useQuery(GET_PRODUCTS_QUERY, {
		variables: { limit, offset },
	});

	const handleShowModal = product => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedProduct(null);
	};

	const handleLimitChange = e => {
		const newLimit = Number(e.target.value);
		setLimit(newLimit);
		setPage(1);
	};

	const products = data?.getProducts?.rows || [];
	const count = data?.getProducts?.count || 0;

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='products-table-container'>
			<Row className='productsTableContainer'>
				<Col md={6}>
					<Form.Group controlId='show' className='searchContainer-select'>
						<Form.Label>{t('productsTable.show')}</Form.Label>
						<Form.Control
							as='select'
							value={limit}
							onChange={handleLimitChange}
						>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group controlId='search' className='searchContainer-input'>
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
			{loading ? (
				<div className='spinner-container'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : (
				<>
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
									<td>{product.category.name}</td>
									<td>{product.subCategory.name}</td>
									<td>{product.provider.name}</td>
									<td>
										<Button
											variant='warning'
											className='btnVariabts'
											onClick={() => handleShowModal(product)}
										>
											{t('productsTable.variants')}
										</Button>
									</td>
									<td>
										<Button variant='warning' className='editButton'>
											<i className='bi bi-pencil-square'></i>
										</Button>
									</td>
									<td>
										<Button variant='danger' className='deleteButton'>
											<i className='bi bi-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					<PaginationControl
						page={page}
						between={4}
						total={count}
						limit={limit}
						changePage={setPage}
						ellipsis={1}
					/>
				</>
			)}

			{selectedProduct && (
				<VariantsModal
					show={showModal}
					handleClose={handleCloseModal}
					product={selectedProduct}
				/>
			)}
		</div>
	);
};

export default ProductsTable;
