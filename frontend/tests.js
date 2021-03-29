import { render } from '@testing-library/react';
import React from 'react';

test('successfully run test harness', () => {
    expect(1 + 1).toBe(2)
});

import App from './src/App'
test('renders App component', () => {
    render(<App />);
});