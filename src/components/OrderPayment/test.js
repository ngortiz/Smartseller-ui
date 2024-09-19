import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../setupTests'; // Asegúrate de que la ruta sea correcta
import OrderPayment from '../OrderPayment';

describe('OrderPayment component', () => {
	it('renders payment state correctly', () => {
		const paymentState = 'Paid';

		const { getByText } = render(
			<I18nextProvider i18n={i18n}>
				<OrderPayment
					paymentState={paymentState}
					total='100'
					totalPaid='80'
					totalDebt='20'
				/>
			</I18nextProvider>,
		);

		// Verificar que los textos traducidos están presentes
		expect(getByText('Estado de Pago:')).toBeInTheDocument();
		expect(getByText('Paid')).toBeInTheDocument();
		expect(getByText('100')).toBeInTheDocument();
		expect(getByText('80')).toBeInTheDocument();
		expect(getByText('20')).toBeInTheDocument();
	});
});
