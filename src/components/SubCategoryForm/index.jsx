import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const SubCategoryForm = ({ categories, loading, handleAddSubCategory }) => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const [subCategoryName, setSubCategoryName] = useState('');
	const { t } = useTranslation();
	const handleOnSubmit = event => {
		event.preventDefault();
		handleAddSubCategory({
			categoryId: selectedCategoryId,
			name: subCategoryName,
		});
	};
	return (
		<div className='add-subcategory-section'>
			<h3>{t('categoriesPage.createSubcategory')}</h3>
			<Form onSubmit={handleOnSubmit}>
				<Form.Group>
					<Form.Label>{t('categoriesPage.category')}:*</Form.Label>
					<Form.Control
						className='subcategory-input'
						as='select'
						value={selectedCategoryId}
						onChange={e => setSelectedCategoryId(Number(e.target.value))}
						disabled={loading}
					>
						{loading ? (
							<option value=''>{t('categoriesPage.loading')}</option>
						) : (
							<>
								<option value=''>{t('categoriesPage.selectCategory')}</option>
								{categories.map(({ id, name }) => (
									<option key={id} value={id}>
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
						value={subCategoryName}
						onChange={e => setSubCategoryName(e.target.value)}
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
