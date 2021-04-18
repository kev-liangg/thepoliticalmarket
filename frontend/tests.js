import { render, screen, fireEvent, act, findByText } from '@testing-library/react';
import React from 'react';
import App from './src/App'
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './src/Components/Home'
import NavigationBar from './src/Components/NavigationBar'
import Members from './src/cf-models/Members'
import MemberPage from './src/cf-models/MemberPage'
import Stocks from './src/sto-models/sto-instances/Stocks'
import StockPage from './src/sto-models/sto-instances/StockPage'
import Contracts from './src/gov-models/Contracts'
import ContractPage from './src/gov-models/ContractPage'
import '@testing-library/jest-dom'

test('successfully run test harness', () => {
    expect(1 + 1).toBe(2)
});

test('render root app page', () => {
    render(<App />);
    expect(screen.getByText("The Political Market")).toBeInTheDocument();
});

test('render home page', () => {
    render(<Home />);
    expect(screen.getByText("The Political Market")).toBeInTheDocument();
});

test('render navigation bar', () => {
    render(
        <Router>
            <NavigationBar />
        </Router>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contracts")).toBeInTheDocument();
    expect(screen.getByText("Stocks")).toBeInTheDocument();
    expect(screen.getByText("Campaign Finance")).toBeInTheDocument();
    expect(screen.getByText("Site Search")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
});

test('render contract model page', async () => {
    // need to mock the api fetch for all dynamically-loading pages
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<Contracts />);
    });

    expect(screen.getByText("Contract Page")).toBeInTheDocument();
    expect(screen.getByText("Award ID")).toBeInTheDocument();
    expect(screen.getByText("Recipient")).toBeInTheDocument();
    expect(screen.getByText("Contract Value")).toBeInTheDocument();
    expect(screen.getByText("Award Date")).toBeInTheDocument();
    expect(screen.getByText("NAICS")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Congressional District")).toBeInTheDocument();
});

test('render stock model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<Stocks />);
    });

    expect(screen.getByText("Stock Page")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Last Sale")).toBeInTheDocument();
    expect(screen.getByText("Net Change")).toBeInTheDocument();
    expect(screen.getByText("% Change")).toBeInTheDocument();
    expect(screen.getByText("Market Capacity (k)")).toBeInTheDocument();
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByText("IPO Year")).toBeInTheDocument();
    expect(screen.getByText("Sector")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
});

test('render candidate model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<Members />);
    });

    expect(screen.getByText("Campaign Finance")).toBeInTheDocument();

    expect(screen.getByText("1. Filter")).toBeInTheDocument();
    expect(screen.getByText("2. Sort")).toBeInTheDocument();
    expect(screen.getByText("3. Search")).toBeInTheDocument();

    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    expect(screen.getByText("View Filters")).toBeInTheDocument();
    expect(screen.getByText("Clear Sorting")).toBeInTheDocument();
});