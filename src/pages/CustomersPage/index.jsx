import React, { useState } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	Table,
	Spinner,
	Button,
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';

const GET_USERS_QUERY = gql`
	query getUsers {
		getUsers {
			createdAt
			email
			id
			updatedAt
			username
			ruc
			sign_in_count
		}
	}
`;

const CustomersPage = () => {
	const { t } = useTranslation();
	const [searchTerm, setSearchTerm] = useState('');
	const [showEntries, setShowEntries] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	const { loading, error, data } = useQuery(GET_USERS_QUERY);

	const handleSearchChange = e => {
		setSearchTerm(e.target.value);
	};

	const handleShowEntriesChange = e => {
		setShowEntries(Number(e.target.value));
		setCurrentPage(1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	if (loading) {
		return (
			<Container
				fluid
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<Spinner animation='border' role='status'>
					<span className='sr-only'></span>
				</Spinner>
			</Container>
		);
	}

	if (error) {
		return <p>Error fetching customers: {error.message}</p>;
	}

	const customers = data.getUsers;

	const filteredCustomers = customers.filter(
		customer =>
			customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const indexOfLastCustomer = currentPage * showEntries;
	const indexOfFirstCustomer = indexOfLastCustomer - showEntries;
	const currentCustomers = filteredCustomers.slice(
		indexOfFirstCustomer,
		indexOfLastCustomer,
	);
	const totalPages = Math.ceil(filteredCustomers.length / showEntries);

	return (
		<Container fluid>
			<Row>
				<Col>
					<h1 className='customers-header'>{t('customersPage.client')}</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 className='customers-subheader'>
						{t('customersPage.clientsList')}
					</h2>
				</Col>
			</Row>
			<Row className='customers-controls-container'>
				<Col>
					<Form.Group controlId='showEntries'>
						<Form.Label className='customers-show-label'>Show</Form.Label>
						<Form.Control
							as='select'
							className='customers-select-show'
							value={showEntries}
							onChange={handleShowEntriesChange}
						>
							<option value='1'>1</option>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
							<option value='20'>20</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='search'>
						<Form.Label className='customers-label-search'>
							{t('customersPage.search')}
						</Form.Label>
						<Form.Control
							type='text'
							placeholder='Buscar...'
							value={searchTerm}
							onChange={handleSearchChange}
							className='customers-search-input'
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className='customers-table-container'>
				<Col>
					<Table striped bordered hover className='customers-table'>
						<thead>
							<tr>
								<th>{t('customersPage.user')}</th>
								<th>{t('customersPage.email')}</th>
								<th>{t('customersPage.ruc/CI')}</th>
								<th>{t('customersPage.registrationDate')}</th>
								<th>{t('customersPage.qty.LoginToTheSystem')}</th>
							</tr>
						</thead>
						<tbody>
							{currentCustomers.map((customer, index) => (
								<tr key={index}>
									<td>{customer.username}</td>
									<td>{customer.email}</td>
									<td>{customer.ruc}</td>
									<td>{new Date(customer.createdAt).toLocaleDateString()}</td>
									<td>{customer.sign_in_count}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default CustomersPage;
