import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

var getRandomColor = function(){
  return '#'+(Math.random()*0xffffff<<0).toString(16); 
}

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
          {/* <h1>Symbol: {data.Symbol}</h1>
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
          <h2>State: {data.State}</h2> */}
          <div className = "container">
            <div className='row'>
              <div className="col-sm-12" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h1> Symbol: {data.Symbol}</h1>
              <div className="col-sm-3" style={{'textAlign':'center','backgroundColor':getRandomColor(), 'color':getRandomColor()}}></div>
              <h3>Full Name: {data.Full_Name}</h3>
          </div>
          <br></br>
              <div className="col-sm-4" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h3>Last Sale: {data.Last_Sale}</h3>
              </div>
              <div className="col-sm-6" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h3>Net Change: {data.Net_Change}%</h3></div>
              <div className="col-sm-8" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h2>Market Cap: {data.Market_Cap}</h2></div> <h2>Volume: {data.Volume}</h2>
              <h3>Sector: {data.Sector}</h3><br></br>
              <div className="col-sm-8" style={{'textAlign':'right','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h2>Industry: {data.Industry}</h2>
              </div>
              <div className="col-sm-2" style={{'textAlign':'right','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h2>Country:</h2> </div> <h2>{data.Country}</h2>
              <div className="col-sm-9" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h2>State: {data.State}</h2></div>
              <div className="col-sm-7" style={{'textAlign':'left','backgroundColor':getRandomColor(), 'color':getRandomColor()}}>
              <h2>IPO Year: {data.IPO_Year}</h2>
              </div>
          
         </div>
        </div>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
    );
}

export default StockPage;
