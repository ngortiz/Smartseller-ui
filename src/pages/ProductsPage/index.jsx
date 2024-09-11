// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, gql } from '@apollo/client';
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

const SAVE_PRODUCT_MUTATION = gql`
	mutation SaveProduct(
		$name: String!
		$code: String!
		$description: String
		$categoryId: Int!
		$subCategoryId: Int!
		$providerId: Int!
		$taxId: Int!
		$templateId: Int!
	) {
		saveProduct(
			product: {
				name: $name
				code: $code
				description: $description
				categoryId: $categoryId
				subCategoryId: $subCategoryId
				providerId: $providerId
				templateId: $templateId
			}
		) {
			id
		}
	}
`;

const SAVE_PRODUCT_VARIANT_MUTATION = gql`
	mutation SaveProductVariant(
		$productId: Int!
		$amount: Int!
		$code: String!
		$internalCode: String!
		$name: String!
		$offered: Boolean!
		$published: Boolean!
		$costPrice: Float!
		$sellPrice: Float!
		$productAttributes: String
	) {
		saveProductVariant(
			productVariant: {
				productId: $productId
				amount: $amount
				code: $code
				internalCode: $internalCode
				name: $name
				offered: $offered
				published: $published
				costPrice: $costPrice
				sellPrice: $sellPrice
				productAttributes: $productAttributes
			}
		) {
			id
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

	const [saveProduct] = useMutation(SAVE_PRODUCT_MUTATION);
	const [saveProductVariant] = useMutation(SAVE_PRODUCT_VARIANT_MUTATION);

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
		setVariants([
			...variants,
			{
				description: '',
				barcode: '',
				internalCode: '',
				costPrice: null,
				sellPrice: null,
				amount: 0,
				checkbox1: false,
				checkbox2: false,
				weight: null,
				color: '',
				dimension: '',
				material: '',
				piece: '',
			},
		]);
	};

	const handleSaveProductWithVariants = async () => {
		console.log('save product with variants');
		const productInput = {
			name: productName,
			code: productCode,
			description: productDescription,
			categoryId: parseInt(category),
			subCategoryId: parseInt(subcategory),
			providerId: parseInt(provider),
			templateId: parseInt(template),
			taxId: tax === 'IVA 10%' ? 1 : 2, // Get IVA from DB
		};

		console.log('Product Input', productInput);
		console.log('Variants', variants);

		const { data } = await saveProduct({
			variables: productInput,
		});

		console.log('Product', data);

		const { productId } = data.saveProduct;

		variants.forEach(async variant => {
			const result = await saveProductVariant({
				variables: {
					productId,
					amount: variant.amount,
					code: variant.barcode,
					internalCode: variant.internalCode,
					name: variant.description,
					offered: variant.offered,
					published: variant.published,
					costPrice: variant.costPrice,
					sellPrice: variant.sellPrice,
					productAttributes: JSON.stringify({
						color: variant.color,
						dimension: variant.dimension,
						material: variant.material,
						piece: variant.piece,
					}),
				},
			});
			console.log('Variant', result.data.saveProductVariant);
		});
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
		handleAddVariant,
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
				handleSaveProductWithVariants={handleSaveProductWithVariants}
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
