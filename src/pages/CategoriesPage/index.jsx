import React, { useState } from 'react';
import './style.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CategoriesPage = () => {
	const [categoria, setCategoria] = useState('');
	const [subcategoria, setSubcategoria] = useState('');
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

	const handleGuardarCategoria = () => {
		console.log('Categoría guardada:', categoria);
	};

	const handleAgregarSubcategoria = () => {
		console.log('Subcategoría agregada:', subcategoria);
	};

	return (
		<Container className='categories-page-container'>
			<Row>
				<Col>
					<h1 className='categories-page-header'>Categoria</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='add-category-section'>
						<Form>
							<Form.Group>
								<Form.Label>Nombre:*</Form.Label>
								<Form.Control
									className='category-input'
									type='text'
									placeholder='Ingrese el nombre de la categoría'
									value={categoria}
									onChange={e => setCategoria(e.target.value)}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Check
									className='save-category-checkbox'
									type='checkbox'
									label='Publicar'
								/>
							</Form.Group>
							<Button
								className='add-category-btn'
								variant='primary'
								onClick={handleGuardarCategoria}
							>
								Guardar
							</Button>
						</Form>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<div className='add-subcategory-section'>
						<h3>Crear Subcategoría</h3>
						<Form>
							<Form.Group>
								<Form.Label>Categoría:*</Form.Label>
								<Form.Control
									className='subcategory-input'
									as='select'
									value={categoriaSeleccionada}
									onChange={e => setCategoriaSeleccionada(e.target.value)}
								>
									<option value=''>Seleccione categoria</option>
									<option value='BAZAR'>BAZAR</option>
									<option value='FERRETERÍA'>FERRETERÍA</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Nombre:*</Form.Label>
								<Form.Control
									className='subcategory-input'
									type='text'
									placeholder='Ingrese el nombre de la subcategoría'
									value={subcategoria}
									onChange={e => setSubcategoria(e.target.value)}
								/>
							</Form.Group>
							<Button
								className='add-subcategory-btn'
								variant='primary'
								onClick={handleAgregarSubcategoria}
							>
								Agregar
							</Button>
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default CategoriesPage;
