import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import StateMap from "../../Components/StateMap";
import { Card, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { DataGrid } from '@material-ui/data-grid'
import { Button } from '@material-ui/core'

const candColumns = [
  { field: '', headerName: 'Candidate Name', width: 550,
    renderCell: (params) => {
      return `${params.row.cand_firstname} ${params.row.cand_lastname}`
    }
  },
  { field: 'cand_crp_id', headerName: 'Go to Page', width: 200,
    renderCell: (params) => ( <>
      <Button
        component={Link} to={`/CampFin/${params.value}`}
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 4 }}>
        Page
      </Button>
    </>)
    }
]

const contractColumns = [
  { field: 'contract_recipient', headerName: 'Recipient', width: 550},
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

function getRandomColor () {
  var x = (Math.random()*0.3)*0xffffff<<0;
 
  var contrastFactor = 70;

  // smaller number, bigger contrast.

  var r = Math.random()*contrastFactor + 16;
  var g = Math.random()*contrastFactor + 16;
  var b = Math.random()*contrastFactor + 16;

  var lighterFix = 30;

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
          <Container fluid style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", 
            textAlign: "center", 'color': getDarkColor(), 'background': getBrightColor()
        }}>   
               
            <Row >             
                {
                  <>
                  <Col>
                    <Card style={{ width: '85vw',marginTop: "5vw",}}>
                      <Card.Body>
                        <Card.Title as="h1">{data.Symbol}
                        </Card.Title>
                     
                        <div className='row'>
                          <div className="col-sm-12" style={{'textAlign':'centered'}}>
                            <h4>{data.Full_Name}</h4>IPO Year: {data.IPO_Year}
                            <br></br>                
                          </div>
                          <div className="col-sm-12" style={{'textAlign':'centered'}}>
                            <br></br><h6>Stock Prices for the 2020 Cycle (2019-2021)</h6>
                          </div>
                          <br></br>
                          <iframe title='chart' frameBorder='0' scrolling='no' width='930' height='420' src={'https://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=A184C371FC7341B4BFFA592228916F4A&symbol='+data.Symbol+'&days=730&dividends=true&splits=true&palette=Financial-Light'}>
                          </iframe>
                        </div>
                          <br></br>
                        <div className='row'>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Last Sale</h5> {data.Last_Sale}
                          </div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Net Change</h5> {data.Net_Change} %
                          </div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h6>Market Capacity</h6> {data.Market_Cap}
                          </div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Volume</h5> {data.Volume}
                          </div>
                        </div><br></br>       
                        <div className='row'>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Sector</h5>{data.Sector}</div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Industry</h5>{data.Industry}</div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>Country</h5>{data.Country}</div>
                          <div className="col-sm-3" style={{'textAlign':'centered'}}>
                            <h5>State</h5>{data.State}
                          </div>
                        </div>
                        <br></br>
                        <StateMap state={data.State} />
                        <br></br>
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 style={{'textAlign':'center'}}>Contracts Performed in {data.State}</h5>
                            <div style={{height: 700}}>
                              <DataGrid 
                                rows={data.contracts_in_state} 
                                columns={contractColumns} 
                                pageSize={10}
                                getRowId={(row)=>row.id}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <h5 style={{'textAlign':'center'}}>Congress Politicians in {data.State}</h5>
                            <div style={{height: 700}}>
                            <DataGrid 
                              rows={data.cands_in_state} 
                              columns={candColumns} 
                              pageSize={10}
                              getRowId={(row)=>row.cand_crp_id}
                            />
                            </div>
                          </div>
                        </div>
                      </Card.Body>          
                    </Card>
                    <br></br>
                    <Link to=".">  <h6 style={{'textAlign':'right','color':getDarkColor()}}>Back to StockModel</h6></Link>
                    <Link to="/">  <h6 style={{'textAlign':'right','color':getDarkColor()}}>Back to Homepage</h6></Link>
                    <br></br>
                  </Col>
                  </>
                }
            </Row>     
          </Container>
    )
}
export default StockPage;
