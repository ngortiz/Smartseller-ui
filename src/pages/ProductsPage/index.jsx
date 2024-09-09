// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import RegistrationForm from '../../components/RegistrationForm';
import ProductsTable from '../../components/ProductsTable';
import VariantsForm from '../../components/VariantsForm';
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

const GET_TEMPLATES_QUERY = gql`
	query GetTemplates {
		getTemplates {
			format
			id
			name
		}
	}
`;

const GET_PROVIDERS_QUERY = gql`
	query GetProviders {
		getProviders {
			id
			name
		}
	}
`;

const ProductsPage = () => {
	const { t } = useTranslation();
	const [productCode, setProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [provider, setProvider] = useState({ id: '', name: '' });
	const [tax, setTax] = useState('');
	const [template, setTemplate] = useState('');
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [providers, setProviders] = useState([]);
	const [variants, setVariants] = useState([]);

	const taxes = ['IVA 10%', 'IVA 5%', 'EXENTA'];

	const { loading: loadingCategories, data: categoriesData } =
		useQuery(GET_CATEGORIES_QUERY);
	const { loading: loadingTemplates, data: templatesData } =
		useQuery(GET_TEMPLATES_QUERY);
	const { loading: loadingProviders, data: providersData } =
		useQuery(GET_PROVIDERS_QUERY);

	useEffect(() => {
		if (categoriesData) {
			setCategories(categoriesData.getCategories);
		}
	}, [categoriesData]);

	useEffect(() => {
		if (templatesData) {
			setTemplate(templatesData.getTemplates);
		}
	}, [templatesData]);

	useEffect(() => {
		if (providersData) {
			setProviders(providersData.getProviders);
		}
	}, [providersData]);

	const handleGenerateCode = () => {
		setProductCode(`P${Math.floor(Math.random() * 10000)}`);
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	const handleCategoryChange = e => {
		const selectedCategory = e.target.value;
		setCategory(selectedCategory);
		const selectedCategoryData = categories.find(
			cat => cat.id === selectedCategory,
		);
		setSubcategories(
			selectedCategoryData ? selectedCategoryData.subCategories : [],
		);
		setSubcategory('');
	};

	const handleVariantChange = (index, field, value) => {
		const newVariants = [...variants];
		newVariants[index][field] = value;
		setVariants(newVariants);
	};

	const handleRemoveVariant = index => {
		const newVariants = variants.filter((_, i) => i !== index);
		setVariants(newVariants);
	};
	const handleAddVariant = () => {
		setVariants([...variants, { name: '', code: '', price: '', stock: '' }]);
	};

	const formProps = {
		productCode,
		setProductCode,
		productName,
		setProductName,
		productDescription,
		setProductDescription,
		provider,
		setProvider,
		tax,
		setTax,
		template,
		setTemplate,
		category,
		setCategory,
		subcategory,
		setSubcategory,
		categories,
		subcategories,
		providers,
		taxes,
		loadingTemplates,
		loadingCategories,
		templatesData,
		handleGenerateCode,
		handleSubmit,
		handleCategoryChange,
		handleAddVariant, // Asegúrate de que esté aquí
		handleRemoveVariant,
	};

	return (
		<>
			<Row>
				<Col>
					<header className='registration-form-title'>
						{t('registrationPage.registerProducAndVariants')}
					</header>
				</Col>
			</Row>
			<Container fluid className='registration-form-container'>
				<Row>
					<Col>
						<h2 className='registration-form-subtitle'>
							{t('registrationPage.generalProductData')}
						</h2>
					</Col>
				</Row>
				<RegistrationForm {...formProps} />
			</Container>
			<VariantsForm
				variants={variants}
				handleVariantChange={handleVariantChange}
				handleAddVariant={handleAddVariant}
				handleRemoveVariant={handleRemoveVariant}
			/>
			<Row>
				<Col>
					<h2 className='productTable-title'>{t('productsTable.title')}</h2>
				</Col>
			</Row>

			<ProductsTable />
		</>
	);
};

export default ProductsPage;
