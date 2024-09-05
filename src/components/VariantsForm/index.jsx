// src/components/VariantsForm/index.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const VariantsForm = ({ variants, handleVariantChange, handleAddVariant }) => {
	const { t } = useTranslation();

	return (
		<div className='variants-form-container'>
			<h4>{t('variantsFrom.productVariants')}</h4>
			{variants.map((variant, index) => (
				<Form key={index} className='variant-form'>
					<Row className='form-row'>
						<Col md={4}>
							<Form.Group className='form-group'>
								<Form.Label>{t('registrationPage.variantName')}</Form.Label>
								<Form.Control
									type='text'
									value={variant.name}
									onChange={e =>
										handleVariantChange(index, 'name', e.target.value)
									}
									required
									className='form-input'
								/>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group className='form-group'>
								<Form.Label>{t('registrationPage.variantCode')}</Form.Label>
								<Form.Control
									type='text'
									value={variant.code}
									onChange={e =>
										handleVariantChange(index, 'code', e.target.value)
									}
									required
									className='form-input'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label>{t('registrationPage.variantPrice')}</Form.Label>
								<Form.Control
									type='number'
									value={variant.price}
									onChange={e =>
										handleVariantChange(index, 'price', e.target.value)
									}
									required
									className='form-input'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label>{t('registrationPage.variantStock')}</Form.Label>
								<Form.Control
									type='number'
									value={variant.stock}
									onChange={e =>
										handleVariantChange(index, 'stock', e.target.value)
									}
									required
									className='form-input'
								/>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			))}
			<Button
				variant='success'
				onClick={handleAddVariant}
				className='add-variant-button'
			>
				{t('variantsFrom.save')}
			</Button>
		</div>
	);
};

VariantsForm.propTypes = {
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			code: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			stock: PropTypes.number.isRequired,
		}),
	).isRequired,
	handleVariantChange: PropTypes.func.isRequired,
	handleAddVariant: PropTypes.func.isRequired,
};

export default VariantsForm;
