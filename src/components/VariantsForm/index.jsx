import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Container, Image } from 'react-bootstrap';
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
		setSelectedFiles(prevFiles => ({
			...prevFiles,
			[`${index}-${imgIndex}`]: file ? URL.createObjectURL(file) : '',
		}));
	};

	const handleRemoveImage = fileKey => {
		setSelectedFiles(prevFiles => {
			const updatedFiles = { ...prevFiles };
			delete updatedFiles[fileKey];
			return updatedFiles;
		});
	};

	return (
		<Container className='variants-form-container'>
			<header className='title-variants'>
				{t('variantsFrom.productVariants')}
			</header>
			<Container className='variant-container'>
				<div>
					{variants.map((variant, index) => (
						<Form key={index} className='variant-form'>
							<h5 className='subtitulo-variants'>Datos Requeridos</h5>
							<Row
								className={`form-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
							>
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
										<Form.Label className='label-form-variants'>
											Oferta
										</Form.Label>
										<Form.Check
											type='checkbox'
											className='form-checkbox-variant'
											onChange={e =>
												handleVariantChange(
													index,
													'checkbox1',
													e.target.checked,
												)
											}
										/>
									</Form.Group>
								</Col>
								<Col className='form-group-checkbox2'>
									<Form.Group className='form-group-checkbox2'>
										<Form.Label className='label-form-variants'>
											Publicar
										</Form.Label>
										<Form.Check
											type='checkbox'
											className='form-checkbox-variant'
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
													{imgIndex + 1}
												</Button>

												{/* Previsualización de la imagen */}
												<div className='image-preview-container'>
													{selectedFiles[`${index}-${imgIndex}`] ? (
														<>
															<Image
																src={selectedFiles[`${index}-${imgIndex}`]}
																alt={`Preview ${imgIndex + 1}`}
																className='image-preview'
															/>
															<Button
																variant='danger'
																className='button-remove-image'
																onClick={() =>
																	handleRemoveImage(`${index}-${imgIndex}`)
																}
															>
																<i className='bi bi-trash'></i>
															</Button>
														</>
													) : (
														<Image
															src='/images/no-image.png'
															alt=' '
															className='image-preview'
															style={{
																maxHeight: '130px',
																verticalAlign: 'middle',
																maxWidth: ' 49%',
																marginBottom: '35%',
																marginRight: '8%',
																marginTop: ' 30%',
															}}
														/>
													)}
												</div>
											</div>
										</Form.Group>
									</Col>
								))}
							</Row>

							<Button
								type='button'
								variant='danger'
								onClick={() => handleRemoveVariant(index)}
								className='btn-remove-variant'
							>
								<i className='bi bi-trash'></i>
							</Button>
						</Form>
					))}
				</div>
			</Container>

			<Button
				variant='success'
				onClick={handleAddVariant}
				className='save-variant-button'
			>
				{t('variantsFrom.save')}
			</Button>
			<Button
				type='button'
				variant='success'
				onClick={handleAddVariant}
				className='btn-add-variant'
			>
				{t('variantsFrom.addVariant')}
			</Button>
		</Container>
	);
};

VariantsForm.propTypes = {
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			description: PropTypes.string,
			barcode: PropTypes.string,
			internalCode: PropTypes.string,
			costPrice: PropTypes.number,
			salePrice: PropTypes.number,
			quantity: PropTypes.number,
			checkbox1: PropTypes.bool,
			checkbox2: PropTypes.bool,
			weight: PropTypes.string,
			color: PropTypes.string,
			dimension: PropTypes.string,
			material: PropTypes.string,
			piece: PropTypes.string,
		}),
	).isRequired,
	handleVariantChange: PropTypes.func.isRequired,
	handleAddVariant: PropTypes.func.isRequired,
	handleRemoveVariant: PropTypes.func.isRequired,
};

export default VariantsForm;
