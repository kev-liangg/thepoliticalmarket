import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import StateMap from "../../Components/StateMap";





function getRandomColor () {
  var x = (Math.random()*0.3)*0xffffff<<0;
 
  var contrastFactor = 80;

  // smaller number, bigger contrast.

  var r = Math.random()*contrastFactor + 16;
  var g = Math.random()*contrastFactor + 16;
  var b = Math.random()*contrastFactor + 16;

  var lighterFix = 32;

  // bigger number, brighter text

  var dark =
  Math.floor(r +lighterFix).toString(16) +
  Math.floor(g+lighterFix).toString(16) +
  Math.floor(b+lighterFix).toString(16);
   // + 16 to prevent any chanels of the color overflow


  var reverse = 
  Math.floor(256 - r +16).toString(16) +
  Math.floor(256 - g +16).toString(16) +
  Math.floor(256 - b +16).toString(16);

  return new Array(reverse,dark);
}


function getDarkColor() {
  return '#' + getRandomColor()[1];
}

function getBrightColor() {
  return '#' + getRandomColor()[0];
}

const StockPage = ({match}) => {
    const {
        params: { symbol },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
  
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

    if (isLoading) {
      return <h2>Loading...</h2>
    }
    return (
          
          <div className = "container">
            <div className='row'>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h1> Symbol: {data.Symbol}</h1>
              </div>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h3>Full Name: {data.Full_Name}</h3>
              </div>
              <br></br>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h3>Last Sale: {data.Last_Sale}</h3>
              </div>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h3>Net Change: {data.Net_Change}%</h3></div>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>Market Cap: {data.Market_Cap}</h2></div> 
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>Volume: {data.Volume}</h2></div>

              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h3>Sector: {data.Sector}</h3></div>
    
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>Industry: {data.Industry}</h2>
              </div>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>Country: {data.Country}</h2>
              </div> 
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>State: {data.State}</h2>
              </div>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getBrightColor(), 'color':getDarkColor()}}>
                <h2>IPO Year: {data.IPO_Year}</h2>
              </div>
            </div>
            <br></br>
            <h2>Stock Prices for the 2020 Cycle (2018-2020)</h2>
            <iframe title='chart' frameBorder='0' scrolling='no' width='930' height='420' src={'https://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=A184C371FC7341B4BFFA592228916F4A&symbol='+data.Symbol+'&days=730&dividends=true&splits=true&palette=Financial-Light'}>
            </iframe>
            <StateMap state={data.State} />
            <br></br>
            <div className="row">
              <div className="col-sm-4">
                <h4 style={{'textAlign':'center'}}>Contracts Performed in {data.State}</h4>
                <ul style={{'textAlign':'left', 'listStylePosition':'inside'}}>
                {
                  data.contracts_in_state.slice(0,5).map((contract)=>{
                    return <li>
                            <Link to={`/Contracts/${contract.id}`}>Contract ID = {contract.id}</Link> 
                           </li>;
                  })
                }
                </ul>
              </div>
              <div className="col-sm-4">
                <h4 style={{'textAlign':'center'}}>Congress Politicians in {data.State}</h4>
                <ul style={{'textAlign':'left', 'listStylePosition':'inside'}}>
                {
                  data.cands_in_state.slice(0,5).map((candidate)=>{
                    return <li>
                            <Link to={`/CampFin/${candidate.cand_crp_id}`}>{candidate.cand_firstname} {candidate.cand_lastname} </Link>
                          </li>;
                  })
                }
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12" style={{'textAlign':'left'}}>
                <Link to=".">  <h3>Back to StockModel</h3></Link>
              </div>
              <div className="col-sm-6" style={{'textAlign':'left'}}>
                <Link to="/">  <h3>Back to homepage</h3></Link>
              </div>
            </div>
          </div>
          
    );
}
export default StockPage;
