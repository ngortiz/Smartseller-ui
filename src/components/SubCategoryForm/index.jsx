import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const SubCategoryForm = ({
	categoriaSeleccionada,
	setCategoriaSeleccionada,
	subcategoria,
	setSubcategoria,
	handleAgregarSubcategoria,
	categories,
}) => {
	const { t } = useTranslation();
	return (
		<div className='add-subcategory-section'>
			<h3>{t('categoriesPage.createSubcategory')}</h3>
			<Form>
				<Form.Group>
					<Form.Label>{t('categoriesPage.category')}:*</Form.Label>
					<Form.Control
						className='subcategory-input'
						as='select'
						value={categoriaSeleccionada}
						onChange={e => setCategoriaSeleccionada(e.target.value)}
					>
						<option value=''>{t('categoriesPage.selectCategory')}</option>
						{categories.map(({ categoryName }) => (
							<option key={categoryName} value={categoryName}>
								{categoryName}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<Form.Control
						className='subcategory-input'
						type='text'
						placeholder='Ingrese el nombre de la subcategoría'
						value={subcategoria}
						onChange={e => setSubcategoria(e.target.value)}
					/>
				</Form.Group>
				<Button
					className='add-subcategory-btn'
					variant='primary'
					onClick={handleAgregarSubcategoria}
				>
					{t('categoriesPage.add')}
				</Button>
			</Form>
		</div>
	);
};

SubCategoryForm.propTypes = {
	categoriaSeleccionada: PropTypes.string.isRequired,
	setCategoriaSeleccionada: PropTypes.func.isRequired,
	subcategoria: PropTypes.string.isRequired,
	setSubcategoria: PropTypes.func.isRequired,
	handleAgregarSubcategoria: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
};

export default SubCategoryForm;
