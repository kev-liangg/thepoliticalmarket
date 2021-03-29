import { render } from '@testing-library/react';
import React from 'react';
import App from './src/App'

test('successfully run test harness', () => {
    expect(1 + 1).toBe(2)
});

test('renders App component', () => {
    render(<App />);
});