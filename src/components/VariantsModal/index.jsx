import React from 'react';
import { Modal, Button, Table, Form, Container } from 'react-bootstrap';
import './style.css';

const ModalVariants = ({ show, handleClose, product }) => {
	const variants = [
		{
			id: 1,
			image: 'imagen1.jpg',
			description: 'Descripción de la variante 1',
			barcode: '123456789',
			internalCode: 'INT-001',
			specification: 'Especificación de la variante 1',
			priceCost: '$70.00',
			salePrice: '$50.00',
			amount: '10',
			published: 'Si',
			inOffer: 'No',
		},
		{
			id: 2,
			image: 'imagen2.jpg',
			description: 'Descripción de la variante 2',
			barcode: '987654321',
			internalCode: 'INT-002',
			specification: '',
			priceCost: '$70.00',
			salePrice: '$50.00',
			amount: '10',
			published: 'Si',
			inOffer: 'No',
		},
		// Agregar más variantes según sea necesario
	];

	const handleSearch = e => {
		// Implementar la lógica de búsqueda si es necesario
	};

	return (
		<Container>
			<Modal show={show} onHide={handleClose} size='xl'>
				<Modal.Header closeButton>
					<Modal.Title>Variantes del Producto</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='modal-variants'>
						<div className='searchContainer'>
							<Form.Group
								controlId='showEntries'
								className='searchContainer-select'
							>
								<Form.Label>Mostrar entradas</Form.Label>
								<Form.Control as='select'>
									<option>10</option>
									<option>25</option>
									<option>50</option>
									<option>100</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId='search' className='searchContainer-input'>
								<Form.Label>Buscar</Form.Label>
								<Form.Control
									type='text'
									placeholder='Ingrese término de búsqueda'
									onChange={handleSearch}
								/>
							</Form.Group>
						</div>
						<Table striped bordered hover className='variantsModal'>
							<thead>
								<tr>
									<th>Imagen</th>
									<th>Descripción</th>
									<th>Código de Barras</th>
									<th>Código Interno</th>
									<th>Especificación</th>
									<th>Precio Costo</th>
									<th>Precio Venta</th>
									<th>Cantidad</th>
									<th>Publicado</th>
									<th>En Oferta</th>
								</tr>
							</thead>
							<tbody>
								{variants.map(variant => (
									<tr key={variant.id}>
										<td>{variant.image}</td>
										<td>{variant.description}</td>
										<td>{variant.barcode}</td>
										<td>{variant.internalCode}</td>
										<td>{variant.specification}</td>
										<td>{variant.priceCost}</td>
										<td>{variant.salePrice}</td>
										<td>{variant.amount}</td>
										<td>{variant.published}</td>
										<td>{variant.inOffer}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</Modal.Body>
			</Modal>
		</Container>
	);
};

export default ModalVariants;
