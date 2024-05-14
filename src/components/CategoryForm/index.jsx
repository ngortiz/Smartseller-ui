import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const CategoryForm = ({ categoria, setCategoria, handleGuardarCategoria }) => {
	const { t } = useTranslation();
	return (
		<div className='add-category-section'>
			<Form>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<Form.Control
						className='category-input'
						type='text'
						placeholder='Ingrese el nombre de la categoría'
						value={categoria}
						onChange={e => setCategoria(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Check
						className='save-category-checkbox'
						type='checkbox'
						label='Publicar:*'
					/>
				</Form.Group>
				<Button
					className='add-category-btn'
					variant='primary'
					onClick={handleGuardarCategoria}
				>
					{t('categoriesPage.save')}
				</Button>
			</Form>
		</div>
	);
};
CategoryForm.propTypes = {
	categoria: PropTypes.string.isRequired,
	setCategoria: PropTypes.func.isRequired,
	handleGuardarCategoria: PropTypes.func.isRequired,
};

export default CategoryForm;
