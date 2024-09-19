import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { OrderData } from '../OrderData';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18nForTests'; // Este es el archivo de configuración para pruebas

test('checks if the text "Pedido" is present in the rendered output', () => {
	// Render the component with the translation provider
	const { getByText } = render(
		<I18nextProvider i18n={i18n}>
			<OrderData
				number='123456'
				voucher='123ABC'
				state='Pendiente'
				date='2024-02-06'
			/>
		</I18nextProvider>,
	);

	// Check if the text "Pedido" (translated "Order") is present
	const orderText = getByText('Pedido');
	expect(orderText).toBeInTheDocument();
});
