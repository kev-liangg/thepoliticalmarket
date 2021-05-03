// import { gridCheckboxSelectionColDef } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import './ContractPage.css'
import StateMap from "../Components/StateMap";
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid'

const stockColumns = [
  { field: 'Full_Name', headerName: 'Company Name', width: 650},
  { field: 'Symbol', headerName: 'Go to Page', width: 200,
    renderCell: (params) => ( <>
      {console.log(params)}
      <Button
        component={Link} to={`/Stocks/${params.value}`}
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 4 }}>
        Page
      </Button>
    </>)}
]

const candColumns = [
  { field: 'cand_firstname', headerName: 'Candidate Name', width: 650,
    renderCell: (params) => {
      return `${params.row.cand_firstname} ${params.row.cand_lastname}`
    }
  },
  { field: 'cand_crp_id', headerName: 'Go to Page', width: 200,
    renderCell: (params) => ( <>
      {console.log(params)}
      <Button
        component={Link} to={`/CampFin/${params.value}`}
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 4 }}>
        Page
      </Button>
    </>)}
]

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
                <div style={{height: 650}}>
                  <DataGrid 
                      rows={data.cands_in_state} 
                      columns={candColumns} 
                      pageSize={10}
                      getRowId={(row)=>row.cand_crp_id}
                    />
                  </div>
            </div>
            <div className="col-sm-6">
              <h2 style={{'textAlign':'center','color':'black'}}> Companies Headquartered in {data.contract_sop}</h2>
                <div style={{height: 650}}>
                  <DataGrid 
                    rows={data.stocks_in_state} 
                    columns={stockColumns} 
                    pageSize={10}
                    getRowId={(row)=>row.Symbol}
                  />
                 </div>
            </div>
           
           </div>
           <br></br>
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