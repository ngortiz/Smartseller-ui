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

const GET_DISCOUNTS_BY_CATEGORY = gql`
	query GetDiscountByCategory {
		getDiscountByCategory {
			amount
			discount
			id
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

const DiscountByCategoryPage = () => {
	const { t } = useTranslation();
	const [discount, setDiscount] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isChecked, setIsChecked] = useState(false);
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

	const [discounts, setDiscounts] = useState([]);

	useEffect(() => {
		if (discountsData && discountsData.getDiscountByCategory) {
			setDiscounts(discountsData.getDiscountByCategory);
		}
	}, [discountsData]);

	const handleUpdate = async () => {
		try {
			const newDiscount = {
				discount: parseFloat(discount),
				amount: parseInt(quantity),
				categoryId: parseInt(category),
				enabled: isChecked,
			};

			console.log('Sending mutation with data:', newDiscount);

			const { data } = await createDiscountByCategory({
				variables: newDiscount,
			});

			if (data) {
				setDiscounts([...discounts, data.createDiscountByCategory]);
			}

			setCategory('');
			setDiscount('');
			setQuantity('');
			setIsChecked(false);
		} catch (error) {
			console.error('Error creating discount by category:', error);
			console.error('GraphQL errors:', error.graphQLErrors);
			console.error('Network error:', error.networkError);
			console.error('Message:', error.message);
		}
	};

	const handleDelete = id => {
		const newDiscounts = discounts.filter(d => d.id !== id);
		setDiscounts(newDiscounts);
	};

	const handleEdit = id => {
		const discountToEdit = discounts.find(d => d.id === id);
		if (discountToEdit) {
			setCategory(discountToEdit.category.id);
			setDiscount(discountToEdit.discount);
			setQuantity(discountToEdit.amount);
			setIsChecked(discountToEdit.enabled);
			handleDelete(id);
		}
	};

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
								<Button onClick={handleUpdate} className='update-button'>
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
