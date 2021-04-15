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
    expect(screen.getByText("About")).toBeInTheDocument();
});

// todo: fix resolve potential formatting warnings related to datagrid

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
});

test('render stock model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<Stocks />);
    });

    expect(screen.getByText("Index")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
});

test('render stock model instance page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<StockPage />);
    });

    expect(screen.getByText("Contracts Performed in TX")).toBeInTheDocument();
    expect(screen.getByText("Congress Politicians in TX")).toBeInTheDocument();
});

test('render candidate model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(<Members />);
    });

    expect(screen.getByText("Campaign Finance")).toBeInTheDocument();
});