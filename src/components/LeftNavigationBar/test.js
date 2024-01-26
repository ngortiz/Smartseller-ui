import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import LeftNavigationBar from '../LeftNavigationBar'

test('checks that the LeftNavigationBar component renders correctly', () => {
  // Render the component
  render(<LeftNavigationBar />)

  // Check that the component is present
  const leftNavigationBar = screen.getByTestId('leftNavigationBar')
  expect(leftNavigationBar).toBeInTheDocument()
})
