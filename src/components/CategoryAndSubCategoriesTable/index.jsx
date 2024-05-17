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
						{categories.map(({ name, id, subCategories }) => (
							<Col className='category-list-col' key={id}>
								<span onClick={() => toggleCategory(name)}>
									<i className='bi bi-caret-down-fill'></i>
									{name}
								</span>
								<div className='category-buttons'>
									<Button
										className='category-btn-edit'
										onClick={() =>
											handleEditCategory && handleEditCategory(name)
										}
									>
										{t('categoriesPage.edit')}
									</Button>{' '}
									<Button
										className='category-btn-delete'
										onClick={() =>
											handleDeleteCategory && handleDeleteCategory(name)
										}
									>
										{t('categoriesPage.delete')}
									</Button>{' '}
									<input type='checkbox' id={id} className='custom-checkbox' />
									<span className='checkmark'></span>
								</div>
								{isCategoryExpanded(name) && (
									<ul className='subcategory-list'>
										{subCategories.map(
											({ id: subCategoryId, name: subCategoryName }) => (
												<li key={subCategoryId}>{subCategoryName}</li>
											),
										)}
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
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			subCategories: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					name: PropTypes.string.isRequired,
				}),
			).isRequired,
		}),
	).isRequired,
	toggleCategory: PropTypes.func.isRequired,
	isCategoryExpanded: PropTypes.func.isRequired,
	handleEditCategory: PropTypes.func,
	handleDeleteCategory: PropTypes.func,
};

export default CategoryAndSubCategoriesTable;
