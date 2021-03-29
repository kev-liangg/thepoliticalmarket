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
          <div className="col-sm-6" style={{'textAlign':'left','backgroundColor':getRandomColor()}}>
          <Link to=".">  <h2>Back to StockModel</h2></Link>
          </div>
          <div className="col-sm-9" style={{'textAlign':'center','backgroundColor':getRandomColor()}}>
          <Link to="/">  <h2>Back to homepage</h2></Link>
          </div>
        </>
      )}
    </>
    );
}

export default StockPage;
