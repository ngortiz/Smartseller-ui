import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeftNavigationBar from '../LeftNavigationBar';

// Mock para import.meta.env
beforeAll(() => {
	Object.defineProperty(import.meta, 'env', {
		value: { VITE_HOME_PAGE: 'http://localhost' },
	});
});

test('checks that the LeftNavigationBar component renders correctly', () => {
	// Render the component
	render(<LeftNavigationBar />);

	// Check that the component is present
	const leftNavigationBar = screen.getByTestId('leftNavigationBar');
	expect(leftNavigationBar).toBeInTheDocument();
});
