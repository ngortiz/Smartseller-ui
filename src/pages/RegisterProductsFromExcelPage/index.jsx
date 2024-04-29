import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './style.css';

const RegisterProductsFromExcelPage = () => {
	const handleUpload = () => {};
	return (
		<div className='unique-register-products-page'>
			<header className='unique-page-header'>
				Ingreso Masivo de Productos
			</header>
			<Form className='unique-form'>
				<Form.Group controlId='formExcelFile' className='mb-3'>
					<Form.Label>Seleccionar archivo de Excel</Form.Label>
					<Form.Control type='file' accept='.xlsx, .xls' />
				</Form.Group>
				<Form.Group controlId='formZipFile' className='mb-3'>
					<Form.Label>Seleccionar archivo ZIP</Form.Label>
					<Form.Control type='file' accept='.zip' />
				</Form.Group>
			</Form>
			<Button
				variant='primary'
				onClick={handleUpload}
				className='unique-button'
			>
				Cargar
			</Button>
			<Row>
				<Col>
					<header className='unique-subHeard'>Columnas obligatorias</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>Nombre</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>Producto Id</li>
								<li className='unique-list-item'>Internal Code</li>
								<li className='unique-list-item'>Producto Principal</li>
								<li className='unique-list-item'>Descripcion</li>
								<li className='unique-list-item'>Último proveedor</li>
								<li className='unique-list-item'>Total Stock</li>
								<li className='unique-list-item'>Categoria</li>
								<li className='unique-list-item'>Precio 1</li>
								<li className='unique-list-item'>Precio 2</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<header className='unique-subHeard'>
						Tipo de Impuestos Disponibles
					</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>Nombre</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>IVA10%</li>
								<li className='unique-list-item'>IVA5%</li>
								<li className='unique-list-item'>EXENTA</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<header className='unique-subHeard'>Categoria Disponibles</header>
					<Card className='unique-card'>
						<Card.Body>
							<Card.Title className='unique-card-title'>Nombre</Card.Title>
							<ul className='unique-list'>
								<li className='unique-list-item'>AUTOMOTORES</li>
								<li className='unique-list-item'>BAZAR</li>
								<li className='unique-list-item'>COTILLON</li>
								<li className='unique-list-item'>ELECTRODOMESTICO</li>
								<li className='unique-list-item'>FERRETERIA</li>
								<li className='unique-list-item'>HOGAR</li>
								<li className='unique-list-item'>ILUMINARIAS</li>
								<li className='unique-list-item'>JUGUETERIA</li>
								<li className='unique-list-item'>LIBRERIA</li>
								<li className='unique-list-item'>PLAYAS,CAMPING, OUTDOORS</li>
								<li className='unique-list-item'>ROPERIA</li>
								<li className='unique-list-item'>ACCESORIOS INDUMENTARIAS</li>
								<li className='unique-list-item'>MEGA SHOP</li>
								<li className='unique-list-item'>ELECTRODOMESTICO</li>
								<li className='unique-list-item'>ARTICULOS NAVIDEÑOS</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default RegisterProductsFromExcelPage;
