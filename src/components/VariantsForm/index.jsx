import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const VariantsForm = ({ variants, handleVariantChange, handleAddVariant }) => {
	const { t } = useTranslation();

	return (
		<div className='variants-form-container'>
			<header className='tiltle-variants'>
				{t('variantsFrom.productVariants')}
			</header>
			{variants.map((variant, index) => (
				<Form key={index} className='variant-form'>
					<h5 className=' subtitulo-variants'>Datos Requeridos</h5>
					<Row className='form-row'>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									Descripción
								</Form.Label>
								<Form.Control
									type='text'
									value={variant.description}
									onChange={e =>
										handleVariantChange(index, 'description', e.target.value)
									}
									required
									className='form-input'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									Cod. Barras
								</Form.Label>
								<Form.Control
									type='text'
									value={variant.barcode}
									onChange={e =>
										handleVariantChange(index, 'barcode', e.target.value)
									}
									required
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									Cod. Interno
								</Form.Label>
								<Form.Control
									type='text'
									value={variant.internalCode}
									onChange={e =>
										handleVariantChange(index, 'internalCode', e.target.value)
									}
									required
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									P. Costo (USD)
								</Form.Label>
								<Form.Control
									type='number'
									value={variant.costPrice}
									onChange={e =>
										handleVariantChange(index, 'costPrice', e.target.value)
									}
									required
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									P. Venta (USD)
								</Form.Label>
								<Form.Control
									type='number'
									value={variant.salePrice}
									onChange={e =>
										handleVariantChange(index, 'salePrice', e.target.value)
									}
									required
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>Cant.</Form.Label>
								<Form.Control
									type='number'
									value={variant.quantity}
									onChange={e =>
										handleVariantChange(index, 'quantity', e.target.value)
									}
									required
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
					</Row>

					<h5 className=' subtitulo-variants'>Atributos Opcionales</h5>
					<Row className='form-row'>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>PESO</Form.Label>
								<Form.Control
									type='text'
									value={variant.weight}
									onChange={e =>
										handleVariantChange(index, 'weight', e.target.value)
									}
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>COLOR</Form.Label>
								<Form.Control
									type='text'
									value={variant.color}
									onChange={e =>
										handleVariantChange(index, 'color', e.target.value)
									}
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									DIMENSION
								</Form.Label>
								<Form.Control
									type='text'
									value={variant.dimension}
									onChange={e =>
										handleVariantChange(index, 'dimension', e.target.value)
									}
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>
									MATERIAL
								</Form.Label>
								<Form.Control
									type='text'
									value={variant.material}
									onChange={e =>
										handleVariantChange(index, 'material', e.target.value)
									}
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
						<Col md={2}>
							<Form.Group className='form-group'>
								<Form.Label className='label-form-variants'>PIEZA</Form.Label>
								<Form.Control
									type='text'
									value={variant.piece}
									onChange={e =>
										handleVariantChange(index, 'piece', e.target.value)
									}
									className='form-input-variant'
								/>
							</Form.Group>
						</Col>
					</Row>

					{/* Imágenes */}
					<h5 className=' subtitulo-variants'>{t('variantsFrom.images')}</h5>
					<Row className='form-row'>
						{Array.from({ length: 5 }).map((_, imgIndex) => (
							<Col md={2} key={imgIndex}>
								<Form.Group className='form-group'>
									<Form.Label
										className='label-form-variants'
										htmlFor={`upload-image-${index}-${imgIndex}`}
									>
										{`Subir Imagen ${imgIndex + 1}`}
									</Form.Label>
									<Form.Control
										type='file'
										id={`upload-image-${index}-${imgIndex}`}
										onChange={e => handleFileChange(index, imgIndex, e)}
										className='form-input-images'
									/>
								</Form.Group>
							</Col>
						))}
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
			description: PropTypes.string.isRequired,
			barcode: PropTypes.string.isRequired,
			internalCode: PropTypes.string.isRequired,
			costPrice: PropTypes.number.isRequired,
			salePrice: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired,
			weight: PropTypes.string,
			color: PropTypes.string,
			dimension: PropTypes.string,
			material: PropTypes.string,
			piece: PropTypes.string,
			images: PropTypes.arrayOf(PropTypes.object),
		}),
	).isRequired,
	handleVariantChange: PropTypes.func.isRequired,
	handleAddVariant: PropTypes.func.isRequired,
};

export default VariantsForm;
