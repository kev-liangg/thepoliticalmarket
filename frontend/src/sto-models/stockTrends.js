import React, { Component } from 'react';
import "./stockTrends.css";
import StoTable from '../StoTable.js';

export const toy_data = [
  {
    'Company': 'Apple Inc',
    'Time': '2021-03-01',
    'Symbols': 'AAPL',
    'Buy': 23,
    'Hold': 8,
    'Sell': 1,
    'StrongBuy': 13,
    'StrongSell': 1,
  },
  {
    'Company': 'HP Inc',
    'Time': '2021-03-01',
    'Symbols': 'HPQ',
    'Buy': 7,
    'Hold': 8,
    'Sell': 3,
    'StrongBuy': 3,
    'StrongSell': 0,
  },
  {
    'Company': 'Dell Inc',
    'Time': '2021-03-01',
    'Symbols': 'DELL',
    'Buy': 12,
    'Hold': 9,
    'Sell': 0,
    'StrongBuy': 6,
    'StrongSell': 0,
  },
]

class StockTrends extends React.Component {
  render() {
    return (
      <div className="App">
        <br />
        <br />
        <h2>Recommendation Trends</h2>
        <br />
        <br />
        <br />
        <StoTable characterData={toy_data} />
        <br />
        <div class="ml-4"><div class="pt-2"><div></div><p>The indeces mean the number of Recommendationstaht fall into that category</p></div><div class="horizontal-line"></div><div class="horizontal-line"></div></div>
      </div>

    )
  }
}
export default StockTrends;
