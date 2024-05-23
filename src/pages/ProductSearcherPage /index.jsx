import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_CATEGORIES_QUERY = gql`
	query GetCategories {
		getCategories {
			name
			id
		}
	}
`;

const SEARCH_QUERY = gql`
	query SearchQuery(
		$offset: Int!
		$limit: Int!
		$published: Boolean!
		$internalCode: String
		$barcode: String
		$description: String
		$categoryId: Int
	) {
		searchProductVariants(
			offset: $offset
			limit: $limit
			published: $published
			internalCode: $internalCode
			barcode: $barcode
			description: $description
			categoryId: $categoryId
		) {
			count
			rows {
				id
				name
				internalCode
				offered
				product {
					id
					name
					code
					description
					subCategory {
						id
						name
					}
					category {
						id
						name
					}
				}
				productAttributes
				published
				sellPrice
				updatedAt
				createdAt
				costPrice
				code
				amount
			}
		}
	}
`;

const ProductSearcherPage = () => {
	const [internalCode, setInternalCode] = useState('');
	const [barcode, setBarcode] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [checked, setChecked] = useState(true);
	const { t } = useTranslation();
	const [products, setProducts] = useState([]);

	const {
		loading: categoriesLoading,
		error: categoriesError,
		data: categoriesData,
	} = useQuery(GET_CATEGORIES_QUERY);

	const [searchProducts, { loading: searchLoading, data: searchData }] =
		useLazyQuery(SEARCH_QUERY);

	useEffect(() => {
		if (categoriesData && categoriesData.getCategories) {
			setCategory('');
		}
	}, [categoriesData]);

	useEffect(() => {
		if (searchData && searchData.searchProductVariants) {
			setProducts(searchData.searchProductVariants.rows);
		}
	}, [searchData]);

	const handleSearch = () => {
		const variables = {
			offset: 0,
			limit: 25,
			published: checked,
			internalCode: internalCode || undefined,
			barcode: barcode || undefined,
			description: description || undefined,
			categoryId: category ? parseInt(category) : undefined,
		};

		searchProducts({ variables });

		setInternalCode('');
		setBarcode('');
		setDescription('');
		setCategory('');
		setChecked(false);
	};

	const handleEditProduct = productId => {};

	const handleDeleteProduct = productId => {};

	const getColorAttribute = attributes => {
		return Object.entries(JSON.parse(attributes)).map(
			([attributeName, attributeValue], index) => {
				if (attributeValue.length > 0) {
					return (
						<div key={index}>
							<strong>{attributeName}:</strong>
							{attributeValue}
							<br></br>
						</div>
					);
				}
			},
		);
	};

	return (
		<Container id='product-searcher-page'>
			<Row className='mt-4'>
				<header className='product-header'>
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

				<Form.Group as={Col} controlId='formCategory'>
					<Form.Label>{t('productSearcherPage.categories')}:</Form.Label>
					<Form.Select
						aria-label={t('productSearcherPage.category')}
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='product-form-select'
					>
						{categoriesLoading ? (
							<option>{t('productSearcherPage.loading')}</option>
						) : (
							<>
								<option value=''>{t('productSearcherPage.select')}...</option>
								{categoriesData &&
									categoriesData.getCategories.map(category => (
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
					className='product-form-input'
				>
					<Form.Check
						type='checkbox'
						label={t('productSearcherPage.post')}
						checked={checked}
						onChange={e => setChecked(e.target.checked)}
						className='product-check-input'
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
				<Table striped bordered hover className='product-table'>
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
						{searchLoading ? (
							<tr>
								<td colSpan='14'>{t('productSearcherPage.loading')}</td>
							</tr>
						) : (
							products.map(variant => (
								<tr key={variant.id}>
									<td>{variant.product.code}</td>
									<td>{variant.internalCode}</td>
									<td>{variant.code}</td>
									<td>{variant.product.name}</td>
									<td>{variant.name}</td>
									<td>{variant.amount}</td>
									<td>{variant.product?.category?.name || ''}</td>
									<td>{variant.product?.subCategory?.name || ''}</td>
									<td>US$ {variant.costPrice}</td>
									<td>US$ {variant.sellPrice}</td>
									<td>{variant.offered ? 'Sí' : 'No'}</td>
									<td>{getColorAttribute(variant.productAttributes)}</td>
									<td>
										<Button
											variant='info'
											onClick={() => handleEditProduct(variant.id)}
											className='product-button-edit'
										>
											<i className='bi bi-pencil-square'></i>
										</Button>
									</td>
									<td>
										<Button
											className='product-button-delete'
											variant='danger'
											onClick={() => handleDeleteProduct(variant.id)}
										>
											<i className='bi bi-trash3'></i>
										</Button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default ProductSearcherPage;
