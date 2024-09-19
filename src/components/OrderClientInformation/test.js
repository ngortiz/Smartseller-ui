import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderClientInformation from '../OrderClientInformation';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18nForTests';

test('Check if the text "Cliente" is present in the rendered output', () => {
	const { getByText } = render(
		<I18nextProvider i18n={i18n}>
			<OrderClientInformation
				client='Juan Pérez'
				address='Calle 123'
				phone='123456789'
				ruc='1234567890'
			/>
			,
		</I18nextProvider>,
	);

	// Check if the text "Cliente" (simulación de traducción) está presente
	const clienteTexto = getByText('Cliente');
	expect(clienteTexto).toBeInTheDocument();
});
