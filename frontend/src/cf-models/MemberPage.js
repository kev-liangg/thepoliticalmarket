import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
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

const contractColumns = [
  { field: 'contract_recipient', headerName: 'Recipient', width: 650},
  { field: 'id', headerName: 'Go to Page', width: 200,
  renderCell: (params) => ( <>
    {console.log(params)}
    <Button
      component={Link} to={`/Contract/${params.value}`}
      variant="contained"
      color="primary"
      size="small"
      style={{ marginLeft: 4 }}>
      Page
    </Button>
  </>)}
]

const MemberPage = ({match}) => {
    const {
        params: { candId },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`https://api.thepoliticalmarket.tech/v1/candidate/${candId}`, {})
        .then((res) => res.json())
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [candId]);
    
    function getContribInfo() {
      let count = 0;
      return data.contributions.map(element => {
        // let labels = <div className='col-sm-4' style={{'fontWeight':'800'}}>
        //               Contributor Org <br></br>
        //               Pac Contributions<br></br> 
        //               Individual Contributions<br></br>
        //               Total Contributions<br></br>
        //             </div>
        let org_name = <div className='col-sm-3'>{element.org_name}</div>;
        let pacs = <div className='col-sm-3'>{element.pacs}</div>;
        let indivs = <div className='col-sm-3'>{element.indivs}</div>;
        let total = <div className='col-sm-3'>{element.total}</div>;
                      
                       
        if (count%2===0) {
          count = count + 1;
          return <div key={element.contrib_id} className="row" style={{'backgroundColor':'lightgray', 'color':'gray', 'textAlign':'center'}}>{org_name}{pacs}{indivs}{total}</div>;
        } else {
          count = count + 1;
          return <div key={element.contrib_id} className="row" style={{'backgroundColor': 'gray', 'color':'lightgray', 'textAlign':'center'}}>{org_name}{pacs}{indivs}{total}</div>;
        }
      })
    }


    if (isLoading) {
      return <h2>Loading...</h2>
    }
    let polColor = 'Gray'
    if (data.cand_party === 'D')
      polColor = 'Blue'
    if (data.cand_party === 'R')
      polColor = 'Red'
    return (
      <div>
        
        <div className="container">
          <div className="row">
            <div className="col-sm-12" style={{'textAlign':'center','backgroundColor':'black', 'color':'white'}}>
              <h1> {data.cand_firstname} {data.cand_lastname}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6" style={{'backgroundColor': 'black'}}>
             <img className="rounded mx-auto d-block" src={data.cand_image} alt="" width="100%"></img>
            </div>
            <div className="col-sm-6" style={{'backgroundColor': polColor, 'color':'white'}}>
              <br></br>
              <h2 style={{'textAlign':'center'}}> Candidate Information</h2>
              <br></br>
              <div className="row">
                <div className="col-sm-4" style={{'color':'white', 'textAlign':'center', 'fontWeight':'900'}}>
                  <br></br>
                  Cycle <br></br><br></br>
                  First <br></br><br></br>
                  Last <br></br><br></br>
                  OpenSecrets ID <br></br><br></br>
                  Office <br></br><br></br>
                  Party <br></br><br></br>
                  State <br></br><br></br>
                  Total Received <br></br><br></br>
                </div>
                <div className="col-sm-8">
                  <br></br>
                  {data.cycle} <br></br><br></br>
                  {data.cand_firstname} <br></br><br></br>
                  {data.cand_lastname} <br></br><br></br>
                  {data.cand_crp_id} <br></br><br></br>
                  {data.cand_office} <br></br><br></br>
                  {data.cand_party} <br></br><br></br>
                  {data.cand_state} <br></br><br></br>
                  {data.total_received} <br></br><br></br>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-sm-12" style={{'backgroundColor':'black'}}>
              <br></br>
              <h2 style={{'textAlign':'center', 'color':'gray'}}> Contributions Received</h2> <br></br>
              <div className="row" style={{'textAlign':'center'}}>
                <div className="col-sm-3">Contributor Org Name</div>
                <div className="col-sm-3">Pac Contributions ($)</div>
                <div className="col-sm-3">Individual Contributions ($)</div>
                <div className="col-sm-3">Total Contributions ($)</div>
              </div>

              {getContribInfo()}

            </div>
          </div>
          <br></br>
          <StateMap state={data.cand_state} />
          <br></br>
          <div className="row">
            <div className="col-sm-6">
              <h2 style={{'textAlign':'center'}}>Stocks Headquartered in {data.cand_state}</h2>
                <div style={{height: 650}}>
                  <DataGrid 
                    rows={data.stocks_in_state} 
                    columns={stockColumns} 
                    pageSize={10}
                    getRowId={(row)=>row.Symbol}
                  />
                </div>
            </div>
            <div className="col-sm-6">
              <h2 style={{'textAlign':'center'}}>Contracts Performed in {data.cand_state}</h2>
                <div style={{height: 650}}>
                  <DataGrid 
                    rows={data.contracts_in_state} 
                    columns={contractColumns} 
                    pageSize={10}
                    getRowId={(row)=>row.Symbol}
                  />
                </div>
            </div>
          </div>
        </div>
        {/* <h1>first name: {data.cand_firstname}</h1>
        <h2>image: {data.cand_image}</h2>
        <h2>last name: {data.cand_lastname}</h2>
        <h2>office: {data.cand_office}</h2>
        <h2>party: {data.cand_party}</h2>
        <h2>state: {data.cand_state}</h2>
        <Link to="/">Back to homepage</Link> */}
      </div>
    );
}

export default MemberPage;