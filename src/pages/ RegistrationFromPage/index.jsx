import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const RegistrationFormPage = () => {
	const { t } = useTranslation();
	const [productCode, setProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [supplier, setSupplier] = useState('');
	const [tax, setTax] = useState('');
	const [payroll, setPayroll] = useState('');
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');

	const suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
	const taxes = ['IVA 10%1', 'IVA5%', 'EXENTA'];
	const payrolls = ['Planilla 1', 'Planilla 2', 'Planilla 3'];
	const categories = ['Category 1', 'Category 2', 'Category 3'];
	const subcategories = ['Subcategory 1', 'Subcategory 2', 'Subcategory 3'];

	const handleGenerateCode = () => {
		setProductCode(`P${Math.floor(Math.random() * 10000)}`);
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
			<Row>
				<Col>
					<header className='registration-form-title'>
						Registrar producto y sus variantes
					</header>
				</Col>
			</Row>
			<Container fluid className='registration-form-container'>
				<Row>
					<Col>
						<h2 className='registration-form-subtitle'>
							Datos Generales del Producto
						</h2>
					</Col>
				</Row>
				<Form onSubmit={handleSubmit}>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									Código:*
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
										Generar
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
					<Row className='registration-form-row'>
						<Col md={6}>
							<Form.Group className='registration-form-group'>
								<Form.Label className='registration-form-label'>
									Nombre:*
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
									Descripción:*
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
									Proveedor:*
								</Form.Label>
								<Form.Select
									value={supplier}
									onChange={e => setSupplier(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value=''>Seleccione un proveedor</option>
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
									Impuesto:*
								</Form.Label>
								<Form.Select
									value={tax}
									onChange={e => setTax(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value=''>Seleccione un impuesto</option>
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
									Planilla:*
								</Form.Label>
								<Form.Select
									value={payroll}
									onChange={e => setPayroll(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value=''>Seleccione una planilla</option>
									{payrolls.map((payroll, index) => (
										<option key={index} value={payroll}>
											{payroll}
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
									Categoría:*
								</Form.Label>
								<Form.Select
									value={category}
									onChange={e => setCategory(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value=''>Seleccione una categoría</option>
									{categories.map((category, index) => (
										<option key={index} value={category}>
											{category}
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
									Subcategoría:*
								</Form.Label>
								<Form.Select
									value={subcategory}
									onChange={e => setSubcategory(e.target.value)}
									required
									className='registration-form-select'
								>
									<option value=''>Seleccione una subcategoría</option>
									{subcategories.map((subcategory, index) => (
										<option key={index} value={subcategory}>
											{subcategory}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</Container>
		</>
	);
};

export default RegistrationFormPage;
