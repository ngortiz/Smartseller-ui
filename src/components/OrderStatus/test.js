import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderStatus from '../OrderStatus';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18nForTests'; // Ajusta la ruta si es necesario

// Mock function for onSearchClick
const mockOnSearchClick = jest.fn();

test('renders OrderStatus component with amount and background', () => {
	const testData = {
		color: 'blue',
		amount: 100,
		status: 'Processing',
		startDate: new Date(), // Usar objeto Date
		endDate: new Date(), // Usar objeto Date
	};

	const { getByText, getByTestId } = render(
		<I18nextProvider i18n={i18n}>
			<OrderStatus
				color={testData.color}
				amount={testData.amount}
				status={testData.status}
				onSearchClick={mockOnSearchClick}
				startDate={testData.startDate} // Asegúrate de que el componente maneje objetos Date
				endDate={testData.endDate} // Asegúrate de que el componente maneje objetos Date
			/>
		</I18nextProvider>,
	);

	// Check the presence of the amount text and the Card component background
	const amountElement = getByText(testData.amount.toString());
	const cardContainer = getByTestId('order-status-card');

	// Verify that the elements are present
	expect(amountElement).toBeInTheDocument();
	expect(cardContainer).toHaveStyle(`background: ${testData.color}`);
});
