import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';
import SubCategoryForm from '../../components/SubCategoryForm/index';
import CategoryForm from '../../components/CategoryForm/index';
import CategoryAndSubCategoriesTable from '../../components/CategoryAndSubCategoriesTable/index';

const DATA = [
	{
		id: 1,
		categoryName: 'Accesorios',
		subCategories: [
			{ id: 100, subCategoryName: 'Bolsos, Carteras o Mochila' },
			{ id: 101, subCategoryName: 'Ùtiles Escolares' },
		],
	},
	{
		id: 2,
		categoryName: 'Bazar',
		subCategories: [
			{ id: 102, subCategoryName: 'Plásticos' },
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

	const handleAgregarSubcategoria = () => {};
	return (
		<Container className='categories-page-container'>
			<Row>
				<Col>
					<h1 className='categories-page-header'>
						{t('categoriesPage.categories')}
					</h1>
				</Col>
			</Row>
			<CategoryForm
				categoria={categoria}
				setCategoria={setCategoria}
				handleGuardarCategoria={handleGuardarCategoria}
			/>
			<SubCategoryForm
				categories={categories}
				categoriaSeleccionada={categoriaSeleccionada}
				setCategoriaSeleccionada={setCategoriaSeleccionada}
				subcategoria={subcategoria}
				setSubcategoria={setSubcategoria}
				handleAgregarSubcategoria={handleAgregarSubcategoria}
			/>
			<CategoryAndSubCategoriesTable
				categories={categories}
				expandedCategories={expandedCategories}
				toggleCategory={toggleCategory}
				isCategoryExpanded={isCategoryExpanded}
			/>
		</Container>
	);
};

export default CategoriesPage;
