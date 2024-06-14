import React, { useState } from 'react';
import { Container, Row, Col, Form, Table, Spinner } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { useTranslation } from 'react-i18next';

const CustomersPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showEntries, setShowEntries] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	const customers = [
		{
			username: 'johndoe',
			email: 'john@example.com',
			ruc_ci: '1234567890',
			registrationDate: '2023-01-01',
			loginCount: 5,
		},
		{
			username: 'janedoe',
			email: 'jane@example.com',
			ruc_ci: '0987654321',
			registrationDate: '2023-02-15',
			loginCount: 10,
		},
		{
			username: 'mikesmith',
			email: 'mike@example.com',
			ruc_ci: '5678901234',
			registrationDate: '2023-03-20',
			loginCount: 7,
		},
	];

	const handleSearchChange = e => {
		setSearchTerm(e.target.value);
	};

	const handleShowEntriesChange = e => {
		setShowEntries(Number(e.target.value));
		setCurrentPage(1);
	};

	const handleNextPage = () => {
		setLoading(true);
		setTimeout(() => {
			if (currentPage < totalPages) {
				setCurrentPage(currentPage + 1);
			}
			setLoading(false);
		}, 1000);
	};

	const handlePreviousPage = () => {
		setLoading(true);
		setTimeout(() => {
			if (currentPage > 1) {
				setCurrentPage(currentPage - 1);
			}
			setLoading(false);
		}, 1000);
	};

	const filteredCustomers = customers.filter(
		customer =>
			customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			customer.ruc_ci.includes(searchTerm),
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
							{loading ? (
								<tr>
									<td colSpan='5' className='text-center'>
										<Spinner animation='border' role='status'>
											<span className='sr-only'>Loading...</span>
										</Spinner>
									</td>
								</tr>
							) : (
								currentCustomers.map((customer, index) => (
									<tr key={index}>
										<td>{customer.username}</td>
										<td>{customer.email}</td>
										<td>{customer.ruc_ci}</td>
										<td>{customer.registrationDate}</td>
										<td>{customer.loginCount}</td>
									</tr>
								))
							)}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default CustomersPage;
