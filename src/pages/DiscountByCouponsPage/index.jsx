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
import { useTranslation } from 'react-i18next';
import { format, subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { useQuery, gql } from '@apollo/client';
import './style.css';

const GET_COUPONS_QUERY = gql`
	query getCoupons {
		getCoupons {
			code
			createdAt
			discount
			expiration
			id
			updatedAt
			used
			user {
				createdAt
				email
				id
				updatedAt
				username
			}
		}
	}
`;

const DiscountByCouponsPage = () => {
	const { t } = useTranslation();
	const [client, setClient] = useState('');
	const [discount, setDiscount] = useState('');
	const [expirationDate, setExpirationDate] = useState(
		subMonths(new Date(), 1),
	);
	const [coupons, setCoupons] = useState([]);
	const { loading, error, data } = useQuery(GET_COUPONS_QUERY);

	const clients = [
		{ name: 'Client 1', email: 'client1@example.com' },
		{ name: 'Client 2', email: 'client2@example.com' },
		{ name: 'Client 3', email: 'client3@example.com' },
	];

	useEffect(() => {
		if (data) {
			setCoupons(data.getCoupons);
		}
	}, [data]);

	const handleUpdate = () => {
		const newCoupon = {
			client,
			email: 'nana@gmail.com',
			used: false,
			expirationDate,
			discount,
			code: 9999,
			category: 'Category 1',
		};
		setCoupons([...coupons, newCoupon]);
		setClient('');
		setDiscount('');
		setExpirationDate(subMonths(new Date(), 1));
	};

	const handleDelete = index => {
		const newCoupons = coupons.filter((_, i) => i !== index);
		setCoupons(newCoupons);
	};

	const handleEdit = index => {
		const couponToEdit = coupons[index];
		setClient(couponToEdit.user.username);
		setDiscount(couponToEdit.discount);
		setExpirationDate(new Date(couponToEdit.expiration));
		handleDelete(index);
	};

	const handleClientChange = e => {
		const selectedClient = clients.find(
			client => client.name === e.target.value,
		);
		setClient(selectedClient.name);
	};

	const handleExpirationDateChange = date => {
		setExpirationDate(date);
	};

	return (
		<>
			<Row className='coupons-discount-header'>
				<Col>
					<h1 className='category-discount-header'>
						{t('discountByCoupons.discountCoupons')}
					</h1>
				</Col>
			</Row>
			<Container className='coupons-discount-container'>
				<>
					<Row className='coupons-discount-subheader'>
						<Col>
							<h2 className='category-discount-subheader'>
								{t('discountByCoupons.uniqueCouponsForCustomers')}
							</h2>
						</Col>
					</Row>
					<Row className='coupons-discount-form align-items-center'>
						<Col md={3}>
							<Form.Group controlId='formClient'>
								<Form.Select
									value={client}
									onChange={handleClientChange}
									className='coupons-discount-select'
								>
									<option value=''>
										{t('discountByCoupons.selectClient')}
									</option>
									{clients.map((client, index) => (
										<option key={index} value={client.name}>
											{client.name}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group controlId='formDiscount'>
								<Form.Control
									type='number'
									value={discount}
									onChange={e => setDiscount(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col md={2} className='d-flex align-items-center'>
							<BiCalendar className='bi-bi-calendar3' />
							<DatePicker
								selected={expirationDate}
								onChange={handleExpirationDateChange}
								className='form-control'
								dateFormat='yyyy-MM-dd'
							/>
						</Col>
						<Col md={1} className='align-self-end'>
							<Button onClick={handleUpdate} className='update-button'>
								{t('discountByCoupons.generar')}
							</Button>
						</Col>
					</Row>
					<Row>
						<Table striped bordered hover className='discount-table'>
							<thead>
								<tr>
									<th>{t('discountByCoupons.client')}</th>
									<th>{t('discountByCoupons.email')}</th>
									<th>{t('discountByCoupons.used')}</th>
									<th>{t('discountByCoupons.expirationDate')}</th>
									<th>{t('discountByCoupons.discount')}</th>
									<th>{t('discountByCoupons.code')}</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan='6' className='text-center'>
											<Spinner animation='border' role='status'>
												<span className='visually-hidden'>Loading...</span>
											</Spinner>
										</td>
									</tr>
								) : (
									coupons.map((c, index) => (
										<tr key={index}>
											<td>{c.user ? c.user.username : 'N/A'}</td>
											<td>{c.user ? c.user.email : 'N/A'}</td>
											<td>
												{c.used
													? t('discountByCoupons.yes')
													: t('discountByCoupons.no')}
											</td>
											<td>{format(new Date(c.expiration), 'yyyy-MM-dd')}</td>
											<td>{c.discount}</td>
											<td>{c.code}</td>
										</tr>
									))
								)}
							</tbody>
						</Table>
					</Row>
				</>
			</Container>
		</>
	);
};

export default DiscountByCouponsPage;
