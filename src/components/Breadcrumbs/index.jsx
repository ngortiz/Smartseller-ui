import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation } from 'react-router-dom';
import './style.css';

const Breadcrumbs = () => {
	const location = useLocation();

	const generateBreadcrumbs = () => {
		const pathnames = location.pathname.split('/').filter(x => x);
		const breadcrumbItems = pathnames.map((value, index) => {
			const to = `/${pathnames.slice(0, index + 1).join('/')}`;
			return (
				<Breadcrumb.Item key={to} href={to}>
					{value.charAt(0).toUpperCase() + value.slice(1)}
				</Breadcrumb.Item>
			);
		});

		return (
			<>
				<Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
				{breadcrumbItems}
			</>
		);
	};

	return <Breadcrumb>{generateBreadcrumbs()}</Breadcrumb>;
};

export default Breadcrumbs;
