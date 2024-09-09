import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const VariantsForm = ({
	variants,
	handleVariantChange,
	handleAddVariant,
	handleRemoveVariant,
	handleFileChange,
}) => {
	const { t } = useTranslation();
	const [selectedFiles, setSelectedFiles] = useState({});

	const handleFileSelect = (index, imgIndex, event) => {
		const file = event.target.files[0];
		setSelectedFiles({
			...selectedFiles,
			[`${index}-${imgIndex}`]: file
				? file.name
				: t('variantsFrom.noFileChosen'),
		});
		handleFileChange(index, imgIndex, event);
	};

	return (
		<Container className='variants-form-container'>
			<header className='tiltle-variants'>
				{t('variantsFrom.productVariants')}
			</header>
			<Container className='variant-container'>
				<div className='variant-form-scroll'>
					{variants.map((variant, index) => (
						<Form key={index} className='variant-form'>
							<h5 className='subtitulo-variants'>Datos Requeridos</h5>
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
												handleVariantChange(
													index,
													'description',
													e.target.value,
												)
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
												handleVariantChange(
													index,
													'internalCode',
													e.target.value,
												)
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
											P.Venta(USD)
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
										<Form.Label className='label-form-variants'>
											Cant.
										</Form.Label>
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
								<Col>
									<Form.Group className='form-group'>
										<Form.Label className='label-form-variants'></Form.Label>
										<Form.Check
											type='checkbox'
											className='form-checkbox1-variant'
											checked={variant.checkbox1}
											onChange={e =>
												handleVariantChange(
													index,
													'checkbox1',
													e.target.checked,
												)
											}
										/>
										<Form.Check
											type='checkbox'
											className='form-checkbox2-variant'
											checked={variant.checkbox2}
											onChange={e =>
												handleVariantChange(
													index,
													'checkbox2',
													e.target.checked,
												)
											}
										/>
									</Form.Group>
								</Col>
							</Row>

							<h5 className='subtitulo-variants'>Atributos Opcionales</h5>
							<Row className='form-row'>
								<Col md={2}>
									<Form.Group className='form-group'>
										<Form.Label className='label-form-variants'>
											PESO
										</Form.Label>
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
										<Form.Label className='label-form-variants'>
											COLOR
										</Form.Label>
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
										<Form.Label className='label-form-variants'>
											PIEZA
										</Form.Label>
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

							<h5 className='subtitulo-variants'>{t('variantsFrom.images')}</h5>
							<Row className='form-row'>
								{Array.from({ length: 5 }).map((_, imgIndex) => (
									<Col md={2} key={imgIndex}>
										<Form.Group className='form-group'>
											<Form.Label
												className='label-form-variants'
												htmlFor={`upload-image-${index}-${imgIndex}`}
											></Form.Label>
											<div className='custom-file'>
												<input
													type='file'
													id={`upload-image-${index}-${imgIndex}`}
													onChange={e => handleFileSelect(index, imgIndex, e)}
													className='custom-file-input'
													accept='image/*'
													style={{ display: 'none' }}
												/>
												<Button
													className='btn-choose-file'
													variant='primary'
													onClick={() =>
														document
															.getElementById(
																`upload-image-${index}-${imgIndex}`,
															)
															.click()
													}
												>
													{t('variantsFrom.chooseFile') || 'Elegir archivo'}
													{` ${imgIndex + 1}`}
												</Button>
											</div>
										</Form.Group>
									</Col>
								))}
							</Row>
						</Form>
					))}
				</div>
				<Button
					variant='success'
					onClick={handleAddVariant}
					className='add-variant-button'
				>
					Agregar
				</Button>
			</Container>
			<Button
				variant='success'
				onClick={handleAddVariant}
				className='save-variant-button'
			>
				{t('variantsFrom.save')}
			</Button>

			<Col>
				<Button
					variant='danger'
					onClick={() => handleRemoveVariant(index)}
					className='remove-variant-button'
				>
					Eliminar
				</Button>
			</Col>
		</Container>
	);
};

VariantsForm.propTypes = {
	variants: PropTypes.array.isRequired,
	handleVariantChange: PropTypes.func.isRequired,
	handleAddVariant: PropTypes.func.isRequired,
	handleRemoveVariant: PropTypes.func.isRequired,
	handleFileChange: PropTypes.func.isRequired,
};

export default VariantsForm;
