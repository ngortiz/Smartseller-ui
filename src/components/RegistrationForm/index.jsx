import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const RegistrationForm = ({
	productCode,
	productName,
	setProductName,
	productDescription,
	setProductDescription,
	supplier,
	setSupplier,
	tax,
	setTax,
	template,
	setTemplate,
	category,
	subcategory,
	setSubcategory,
	categories,
	subcategories,
	suppliers,
	taxes,
	loadingTemplates,
	loadingCategories,
	templatesData,
	handleGenerateCode,
	handleSubmit,
	handleCategoryChange,
}) => {
	const { t } = useTranslation();

	return (
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
	);
};

RegistrationForm.propTypes = {
	productCode: PropTypes.string.isRequired,
	productName: PropTypes.string.isRequired,
	setProductName: PropTypes.func.isRequired,
	productDescription: PropTypes.string.isRequired,
	setProductDescription: PropTypes.func.isRequired,
	supplier: PropTypes.string.isRequired,
	setSupplier: PropTypes.func.isRequired,
	tax: PropTypes.string.isRequired,
	setTax: PropTypes.func.isRequired,
	template: PropTypes.string.isRequired,
	setTemplate: PropTypes.func.isRequired,
	category: PropTypes.string.isRequired,
	subcategory: PropTypes.string.isRequired,
	setSubcategory: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	subcategories: PropTypes.array.isRequired,
	suppliers: PropTypes.array.isRequired,
	taxes: PropTypes.array.isRequired,
	loadingTemplates: PropTypes.bool.isRequired,
	loadingCategories: PropTypes.bool.isRequired,
	templatesData: PropTypes.object.isRequired,
	handleGenerateCode: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleCategoryChange: PropTypes.func.isRequired,
};

export default RegistrationForm;
