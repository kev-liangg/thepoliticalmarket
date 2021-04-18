// import { gridCheckboxSelectionColDef } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import './ContractPage.css'
import StateMap from "../Components/StateMap";
import Button from '@material-ui/core/Button';
const ContractPage = ({match}) => {
    const {
        params: { awardId },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`https://api.thepoliticalmarket.tech/v1/contract/${awardId}`, {})
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [awardId]);
  
    return (
      <>
      {!isLoading && (
        <div>
          <div className = "container" fluid = 'true'>
            <div className="row">
              <div className="col-sm-12" style={{'textAlign':'center', 'color':'black'}}>
                <h1> Contract ID</h1>
                <h1> {data.contract_award_id}</h1>
              </div>
          </div>
          <div className = "row">
          <div className="col-lg-6" style={{'textAlign':'center', 'color':'black'}}>
                <h3> Contract Information</h3>
              <div className = "row" style = {{'textAlign':'left'}}>
              <img alt="" src = {data.contract_agencylogo} width="50%"></img>
                <h4>
                  Awarding Agency: {data.contract_recipient}
                </h4>
                <h4>Award Description: {data.contract_award_description}</h4>
                <h3> Place of Performance: {data.contract_sop}</h3>
                <img alt="" src = {data.contract_stateflag} width="50%" ></img>
                <h4>
                  Date Awarded: {data.contract_date}</h4>
              </div>
              </div>
          <div className="col-lg-6" style={{'textAlign':'left', 'color':'black'}}>
                <h3> Contracter Information</h3>
                <h4> Contractor Name {data.contract_recipient}</h4>
                <h4> Industry Code: {data.contract_naics}
                </h4>
                <h4>
                  Industry Description: {data.contract_naics_description}
                </h4>
                <h4>
                  Contractor Address: {data.contract_recipient_address}
                </h4>
                <h4>Contractor's Congressional District: {data.contract_recipient_district}</h4>
              </div>
          </div>
          
           <div className = "row">
           <div className="col-sm-6">
              <h2 style={{'textAlign':'center','color':'black'}}> Congress Politicians in {data.contract_sop}</h2>
                <table style={{'textAlign':'center', 'listStylePosition':'inside', 'border': '1px solid black'}}>
                <tbody>
                {
                  data.cands_in_state.slice(0,5).map((candidate)=>{
                    return <tr key={candidate.cand_crp_id}>
                            <td>
                            <Link to={`/CampFin/${candidate.cand_crp_id}`}>{candidate.cand_firstname} {candidate.cand_lastname} </Link>
                            </td>
                            <td>
                            <Button
                          component={Link} to={`/CampFin/${candidate.cand_crp_id}`}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}>
                          Page
                        </Button>
                            </td>
                          </tr>;
                  })
                }
                </tbody>
                </table>
            </div>
            <div className="col-sm-6">
              <h2 style={{'textAlign':'center','color':'black'}}> Companies Headquartered in {data.contract_sop}</h2>
                <table style={{'textAlign':'center', 'listStylePosition':'inside'}}>
                  <tbody>
                {
                  data.stocks_in_state.slice(0,5).map((stock)=>{
                    return <tr key={stock.Symbol}>
                          <td>
                          <Link to={`/Stocks/${stock.Symbol}`}>{stock.Full_Name} </Link>
                          </td>
                          <td>
                          <Button
                        component={Link} to={`/Stocks/${stock.Symbol}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 4 }}>
                        Page
                      </Button>
                          </td>
                        </tr>;
                  })
                }
                </tbody>
                </table>
            </div>
           
           </div>
           <div className = "row">
           <div className="col-lg-12" style={{'textAlign':'center'}}>
           <StateMap state = {data.contract_sop}>
           </StateMap>      
           </div>
           
           </div>
           <div className = "row"> 
           <div className="col-lg-6" >
           <Link to="/">Back to homepage</Link>
           </div>
           <div className="col-lg-6" style={{'textAlign':'right'}}>
           <Link to="/Contracts">Back to Contracts</Link>
           </div>
           </div>
        </div>
        </div>
      )}
    </>
    );
}

export default ContractPage;