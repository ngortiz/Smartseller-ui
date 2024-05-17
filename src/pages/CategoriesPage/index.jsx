// CategoriesPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import CategoryForm from '../../components/CategoryForm/index';
import SubCategoryForm from '../../components/SubCategoryForm/index';
import { useTranslation } from 'react-i18next';
import CategoryAndSubCategoriesTable from '../../components/CategoryAndSubCategoriesTable/index';
import './style.css';

const GET_CATEGORIES_QUERY = gql`
	query GetCategories {
		getCategories {
			id
			name
			subCategories {
				id
				name
			}
		}
	}
`;

const CategoriesPage = () => {
	const { t } = useTranslation();
	const [category, setCategory] = useState('');
	const [subCategories, setSubCategories] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [expandedCategory, setExpandedCategory] = useState(null);
	const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading categories: {error.message}</p>;
	console.log(data);

	const { getCategories } = data;

	const toggleCategory = categoryName => {
		if (expandedCategory === categoryName) {
			setExpandedCategory(null);
		} else {
			setExpandedCategory(categoryName);
		}
	};

	const handleSaveCategory = () => {};
	const handleAddSubCategories = () => {};

	return (
		<Container className='categories-page-container'>
			<Row>
				<Col>
					<h1 className='categories-page-header'>
						{t('categoriesPage.category')}
					</h1>
				</Col>
			</Row>
			<CategoryForm
				category={category}
				setCategory={setCategory}
				handleSaveCategory={handleSaveCategory}
			/>
			<SubCategoryForm
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				subCategories={subCategories}
				setSubCategories={setSubCategories}
				handleAddSubCategories={handleAddSubCategories}
				categories={getCategories}
			/>
			<CategoryAndSubCategoriesTable
				categories={getCategories}
				toggleCategory={toggleCategory}
				isCategoryExpanded={name => expandedCategory === name}
			/>
		</Container>
	);
};

export default CategoriesPage;
