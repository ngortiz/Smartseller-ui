import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const SubCategoryForm = ({
	selectedCategory,
	setSelectedCategory,
	subcategory,
	setSubCategory,
	handleAddSubCategory,
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
						value={selectedCategory}
						onChange={e => setSelectedCategory(e.target.value)}
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
						placeholder={t('categoriesPage.enterTheSubcategoryName')}
						value={subcategory}
						onChange={e => setSubCategory(e.target.value)}
					/>
				</Form.Group>
				<Button
					className='add-subcategory-btn'
					variant='primary'
					onClick={handleAddSubCategory}
				>
					{t('categoriesPage.add')}
				</Button>
			</Form>
		</div>
	);
};

SubCategoryForm.propTypes = {
	selectedCategory: PropTypes.string.isRequired,
	setselectedCategory: PropTypes.func.isRequired,
	subcategory: PropTypes.string.isRequired,
	setSubCategory: PropTypes.func.isRequired,
	handleAddSubCategory: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
};

export default SubCategoryForm;
