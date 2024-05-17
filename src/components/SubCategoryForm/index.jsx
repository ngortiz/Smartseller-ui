import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const SubCategoryForm = ({
	selectedCategory,
	setSelectedCategory,
	subCategories,
	setSubCategories,
	handleAddSubCategories,
	categories,
	loading,
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
						disabled={loading}
					>
						{loading ? (
							<option value=''>{t('categoriesPage.loading')}</option>
						) : (
							<>
								<option value=''>{t('categoriesPage.selectCategory')}</option>
								{categories.map(({ id, name }) => (
									<option key={id} value={name}>
										{name}
									</option>
								))}
							</>
						)}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>{t('categoriesPage.name')}:*</Form.Label>
					<Form.Control
						className='subcategory-input'
						type='text'
						placeholder={t('categoriesPage.enterTheSubcategoryName')}
						value={subCategories}
						onChange={e => setSubCategories(e.target.value)}
					/>
				</Form.Group>
				<Button
					className='add-subcategory-btn'
					variant='primary'
					onClick={handleAddSubCategories}
					disabled={loading}
				>
					{t('categoriesPage.add')}
				</Button>
			</Form>
		</div>
	);
};

SubCategoryForm.propTypes = {
	selectedCategory: PropTypes.string.isRequired,
	setSelectedCategory: PropTypes.func.isRequired,
	subCategories: PropTypes.string.isRequired,
	setSubCategories: PropTypes.func.isRequired,
	handleAddSubCategories: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default SubCategoryForm;
