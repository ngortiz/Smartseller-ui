import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const CategoryForm = ({ category, setCategory, handleSaveCategory }) => {
	const [isValid, setIsValid] = useState(null);
	const { t } = useTranslation();

	const handleSubmit = event => {
		event.preventDefault();
		if (category.length >= 4 && category.length <= 15) {
			setIsValid(true);
			handleSaveCategory();
			setCategory('');
		} else {
			setIsValid(false);
		}
	};

	const handleChange = e => {
		setCategory(e.target.value);
		if (e.target.value.length >= 4 && e.target.value.length <= 15) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

	return (
		<div className='add-category-section'>
			<Form noValidate onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<div className='input-wrapper'>
						<Form.Control
							required
							minLength={4}
							maxLength={15}
							className={`category-input ${isValid === false ? 'is-invalid' : ''} ${isValid === true ? 'is-valid' : ''}`}
							type='text'
							placeholder={t('categoriesPage.enterTheCategoryName')}
							value={category}
							onChange={handleChange}
						/>
					</div>
				</Form.Group>
				<Button className='add-category-btn' variant='primary' type='submit'>
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
