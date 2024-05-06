import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './style.css';

const ProductSearcherPage = () => {
	const [internalCode, setInternalCode] = useState('');
	const [barcode, setBarcode] = useState('');
	const [description, setDescription] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [checked, setChecked] = useState(false);
	const [products, setProducts] = useState([
		{
			id: 1,
			productCode: 'PROD001',
			internalCode: 'INT001',
			barcode: '123456789',
			mainProduct: 'Producto 2',
			description: '',
			stock: 100,
			category: 'Categoria',
			subcategory: 'Subcategoria',
			costPrice: 10.5,
			salePrice: 15.99,
			onSale: true,
			specification: '',
		},
		{
			id: 2,
			productCode: 'PROD002',
			internalCode: 'INT002',
			barcode: '987654321',
			mainProduct: 'Producto 1',
			description: '',
			stock: 50,
			category: 'Categoria',
			subcategory: 'Subcategoria',
			costPrice: 8.75,
			salePrice: 12.49,
			onSale: false,
			specification: '',
		},
	]);

	const subcategoryOptions = [
		'BAZAR',
		'FERRETERÍA',
		'HOGAR',
		'ILUMINARIAS',
		'JUGUETERÍA',
		'LIBRERÍA',
		'ARTÍCULOS NAVIDEÑOS',
		'PLAYAS, CAMPING, OUTDOORS',
		'AUTOMOTORES',
		'COTILLON',
		'ELECTRODOMÉSTICO',
		'ROPERÍA',
		'COSMETICO',
		'PRODUCTO DE LIMPIEZA',
		'ACCESORIOS',
	];

	const handleSearch = () => {};

	return (
		<Container id='product-searcher-page'>
			<Row className='mt-4'>
				<header className='product-heard'>Buscar Productos de Variante</header>
			</Row>
			<Row className='mt-4'>
				<p className='product-title'>Ingrese datos para búsqueda:</p>
			</Row>
			<Row className='mt-4'>
				<Form.Group
					as={Col}
					controlId='formInternalCode'
					className='product-form-control'
				>
					<Form.Label>Código Interno:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese el código interno'
						value={internalCode}
						onChange={e => setInternalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group
					as={Col}
					controlId='formBarcode'
					className='product-form-control'
				>
					<Form.Label>Código de Barras:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese el código de barras'
						value={barcode}
						onChange={e => setBarcode(e.target.value)}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formDescription'>
					<Form.Label>Descripción:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Ingrese la descripción'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formSubcategory'>
					<Form.Label>Subcategoría:</Form.Label>
					<Form.Select
						aria-label='Subcategoría'
						value={subcategory}
						onChange={e => setSubcategory(e.target.value)}
					>
						<option>Seleccionar...</option>
						{subcategoryOptions.map(option => (
							<option key={option}>{option}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group
					as={Col}
					controlId='formCheckbox'
					className='product-frominput'
				>
					<Form.Check
						type='checkbox'
						label='Publicar'
						checked={checked}
						onChange={e => setChecked(e.target.checked)}
						className=' product-check-input'
					/>
				</Form.Group>

				<Col className='mt-3'>
					<Button
						variant='primary'
						onClick={handleSearch}
						className='product-button'
					>
						<i className='bi bi-search'></i> Buscar
					</Button>
				</Col>
			</Row>

			<Row className='mt-4'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>cod. Producto</th>
							<th>cod. Interno</th>
							<th>Cod. Barra</th>
							<th>Producto Principal</th>
							<th>Descripcion</th>
							<th>Stock</th>
							<th>Categoria</th>
							<th>Subcategoria</th>
							<th>Precio Costo</th>
							<th>Precio Venta</th>
							<th>En Oferta</th>
							<th>Especificacion</th>
							<th>Editar</th>
							<th>Borrar</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>{product.productCode}</td>
								<td>{product.internalCode}</td>
								<td>{product.barcode}</td>
								<td>{product.mainProduct}</td>
								<td>{product.description}</td>
								<td>{product.stock}</td>
								<td>{product.category}</td>
								<td>{product.subcategory}</td>
								<td>{product.costPrice}</td>
								<td>{product.salePrice}</td>
								<td>{product.onSale ? 'Sí' : 'No'}</td>
								<td>{product.specification}</td>
								<td>Editar</td>
								<td>Borrar</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default ProductSearcherPage;
