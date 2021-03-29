import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const StockPage = ({match}) => {
    const {
        params: { symbol },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`https://api.thepoliticalmarket.tech/v1/matchedstock/${symbol}`, {})
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [symbol]);
  
    return (
      <>
      {!isLoading && (
        <>
          <h1>Symbol: {data.Symbol}</h1>
          <h2>Full Name: {data.Full_Name}</h2>
          <h2>Last Sale: {data.Last_Sale}</h2>
          <h2>Net Change: {data.Net_Change}</h2>
          <h2>% Change: {data.Percentage_Change}</h2>
          <h2>Market Cap: {data.Market_Cap}</h2>
          <h2>Country: {data.Country}</h2>
          <h2>IPO Year: {data.IPO_Year}</h2>
          <h2>Volume: {data.Volume}</h2>
          <h2>Sector: {data.Sector}</h2>
          <h2>Industry: {data.Industry}</h2>
          <h2>Orgname: {data.Orgname}</h2>
          <h2>State: {data.State}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
    );
}

export default StockPage;