import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const SubCategoryForm = ({ categories, loading, handleAddSubCategory }) => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const [subCategoryName, setSubCategoryName] = useState('');
	const [isValid, setIsValid] = useState(null);
	const { t } = useTranslation();

	const handleOnSubmit = event => {
		event.preventDefault();
		if (
			selectedCategoryId !== 0 &&
			subCategoryName.length >= 4 &&
			subCategoryName.length <= 15
		) {
			setIsValid(true);
			handleAddSubCategory({
				categoryId: selectedCategoryId,
				name: subCategoryName,
			});
			setSelectedCategoryId(0);
			setSubCategoryName('');
		} else {
			setIsValid(false);
		}
	};

	const handleCategoryChange = e => {
		const selectedId = Number(e.target.value);
		setSelectedCategoryId(selectedId);
		if (
			selectedId !== 0 &&
			subCategoryName.length >= 4 &&
			subCategoryName.length <= 15
		) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

	const handleNameChange = e => {
		const name = e.target.value;
		setSubCategoryName(name);
		if (name.length >= 4 && name.length <= 15 && selectedCategoryId !== 0) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

	return (
		<div className='add-subcategory-section'>
			<h3>{t('categoriesPage.createSubcategory')}</h3>
			<Form noValidate onSubmit={handleOnSubmit}>
				<Form.Group>
					<Form.Label>{t('categoriesPage.category')}:*</Form.Label>
					<Form.Control
						className={`subcategory-input ${isValid === false && selectedCategoryId === 0 ? 'is-invalid' : ''} ${isValid === true ? 'is-valid' : ''}`}
						as='select'
						value={selectedCategoryId}
						onChange={handleCategoryChange}
						disabled={loading}
					>
						<option value=''>{t('categoriesPage.selectCategory')}</option>
						{categories.map(({ id, name }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<Form.Control
						required
						minLength={4}
						maxLength={15}
						className={`subcategory-input ${isValid === false && subCategoryName === '' ? 'is-invalid' : ''} ${isValid === true ? 'is-valid' : ''}`}
						type='text'
						placeholder={t('categoriesPage.enterTheSubcategoryName')}
						value={subCategoryName}
						onChange={handleNameChange}
					/>
				</Form.Group>
				<Button
					className='add-subcategory-btn'
					variant='primary'
					type='submit'
					disabled={loading}
				>
					{t('categoriesPage.add')}
				</Button>
			</Form>
		</div>
	);
};

SubCategoryForm.propTypes = {
	handleAddSubCategory: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default SubCategoryForm;
