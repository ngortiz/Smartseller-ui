import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Table,
	Alert,
} from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCalendar } from 'react-icons/bi';
import { useQuery, useMutation, gql } from '@apollo/client';

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

const GET_USERS_QUERY = gql`
	query getUsers {
		getUsers {
			createdAt
			email
			id
			updatedAt
			username
		}
	}
`;

const CREATE_COUPON_MUTATION = gql`
	mutation createCoupon(
		$discount: Float!
		$expiration: AWSDateTime!
		$userId: Int!
	) {
		createCoupon(
			coupon: { discount: $discount, expiration: $expiration, userId: $userId }
		) {
			discount
			expiration
			used
			code
		}
	}
`;

const DiscountByCouponsPage = () => {
	const { t } = useTranslation();
	const [client, setClient] = useState('');
	const [discount, setDiscount] = useState('');
	const [expirationDate, setExpirationDate] = useState(new Date());
	const [coupons, setCoupons] = useState([]);
	const [notification, setNotification] = useState('');
	const [notificationType, setNotificationType] = useState('success');

	const {
		loading: couponsLoading,
		error: couponsError,
		data: couponsData,
	} = useQuery(GET_COUPONS_QUERY);

	const {
		loading: usersLoading,
		error: usersError,
		data: usersData,
	} = useQuery(GET_USERS_QUERY);

	const [createCoupon, { loading: createLoading, error: createError }] =
		useMutation(CREATE_COUPON_MUTATION, {
			refetchQueries: [{ query: GET_COUPONS_QUERY }],
		});

	useEffect(() => {
		if (couponsData) {
			setCoupons(couponsData.getCoupons);
		}
	}, [couponsData]);

	const clients = usersData ? usersData.getUsers : [];

	const handleUpdate = async () => {
		try {
			const parsedDiscount = parseFloat(discount);
			if (isNaN(parsedDiscount)) {
				throw new Error('El descuento debe ser un número válido.');
			}

			const today = new Date();
			if (expirationDate < today.setHours(0, 0, 0, 0)) {
				throw new Error(
					'La fecha de expiración debe ser igual o posterior a hoy.',
				);
			}

			const { data } = await createCoupon({
				variables: {
					discount: parsedDiscount,
					expiration: expirationDate.toISOString(),
					userId: parseInt(client),
				},
			});

			const newCoupon = {
				user: clients.find(c => c.id === parseInt(client)),
				discount: data.createCoupon.discount,
				expiration: data.createCoupon.expiration,
				used: data.createCoupon.used,
				code: data.createCoupon.code,
			};

			setCoupons([...coupons, newCoupon]);
			setClient('');
			setDiscount('');
			setExpirationDate(new Date());

			setNotification(t('Se ha guardado con éxito'));
			setNotificationType('success');
		} catch (error) {
			console.error('Error creating coupon:', error);
			setNotification(error.message);
			setNotificationType('danger');
		}
	};

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification('');
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const handleDelete = index => {
		const newCoupons = coupons.filter((_, i) => i !== index);
		setCoupons(newCoupons);
	};

	const handleEdit = index => {
		const couponToEdit = coupons[index];
		setClient(couponToEdit.user.id.toString());
		setDiscount(couponToEdit.discount);
		setExpirationDate(new Date(couponToEdit.expiration));
		handleDelete(index);
	};

	const handleClientChange = e => {
		setClient(e.target.value);
	};

	const handleExpirationDateChange = date => {
		setExpirationDate(date);
	};

	return (
		<>
			{notification && (
				<Alert variant={notificationType} className='notification'>
					{notification}
				</Alert>
			)}
			<Row>
				<Col>
					<header className='coupons-discount-header'>
						{t('discountByCoupons.discountCoupons')}
					</header>
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
										<option key={index} value={client.id}>
											{client.username}
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
							<BiCalendar className='bi-bi-calendar' />
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
						<Table hover className='discount-table'>
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
								{couponsLoading ? (
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
