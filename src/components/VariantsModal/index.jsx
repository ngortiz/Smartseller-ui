import React, { useState, useEffect } from 'react';
import { Modal, Table, Form, Container, Spinner, Alert } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './style.css';

const GET_PRODUCT_VARIANTS_QUERY = gql`
	query GetProductVariants($limit: Int!, $offset: Int!, $productId: Int!) {
		getProductVariants(limit: $limit, offset: $offset, productId: $productId) {
			count
			rows {
				amount
				code
				costPrice
				id
				internalCode
				name
				offered
				picture
				published
				productAttributes
				sellPrice
			}
		}
	}
`;

const VariantsModal = ({ show, handleClose, product }) => {
	const { t } = useTranslation();
	const { id: productId } = product;
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');

	const offset = (page - 1) * limit;

	const { loading, error, data, refetch } = useQuery(
		GET_PRODUCT_VARIANTS_QUERY,
		{
			variables: { limit, offset, productId },
		},
	);

	const handleLimitChange = e => {
		const newLimit = Number(e.target.value);
		setLimit(newLimit);
		setPage(1);
	};

	if (loading) {
		return (
			<Container className='spinner-container'>
				<Spinner animation='border' />
			</Container>
		);
	}

	if (error) {
		return (
			<Container>
				<Alert variant='danger'>Error: {error.message}</Alert>
			</Container>
		);
	}

	const variants = data?.getProductVariants?.rows || [];
	const count = data?.getProductVariants?.count || 0;

	const filteredVariants = variants.filter(variant =>
		variant.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const getVariantAttributes = attributes => {
		return Object.entries(JSON.parse(attributes)).map(
			([attributeName, attributeValue], index) => {
				if (attributeValue.length > 0) {
					return (
						<div key={index}>
							<strong>{attributeName}:</strong>
							{attributeValue}
							<br />
						</div>
					);
				}
				return null;
			},
		);
	};

	return (
		<Modal
			show={show}
			scrollable={true}
			onHide={handleClose}
			dialogClassName='variants-modal'
		>
			<Modal.Header closeButton>
				<Modal.Title>{t('variantsModal.productVariants')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='modal-variants'>
					<div className='searchContainer'>
						<Form.Group
							controlId='showEntries'
							className='searchContainer-select'
						>
							<Form.Label className='modal-variantsShow-label'>
								{t('variantsModal.show')}
							</Form.Label>
							<Form.Control
								as='select'
								value={limit}
								onChange={handleLimitChange}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId='search' className='searchModal-input'>
							<Form.Label className='modal-variantsSearch-label'>
								{t('variantsModal.search')}
							</Form.Label>
							<Form.Control
								type='text'
								placeholder={t('variantsModal.enterSearchTerm')}
								className='searchContainer-input'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</Form.Group>
					</div>
					<Table bordered hover className='variantsModal-table'>
						<thead>
							<tr>
								<th>{t('variantsModal.image')}</th>
								<th>{t('variantsModal.description')}</th>
								<th>{t('variantsModal.barCode')}</th>
								<th>{t('variantsModal.internalCode')}</th>
								<th>{t('variantsModal.specification')}</th>
								<th>{t('variantsModal.costPrice')}</th>
								<th>{t('variantsModal.sellPrice')}</th>
								<th>{t('variantsModal.amount')}</th>
								<th>{t('variantsModal.published')}</th>
								<th>{t('variantsModal.onOffer')}</th>
							</tr>
						</thead>
						<tbody>
							{filteredVariants.map(variant => (
								<tr key={variant.id}>
									<td>
										<img
											src={`${import.meta.env.VITE_IMAGE_URL}/images/%2Fstorage%2Fproducts%2Fpicture%2F${variant.id}%2Fthumb_${variant.picture}`}
											alt={variant.name}
										/>
									</td>
									<td>{variant.name}</td>
									<td>{variant.code}</td>
									<td>{variant.internalCode}</td>
									<td>{getVariantAttributes(variant.productAttributes)}</td>
									<td>US$ {variant.costPrice}</td>
									<td>US$ {variant.sellPrice}</td>
									<td>{variant.amount}</td>
									<td>{variant.published ? 'Sí' : 'No'}</td>
									<td>{variant.offered ? 'Sí' : 'No'}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<PaginationControl
						page={offset}
						between={4}
						total={count}
						limit={limit}
						changePage={setPage}
						ellipsis={1}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default VariantsModal;
