// import { gridCheckboxSelectionColDef } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import './ContractPage.css'
import StateMap from "../Components/StateMap";
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
          <div className = "container">
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
                <h4>
                  Awarding Agency: {data.contract_recipient}
                </h4>
                <img alt="" src = {data.contract_agencylogo}></img>
                <h4>Award Description: {data.contract_award_description}</h4>
                <h3> Place of Performance: {data.contract_sop}</h3>
      
                <img alt="" src = {data.contract_stateflag} ></img>
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
          </div>
          <StateMap state = {data.contract_sop}>
           </StateMap>
           <Link to="/">Back to homepage</Link>
           <div className = "row">
           <div className="col-sm-6">
              <h2 style={{'textAlign':'center'}}> Federal Politicians in {data.contract_sop}</h2>
                <ul style={{'textAlign':'center', 'listStylePosition':'inside'}}>
                {
                  data.cands_in_state.slice(0,5).map((candidate)=>{
                    return <li>
                            <Link to={`/CampFin/${candidate.cand_crp_id}`}>{candidate.cand_firstname} {candidate.cand_lastname} </Link>
                          </li>;
                  })
                }
                </ul>
            </div>
            <div className="col-sm-6">
              <h2 style={{'textAlign':'center'}}> Companies Headquartered in {data.contract_sop}</h2>
                <ul style={{'textAlign':'center', 'listStylePosition':'inside'}}>
                {
                  data.stocks_in_state.slice(0,5).map((stock)=>{
                    return <li>
                            <Link to={`/CampFin/${stock.Symbol}`}> {stock.Full_Name} </Link>
                          </li>;
                  })
                }
                </ul>
            </div>
           </div>
        </div>
        // <>
        //   <h1 className = "primary"> Award ID: {data.contract_award_id}</h1>
        //   <h2>Awarding Agency: {data.contract_parentagency}</h2>
        //   <img alt="" src = {data.contract_agencylogo}></img>
        //   <h2>Current value: ${data.contract_currentval}</h2>
        //   <h2>Award Description: {data.contract_award_description}</h2>
        //   <h2>Recipient Name: {data.contract_recipient}</h2>
        //   <h2>Contract Naics Code: {data.contract_naics}</h2>
        //   <h2>Contract Naics Description: {data.contract_naics_description}</h2>
        //   <h2>Contract State of Performance: {data.contract_sop}</h2>
        //   <h2>Date Awarded: {data.contract_date}</h2>
        //   <h2>Contract Recipient's Congressional District: {data.contract_recipient_district}</h2>
        //   <h2>Contract Recipient's Address: {data.contract_recipient_address}</h2>
        //   <img alt="" src = {data.contract_stateflag} ></img>
        //   <StateMap state = {data.contract_sop}>
        //   </StateMap>
        //   <Link to="/">Back to homepage</Link>
        // </>
      )}
    </>
    );
}

export default ContractPage;