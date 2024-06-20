import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import './style.css';

const GET_CATEGORIES_QUERY = gql`
	query GetCategories {
		getCategories {
			id
			name
			subCategories {
				id
				name
			}
		}
	}
`;

const GET_TEMPLATES_QUERY = gql`
	query GetTemplates {
		getTemplates {
			format
			id
			name
		}
	}
`;

const RegistrationFormPage = () => {
	const { t } = useTranslation();
	const [productCode, setProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [supplier, setSupplier] = useState('');
	const [tax, setTax] = useState('');
	const [template, setTemplates] = useState('');
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
	const taxes = ['IVA 10%', 'IVA 5%', 'EXENTA'];

	const { loading: loadingCategories, data: categoriesData } =
		useQuery(GET_CATEGORIES_QUERY);

	const { loading: loadingTemplates, data: templatesData } =
		useQuery(GET_TEMPLATES_QUERY);

	useEffect(() => {
		if (categoriesData) {
			setCategories(categoriesData.getCategories);
		}
	}, [categoriesData]);

	useEffect(() => {
		if (templatesData) {
			setTemplates(templatesData.getTemplates);
		}
	}, [templatesData]);

	const handleGenerateCode = () => {
		setProductCode(`P${Math.floor(Math.random() * 10000)}`);
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	const handleCategoryChange = e => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
		const selectedCategoryData = categories.find(
			cat => cat.id === selectedCategory,
		);
		setSubcategories(
			selectedCategoryData ? selectedCategoryData.subCategories : [],
		);
		setSubcategory('');
	};

	return (
		<>
			<Row>
				<Col>
					<header className='registration-form-title'>
						{t('registrationPage.registerProducAndVariants')}
					</header>
				</Col>
			</Row>
			<Container fluid className='registration-form-container'>
				<Row>
					<Col>
						<h2 className='registration-form-subtitle'>
							{t('registrationPage.generalProductData')}
						</h2>
					</Col>
				</Row>
				<Form onSubmit={handleSubmit}>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.code')}:*
								</Form.Label>
								<div className='d-flex'>
									<Form.Control
										type='text'
										value={productCode}
										readOnly
										className='registration-form-input'
									/>
									<Button
										variant='primary'
										onClick={handleGenerateCode}
										className='registration-form-button'
									>
										{t('registrationPage.generar')}
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.name')}:*
								</Form.Label>
								<Form.Control
									type='text'
									value={productName}
									onChange={e => setProductName(e.target.value)}
									required
									className='registration-form-input'
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.description')}:*
								</Form.Label>
								<Form.Control
									as='textarea'
									rows={3}
									value={productDescription}
									onChange={e => setProductDescription(e.target.value)}
									required
									className='registration-form-input'
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.supplier')}:*
								</Form.Label>
								<Form.Select
									value={supplier}
									onChange={e => setSupplier(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value='' className='label-registration-select'>
										{t('registrationPage.select')}
									</option>
									{suppliers.map((supplier, index) => (
										<option key={index} value={supplier}>
											{supplier}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.tax')}:*
								</Form.Label>
								<Form.Select
									value={tax}
									onChange={e => setTax(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value='' className='label-registration-select'>
										{t('registrationPage.select')}
									</option>
									{taxes.map((tax, index) => (
										<option key={index} value={tax}>
											{tax}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.template')}:*
								</Form.Label>
								{loadingTemplates ? (
									<Spinner animation='border' />
								) : (
									<Form.Select
										value={template}
										onChange={e => setTemplate(e.target.value)}
										required
										className='registration-form-select'
									>
										<option value='' className='label-registration-select'>
											{t('registrationPage.selectTemplate')}
										</option>
										{templatesData.getTemplates.map(template => (
											<option key={template.id} value={template.id}>
												{template.name}
											</option>
										))}
									</Form.Select>
								)}
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.category')}:*
								</Form.Label>
								{loadingCategories ? (
									<Spinner animation='border' />
								) : (
									<Form.Select
										value={category}
										onChange={handleCategoryChange}
										required
										className='registration-form-select'
									>
										<option value='' className='label-registration-select'>
											{t('registrationPage.selectCategory')}
										</option>
										{categories.map(category => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</Form.Select>
								)}
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									{t('registrationPage.subCategory')}:*
								</Form.Label>
								{loadingCategories ? (
									<Spinner animation='border' />
								) : (
									<Form.Select
										value={subcategory}
										onChange={e => setSubcategory(e.target.value)}
										required
										className='registration-form-select'
									>
										<option value='' className='label-registration-select'>
											{t('registrationPage.selectSubCategory')}
										</option>
										{subcategories.map(subcategory => (
											<option key={subcategory.id} value={subcategory.id}>
												{subcategory.name}
											</option>
										))}
									</Form.Select>
								)}
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default RegistrationFormPage;
