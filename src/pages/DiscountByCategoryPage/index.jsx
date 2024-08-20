import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Table,
} from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, gql } from '@apollo/client';

// Define your queries and mutations
const GET_DISCOUNTS_BY_CATEGORY = gql`
	query GetDiscountByCategory {
		getDiscountByCategory {
			amount
			discount
			id
			enabled
			category {
				name
				id
			}
		}
	}
`;

const GET_CATEGORIES = gql`
	query GetCategories {
		getCategories {
			name
			id
		}
	}
`;

const CREATE_DISCOUNT_BY_CATEGORY_MUTATION = gql`
	mutation CreateDiscountByCategory(
		$discount: Float!
		$amount: Int!
		$enabled: Boolean!
		$categoryId: Int!
	) {
		createDiscountByCategory(
			discountByCategory: {
				discount: $discount
				amount: $amount
				categoryId: $categoryId
				enabled: $enabled
			}
		) {
			id
			discount
			amount
		}
	}
`;

const DELETE_DISCOUNT_BY_CATEGORY_MUTATION = gql`
	mutation DeleteDiscountByCategory($id: Int!) {
		deleteDiscountByCategory(discountByCategory: { id: $id })
	}
`;

const UPDATE_DISCOUNT_BY_CATEGORY_MUTATION = gql`
	mutation UpdateDiscountByCategory(
		$id: Int!
		$discount: Float!
		$amount: Int!
		$enabled: Boolean!
		$categoryId: Int!
	) {
		updateDiscountByCategory(
			discountByCategory: {
				id: $id
				discount: $discount
				amount: $amount
				categoryId: $categoryId
				enabled: $enabled
			}
		) {
			id
			discount
			amount
			enabled
			category {
				id
				name
			}
		}
	}
`;

const DiscountByCategoryPage = () => {
	const { t } = useTranslation();
	const [discount, setDiscount] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [selectedDiscountId, setSelectedDiscountId] = useState(null);

	const { loading: loadingDiscounts, data: discountsData } = useQuery(
		GET_DISCOUNTS_BY_CATEGORY,
	);
	const { loading: loadingCategories, data: categoriesData } =
		useQuery(GET_CATEGORIES);

	const [createDiscountByCategory] = useMutation(
		CREATE_DISCOUNT_BY_CATEGORY_MUTATION,
		{
			refetchQueries: [{ query: GET_DISCOUNTS_BY_CATEGORY }],
		},
	);

	const [deleteDiscountByCategory] = useMutation(
		DELETE_DISCOUNT_BY_CATEGORY_MUTATION,
		{
			refetchQueries: [{ query: GET_DISCOUNTS_BY_CATEGORY }],
		},
	);

	const [updateDiscountByCategory] = useMutation(
		UPDATE_DISCOUNT_BY_CATEGORY_MUTATION,
		{
			refetchQueries: [{ query: GET_DISCOUNTS_BY_CATEGORY }],
		},
	);

	const [discounts, setDiscounts] = useState([]);

	useEffect(() => {
		if (discountsData && discountsData.getDiscountByCategory) {
			setDiscounts(discountsData.getDiscountByCategory);
		}
	}, [discountsData]);

	const handleSave = async () => {
		try {
			if (selectedDiscountId) {
				// Update existing discount
				await updateDiscountByCategory({
					variables: {
						id: selectedDiscountId,
						discount: parseFloat(discount),
						amount: parseInt(quantity),
						categoryId: parseInt(category),
						enabled: isChecked,
					},
				});
			} else {
				// Create new discount
				await createDiscountByCategory({
					variables: {
						discount: parseFloat(discount),
						amount: parseInt(quantity),
						categoryId: parseInt(category),
						enabled: isChecked,
					},
				});
			}

			setCategory('');
			setDiscount('');
			setQuantity('');
			setIsChecked(false);
			setSelectedDiscountId(null);
		} catch (error) {
			console.error('Error saving discount by category:', error);
		}
	};

	const handleDelete = async id => {
		try {
			await deleteDiscountByCategory({ variables: { id } });
		} catch (error) {
			console.error('Error deleting discount by category:', error);
		}
	};

	const handleEdit = id => {
		const discountToEdit = discounts.find(d => d.id === id);
		if (discountToEdit) {
			setCategory(discountToEdit.category.id);
			setDiscount(discountToEdit.discount);
			setQuantity(discountToEdit.amount);
			setIsChecked(discountToEdit.enabled);
			setSelectedDiscountId(discountToEdit.id);
		}
	};

	console.log(discounts);
	return (
		<>
			<Row className='category-discount-header'>
				<Col>
					<h1 className='category-discount-header'>
						{t('discountPage.discountByCategory')}
					</h1>
				</Col>
			</Row>
			<Container className='category-discount-container'>
				{loadingDiscounts || loadingCategories ? (
					<div className='spinner-container'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<>
						<Row className='category-discount-subheader'>
							<Col>
								<h2 className='category-discount-subheader'>
									{t('discountPage.enterDiscountPerCategory')}
								</h2>
							</Col>
						</Row>
						<Row className='category-discount-form align-items-center'>
							<Col md={3}>
								<Form.Group controlId='formCategory'>
									<Form.Label>{t('discountPage.category')}</Form.Label>
									<Form.Select
										aria-label={t('discountPage.selectCategory')}
										value={category}
										onChange={e => setCategory(e.target.value)}
										className='category-discount-category'
									>
										<option value=''>{t('discountPage.selectCategory')}</option>
										{categoriesData?.getCategories?.map(cat => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={2}>
								<Form.Group controlId='formDiscount'>
									<Form.Label>{t('discountPage.discount')}</Form.Label>
									<Form.Control
										type='number'
										value={discount}
										onChange={e => setDiscount(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={2}>
								<Form.Group controlId='formQuantity'>
									<Form.Label>{t('discountPage.amount')}</Form.Label>
									<Form.Control
										type='number'
										value={quantity}
										onChange={e => setQuantity(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col md={2} className='align-self-center'>
								<Form.Group
									controlId='formIsChecked'
									className='form-check-group'
								>
									<Form.Label className='form-check-label'>
										{t('discountPage.enable')}
									</Form.Label>
									<Form.Check
										type='checkbox'
										checked={isChecked}
										onChange={e => setIsChecked(e.target.checked)}
										className='discount-check-input'
									/>
								</Form.Group>
							</Col>
							<Col md={3} className='align-self-end'>
								<Button onClick={handleSave} className='update-button'>
									{t('discountPage.save')}
								</Button>
							</Col>
						</Row>
						<Row>
							<Table hover className='discount-table'>
								<thead>
									<tr>
										<th>{t('discountPage.category')}</th>
										<th>{t('discountPage.discount')}</th>
										<th>{t('discountPage.amount')}</th>
										<th>{t('discountPage.enable')}</th>
										<th>{t('discountPage.actions')}</th>
									</tr>
								</thead>
								<tbody>
									{discounts.map(d => (
										<tr key={d.id}>
											<td>{d.category?.name}</td>
											<td>{d.discount}</td>
											<td>{d.amount}</td>
											<td>
												{d.enabled
													? t('discountPage.yes')
													: t('discountPage.no')}
											</td>
											<td>
												<Button
													variant='info'
													onClick={() => handleEdit(d.id)}
													className='product-button-edit'
												>
													<i className='bi bi-pencil-square'></i>
												</Button>
												<Button
													className='product-button-delete'
													variant='danger'
													onClick={() => handleDelete(d.id)}
												>
													<i className='bi bi-trash3'></i>
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default DiscountByCategoryPage;
