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
	const [category, setCategory] = useState('');
	const [subcategory, setSubCategory] = useState('');
	const [selectedCategory, setselectedCategory] = useState('');
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

	const handleSaveCategory = () => {};

	const handleAddSubCategory = () => {};
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
				category={category}
				setCategory={setCategory}
				handleSaveCategory={handleSaveCategory}
			/>
			<SubCategoryForm
				categories={categories}
				selectedCategory={selectedCategory}
				setselectedCategory={setselectedCategory}
				subcategory={subcategory}
				setSubCategory={setSubCategory}
				handleAddSubCategory={handleAddSubCategory}
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
