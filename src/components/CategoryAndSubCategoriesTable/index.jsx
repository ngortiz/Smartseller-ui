import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const CategoryAndSubCategoriesTable = ({
	categories,
	toggleCategory,
	isCategoryExpanded,
	handleEditCategory,
	handleDeleteCategory,
}) => {
	const { t } = useTranslation();
	return (
		<Row>
			<Col>
				<div className='additional-interface-section'>
					<header className='heard-tible-categoria'>
						{t('categoriesPage.categoryAndSubcatery')}
					</header>
					<ul className='subcategory-list'>
						{categories.map(({ categoryName, subCategories, id }) => (
							<Col className='category-list-col' key={categoryName}>
								<span onClick={() => toggleCategory(categoryName)}>
									<i className='bi bi-caret-down-fill'></i>
									{categoryName}
								</span>
								<div className='category-buttons'>
									<Button
										className='category-btn-edit'
										onClick={() =>
											handleEditCategory && handleEditCategory(categoryName)
										}
									>
										{t('categoriesPage.edit')}
									</Button>{' '}
									<Button
										className='category-btn-delete'
										onClick={() =>
											handleDeleteCategory && handleDeleteCategory(categoryName)
										}
									>
										{t('categoriesPage.delete')}
									</Button>{' '}
									<input type='checkbox' id={id} className='custom-checkbox' />
									<span className='checkmark'></span>
								</div>
								{isCategoryExpanded(categoryName) && (
									<ul className='subcategory-list'>
										{subCategories.map(({ subCategoryName }) => (
											<li key={subCategoryName}>{subCategoryName}</li>
										))}
									</ul>
								)}
							</Col>
						))}
					</ul>
				</div>
			</Col>
		</Row>
	);
};

CategoryAndSubCategoriesTable.propTypes = {
	categories: PropTypes.array.isRequired,
	toggleCategory: PropTypes.func.isRequired,
	isCategoryExpanded: PropTypes.func.isRequired,
	handleEditCategory: PropTypes.func,
	handleDeleteCategory: PropTypes.func,
};

export default CategoryAndSubCategoriesTable;
