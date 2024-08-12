import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
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
					<NavDropdown.Item href='/'> {t('leftNav.reports')} </NavDropdown.Item>
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
					<NavDropdown.Item href='/products-page'>
						{t('leftNav.registrationProduct')}
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
				<Nav.Link href='/categories-page'>
					<i className='bi bi-list-columns'></i> {t('leftNav.category')}
				</Nav.Link>
				<hr className='nav-divider' />
			</ul>
			<ul>
				<Nav.Link href='/market-rate-page'>
					<i className='bi bi-database-fill'></i> {t('leftNav.quotes')}
				</Nav.Link>
				<hr className='nav-divider' />
			</ul>
			<ul>
				<h2>
					<span>
						<i className='bi bi-megaphone-fill'></i> {t('leftNav.promotions')}
					</span>
				</h2>
			</ul>
			<ul>
				<NavDropdown
					title={
						<span>
							<i className='bi bi-arrow-down-circle-fill'></i>{' '}
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
					<NavDropdown.Item href='/discount-by-coupons-page'>
						{t('leftNav.byCoupons')}
					</NavDropdown.Item>
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
					<NavDropdown.Item href='/customers-page'>
						{t('leftNav.clients')}
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item>{t('leftNav.subscribers')}</NavDropdown.Item>
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
