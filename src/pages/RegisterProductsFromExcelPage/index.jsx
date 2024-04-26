import React from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './style.css';

const RegisterProductsFromExcelPage = () => {
	return (
		<div className='register-products-page'>
			<header className='page-header'>Ingreso Masivo de Productos</header>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>1- Columnas obligatorias</Card.Title>
							<ul>
								<li>Nombre</li>
								<li>Producto Id</li>
								<li>Internal Code</li>
								<li>Producto Principal</li>
								<li>Descripcion</li>
								<li>Último proveedor</li>
								<li>Total Stock</li>
								<li>Categoria</li>
								<li>Precio 1</li>
								<li>Precio 2</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Tipo de Impuesto</Card.Title>
							<ul>
								<li>Nombre</li>
								<li>IVA10%</li>
								<li>IVA5%</li>
								<li>EXENTA</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title>Categoría Disponible</Card.Title>
							<ul>
								<li>AUTOMOTORES</li>
								<li>BAZAR</li>
								<li>COTILLON</li>
								<li>ELECTRODOMESTICO</li>
								<li>FERRETERIA</li>
								<li>HOGAR</li>
								<li>ILUMINARIAS</li>
								<li>JUGUETERIA</li>
								<li>LIBRERIA</li>
								<li>PLAYAS,CAMPING, OUTDOORS</li>
								<li>ROPERIA</li>
								<li>ACCESORIOS INDUMENTARIAS</li>
								<li>MEGA SHOP</li>
								<li>ELECTRODOMESTICO</li>
								<li>ARTICULOS NAVIDEÑOS</li>
							</ul>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default RegisterProductsFromExcelPage;
