import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css';
import icon from './images/icon.png';
import { useTranslation } from 'react-i18next';

const LeftNavigationBar = () => {
	const { t } = useTranslation();
	return (
		<div data-testid='leftNavigationBar' className='LeftNavigationBar'>
			<img src={icon} alt='Logo' />
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-cart3'></i> {t('leftNav.ordersOnline')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item href='/orders/summary'>
						{t('leftNav.summary')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/order/board'>
						{t('leftNav.orderControl')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item to='/'> {t('leftNav.reports')} </NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-currency-dollar'></i>{' '}
							{t('leftNav.orderPayments')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item href='/bank-payments'>
						{t('leftNav.bankPayments')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/credit-card-payments'>
						{t('leftNav.creditCardPayments')}
					</NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-arrow-up-circle-fill'></i> {t('leftNav.buys')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item href='#action/3.2'>
						{t('leftNav.registrationFrom')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='#action/3.3'>
						{t('leftNav.registerBuy')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/create-templates-page'>
						{t('leftNav.createFrom')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/register-products-from-excel'>
						{t('leftNav.registerFromExcel')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/product-searcher-page'>
						{t('leftNav.searchVariant')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/bulk-upload-product-images'>
						{t('leftNav.imageUpload')}
					</NavDropdown.Item>

					<NavDropdown.Divider />
					<NavDropdown.Item href='#action/3.8'>
						{t('leftNav.stockReport')}
					</NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul className='category'>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-arrow-down-circle-fill'> </i>
							{t('leftNav.sales')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item>{t('leftNav.registerSale')}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>{t('leftNav.salesList')}</NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul>
				<h2>
					<span>
						<i className='bi bi-megaphone-fill'></i> {t('leftNav.promotions')}
					</span>
				</h2>
			</ul>
			<ul>
				<ul>
					<NavDropdown
						title={
							<span>
								<i className='bi bi-list-columns'></i> {t('leftNav.category')}
							</span>
						}
						id='basic-nav-dropdown'
					>
						<NavDropdown.Item href='/categories-page'>
							{t('leftNav.category')}
						</NavDropdown.Item>
					</NavDropdown>
				</ul>
			</ul>
			<ul>
				<ul>
					<NavDropdown
						title={
							<span>
								<i className='bi bi-database-fill'></i> {t('leftNav.quotes')}
							</span>
						}
						id='basic-nav-dropdown'
					>
						<NavDropdown.Item href='/market-rate-page'>
							{t('leftNav.quotes')}
						</NavDropdown.Item>
					</NavDropdown>
				</ul>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-arrow-down-circle-fill'> </i>
							{t('leftNav.discount')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item href='/general-discount-page'>
						{t('leftNav.general')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/offer-discount-page'>
						{t('leftNav.byOffer')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href='/discount-by-category-page'>
						{t('leftNav.byCategories')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>{t('leftNav.byCoupons')}</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
			</ul>

			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-people-fill'></i> {t('leftNav.client')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item>{t('leftNav.clients')}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>S{t('leftNav.subscribers')}</NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-graph-up-arrow'></i> {t('leftNav.stats')}
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item>{t('leftNav.platformAnalytics')}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>{t('leftNav.onlineSales')}</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>{t('leftNav.productsSoldOnline')}</NavDropdown.Item>
				</NavDropdown>
			</ul>
			<ul>
				<h2>
					<span>
						<i className='bi bi-file-spreadsheet'></i>{' '}
						{t('leftNav.internalTasks')}
					</span>
				</h2>
			</ul>
			<ul>
				<h2>
					<span>
						<i className='bi bi-grid-fill'></i> {t('leftNav.productsPage')}
					</span>
				</h2>
			</ul>
			<ul>
				<h2>
					<span>
						<i className='bi bi-house'></i> {t('leftNav.startPage')}
					</span>
				</h2>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-person-fill'></i> Nidia Ortiz
						</span>
					}
					id='basic-nav-dropdown'
				>
					<NavDropdown.Item> {t('leftNav.changePassword')} </NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item> {t('leftNav.go out')} </NavDropdown.Item>
				</NavDropdown>
			</ul>
		</div>
	);
};
export default LeftNavigationBar;
