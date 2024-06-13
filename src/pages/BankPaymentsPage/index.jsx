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
import { gql, useQuery } from '@apollo/client';

// Definición de la consulta GraphQL
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

const DiscountByCategoryPage = () => {
	const { t } = useTranslation();
	const { loading, error, data } = useQuery(GET_DISCOUNTS_BY_CATEGORY);

	const [discount, setDiscount] = useState('');
	const [category, setCategory] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [discounts, setDiscounts] = useState([]);

	useEffect(() => {
		if (data) {
			setDiscounts(data.getDiscountByCategory);
		}
	}, [data]);

	const handleUpdate = () => {
		const newDiscount = {
			category,
			discount,
			quantity,
			isChecked,
		};
		setDiscounts([...discounts, newDiscount]);
		setCategory('');
		setDiscount('');
		setQuantity('');
		setIsChecked(false);
	};

	const handleDelete = index => {
		const newDiscounts = discounts.filter((_, i) => i !== index);
		setDiscounts(newDiscounts);
	};

	const handleEdit = index => {
		const discountToEdit = discounts[index];
		setCategory(discountToEdit.category);
		setDiscount(discountToEdit.discount);
		setQuantity(discountToEdit.quantity);
		setIsChecked(discountToEdit.isChecked);
		handleDelete(index);
	};

	if (loading)
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	if (error) return <p>Error: {error.message}</p>;

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
								<option value='category1'>Category 1</option>
								<option value='category2'>Category 2</option>
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
						<Form.Group controlId='formIsChecked' className='form-check-group'>
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
					<Table striped bordered hover className='discount-table'>
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
							{discounts.map((d, index) => (
								<tr key={index}>
									<td>{d.category.name}</td>
									<td>{d.discount}</td>
									<td>{d.amount}</td>
									<td>
										{d.isChecked ? t('discountPage.yes') : t('discountPage.no')}
									</td>
									<td>
										<Button
											variant='info'
											onClick={() => handleEdit(index)}
											className='product-button-edit'
										>
											<i className='bi bi-pencil-square'></i>
										</Button>{' '}
										<Button
											variant='danger'
											onClick={() => handleDelete(index)}
											className='product-button-delete'
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
		</>
	);
};

export default DiscountByCategoryPage;
