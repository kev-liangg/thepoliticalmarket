import { render, screen, fireEvent, act, findByText } from '@testing-library/react';
import React from 'react';
import App from './src/App'
import { BrowserRouter } from 'react-router-dom';
import Home from './src/Components/Home'
import NavigationBar from './src/Components/NavigationBar'
import Members from './src/cf-models/Members'
import MemberPage from './src/cf-models/MemberPage'
import Stocks from './src/sto-models/sto-instances/Stocks'
import StockPage from './src/sto-models/sto-instances/StockPage'
import Contracts from './src/gov-models/Contracts'
import ContractPage from './src/gov-models/ContractPage'
import { contractData, stockData, candidateData } from './__mocks__/data'
import '@testing-library/jest-dom'

test('successfully run test harness', () => {
    expect(1 + 1).toBe(2)
});

test('render root app page', () => {
    render(<App />);
    expect(screen.getByText("The Political Market")).toBeInTheDocument();
});

test('render home page', () => {
    render( <BrowserRouter><Home /></BrowserRouter>);
    expect(screen.getByText("The Political Market")).toBeInTheDocument();
});

test('render navigation bar', () => {
    render(
        <BrowserRouter>
            <NavigationBar />
        </BrowserRouter>
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
        render(
            <BrowserRouter>
                <Contracts />
            </BrowserRouter>
            );
    });

    expect(screen.getByText("Contract Page")).toBeInTheDocument();
    expect(screen.getByText("Award ID")).toBeInTheDocument();
    expect(screen.getByText("Recipient")).toBeInTheDocument();
    expect(screen.getByText("Contract Value")).toBeInTheDocument();
    expect(screen.getByText("Award Date")).toBeInTheDocument();
    expect(screen.getByText("NAICS")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Congressional District")).toBeInTheDocument();

    expect(screen.getByText("Search Contracts")).toBeInTheDocument();
    expect(screen.getByText("Filters:")).toBeInTheDocument();
});

test('render stock model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(
            <BrowserRouter>
                <Stocks />
            </BrowserRouter>
        );
    });

    expect(screen.getByText("Stock Page")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Last Sale")).toBeInTheDocument();
    expect(screen.getByText("Net Change")).toBeInTheDocument();
    expect(screen.getByText("% Change")).toBeInTheDocument();
    expect(screen.getByText("Market Cap (k)")).toBeInTheDocument();
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByText("IPO Year")).toBeInTheDocument();
    expect(screen.getByText("Sector")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();

    expect(screen.getByText("Search Stocks")).toBeInTheDocument();
    expect(screen.getByText("Filters:")).toBeInTheDocument();
});

test('render candidate model page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({objects: []})
    }));

    await act(async () => {
        render(
            <BrowserRouter>
                <Members />
            </BrowserRouter>
        );
    });

    expect(screen.getByText("Campaign Finance")).toBeInTheDocument();

    expect(screen.getByText("1. Filter")).toBeInTheDocument();
    expect(screen.getByText("2. Sort")).toBeInTheDocument();
    expect(screen.getByText("3. Search")).toBeInTheDocument();

    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    expect(screen.getByText("View Filters")).toBeInTheDocument();
    expect(screen.getByText("Clear Sorting")).toBeInTheDocument();
});

test('render contract instance', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(contractData)
    }));

    const match = { params: 1 }

    await act(async () => {
        render(
            <BrowserRouter>
                <ContractPage match={match}/>
            </BrowserRouter>
        );
    });
});

test('render stock instance', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(stockData)
    }));

    const match = { params: "AAPL" }

    await act(async () => {
        render(
            <BrowserRouter>
                <StockPage match={match}/>
            </BrowserRouter>
        );
    });
});

test('render candidate instance', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(candidateData)
    }));

    const match = { params: "N00000078" }

    await act(async () => {
        render(
            <BrowserRouter>
                <MemberPage match={match}/>
            </BrowserRouter>
        );
    });
});