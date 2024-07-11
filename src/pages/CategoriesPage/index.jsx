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
			published
			subCategories {
				id
				name
			}
		}
	}
`;

const CREATE_CATEGORY_MUTATION = gql`
	mutation CreateCategory($name: String!, $published: Boolean!) {
		createCategory(category: { name: $name, published: $published }) {
			id
			name
		}
	}
`;

const CREATE_SUB_CATEGORY_MUTATION = gql`
	mutation CreateSubCategory($categoryId: Int!, $name: String!) {
		createSubCategory(subCategory: { categoryId: $categoryId, name: $name }) {
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
		refetchQueries: [{ query: GET_CATEGORIES_QUERY }],
	});

	const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY_MUTATION, {
		refetchQueries: [{ query: GET_CATEGORIES_QUERY }],
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

	const handleSaveCategory = async ({ name, published }) => {
		try {
			await createCategory({ variables: { name, published } });
		} catch (error) {
			console.error('Error creating category:', error);
		}
	};

	const handleAddSubCategories = async ({ categoryId, name }) => {
		try {
			await createSubCategory({ variables: { categoryId, name } });
		} catch (error) {
			console.error('Error creating subcategory:', error);
		}
	};

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
