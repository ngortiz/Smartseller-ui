import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const CategoryForm = ({ category, setCategory, handleSaveCategory }) => {
	const { t } = useTranslation();
	return (
		<div className='add-category-section'>
			<Form>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<Form.Control
						className='category-input'
						type='text'
						placeholder={t('categoriesPage.enterTheCategoryName')}
						value={category}
						onChange={e => setCategory(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Check
						className='save-category-checkbox'
						type='checkbox'
						label={t('categoriesPage.post')}
					/>
				</Form.Group>
				<Button
					className='add-category-btn'
					variant='primary'
					onClick={handleSaveCategory}
				>
					{t('categoriesPage.save')}
				</Button>
			</Form>
		</div>
	);
};
CategoryForm.propTypes = {
	category: PropTypes.string.isRequired,
	setCategory: PropTypes.func.isRequired,
	handleSaveCategory: PropTypes.func.isRequired,
};

export default CategoryForm;
