import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation, gql } from '@apollo/client';
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

const CREATE_CATEGORY_MUTATION = gql`
	mutation CreateCategory($name: String!) {
		createCategory(category: { name: $name }) {
			id
			name
		}
	}
`;

const CategoriesPage = () => {
	const { t } = useTranslation();
	const [category, setCategory] = useState('');
	const [subCategories, setSubCategories] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [expandedCategory, setExpandedCategory] = useState(null);
	const [categories, setCategories] = useState([]);

	const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);
	const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
		onCompleted: data => {
			setCategories([...categories, data.createCategory]);
			setCategory('');
		},
	});

	useEffect(() => {
		if (data && data.getCategories) {
			setCategories(data.getCategories);
		}
	}, [data]);

	const toggleCategory = categoryName => {
		if (expandedCategory === categoryName) {
			setExpandedCategory(null);
		} else {
			setExpandedCategory(categoryName);
		}
	};

	const handleSaveCategory = () => {
		createCategory({ variables: { name: category } });
	};

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
				categories={categories}
				loading={loading}
			/>
			<CategoryAndSubCategoriesTable
				categories={categories}
				toggleCategory={toggleCategory}
				isCategoryExpanded={name => expandedCategory === name}
				loading={loading}
			/>
		</Container>
	);
};

export default CategoriesPage;
