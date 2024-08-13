import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = () => {
	const location = useLocation();
	const { t } = useTranslation();
	const pathnames = location.pathname.split('/').filter(x => x);

	const breadcrumbItems = pathnames.map((value, index) => {
		const to = `/${pathnames.slice(0, index + 1).join('/')}`;
		const translationKey = `breadcrumbs.${value}`;
		const breadcrumbLabel = t(translationKey);

		return <Breadcrumb.Item>{breadcrumbLabel}</Breadcrumb.Item>;
	});

	return (
		<Breadcrumb>
			<Breadcrumb.Item>{t('breadcrumbs.home')}</Breadcrumb.Item>
			{breadcrumbItems}
		</Breadcrumb>
	);
};

export default Breadcrumbs;
