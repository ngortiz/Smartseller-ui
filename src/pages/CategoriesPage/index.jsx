import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';

const DATA = [
	{
		id: 1,
		categoryName: 'Accesorios',
		subCategories: [
			{ id: 100, subCategoryName: 'Bolsos, Carteras o Mochila' },
			{ id: 101, subCategoryName: 'Utiles Escolares' },
		],
	},
	{
		id: 2,
		categoryName: 'Bazar',
		subCategories: [
			{ id: 102, subCategoryName: 'Plasticos' },
			{ id: 103, subCategoryName: 'Ollas y Sartenes' },
		],
	},
];
const CategoriesPage = () => {
	const { t } = useTranslation();
	const [categoria, setCategoria] = useState('');
	const [subcategoria, setSubcategoria] = useState('');
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
	const [expandedCategories, setExpandedCategories] = useState([]);
	const [categories, setCategories] = useState(DATA);

	const toggleCategory = category => {
		if (expandedCategories.includes(category)) {
			setExpandedCategories(expandedCategories.filter(cat => cat !== category));
		} else {
			setExpandedCategories([...expandedCategories, category]);
		}
	};

	const isCategoryExpanded = category => {
		return expandedCategories.includes(category);
	};

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
					<h1 className='categories-page-header'>
						{t('categoriesPage.categories')}
					</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='add-category-section'>
						<Form>
							<Form.Group>
								<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
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
									label='Publicar:*'
								/>
							</Form.Group>
							<Button
								className='add-category-btn'
								variant='primary'
								onClick={handleGuardarCategoria}
							>
								{t('categoriesPage.save')}
							</Button>
						</Form>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<div className='add-subcategory-section'>
						<h3>{t('categoriesPage.createSubcategory')}</h3>
						<Form>
							<Form.Group>
								<Form.Label>{t('categoriesPage.category')}:*</Form.Label>
								<Form.Control
									className='subcategory-input'
									as='select'
									value={categoriaSeleccionada}
									onChange={e => setCategoriaSeleccionada(e.target.value)}
								>
									<option value=''>{t('categoriesPage.selectCategory')}</option>
									{categories.map(({ categoryName }) => (
										<option value={categoryName}>{categoryName}</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
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
								{t('categoriesPage.add')}
							</Button>
						</Form>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<div className='additional-interface-section'>
						<header className='heard-tible-categoria'>
							{' '}
							{t('categoriesPage.categoryAndSubcatery')}
						</header>

						<ul className='subcategory-list'>
							{categories.map(({ categoryName, subCategories, id }) => (
								<Col className='category-list-col'>
									<span onClick={() => toggleCategory(`${categoryName}`)}>
										<i className='bi bi-caret-down-fill'></i>
										{categoryName}
									</span>
									<div className='category-buttons'>
										<Button className='category-btn-edit'>
											{t('categoriesPage.edit')}
										</Button>{' '}
										<Button className='category-btn-delete'>
											{t('categoriesPage.delete')}
										</Button>{' '}
										<input
											type='checkbox'
											id={id}
											className='category-checkbox custom-checkbox'
										/>
									</div>
									{isCategoryExpanded(`${categoryName}`) && (
										<ul className='subcategory-list'>
											{subCategories.map(({ subCategoryName }) => (
												<li>{subCategoryName}</li>
											))}
										</ul>
									)}
								</Col>
							))}
						</ul>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default CategoriesPage;
