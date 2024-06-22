import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import RegistrationForm from '../../components/RegistrationForm';
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

const ProductsPage = () => {
	const { t } = useTranslation();
	const [productCode, setProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [supplier, setSupplier] = useState('');
	const [tax, setTax] = useState('');
	const [template, setTemplate] = useState('');
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3'];
	const taxes = ['IVA 10%', 'IVA 5%', 'EXENTA'];

	const { loading: loadingCategories, data: categoriesData } =
		useQuery(GET_CATEGORIES_QUERY);
	const { loading: loadingTemplates, data: templatesData } =
		useQuery(GET_TEMPLATES_QUERY);

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

	const formProps = {
		productCode,
		setProductCode,
		productName,
		setProductName,
		productDescription,
		setProductDescription,
		supplier,
		setSupplier,
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
		suppliers,
		taxes,
		loadingTemplates,
		loadingCategories,
		templatesData,
		handleGenerateCode,
		handleSubmit,
		handleCategoryChange,
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
		</>
	);
};

export default ProductsPage;
