import React from 'react';
import raph_warnock from "./Raphael_Warnock.jpg";
import pplc_data from "./PropublicaData";

function CfRWarnock() {
    const data = pplc_data[2]
    const polColor = data["results"][0]["party"]==="DEM" ? 'LightBlue':'LightCoral'
    return (
        <div>
            <h1 style={{'textAlign':'center'}}> Raphael Warnock </h1>
            <img className="rounded mx-auto d-block" src={raph_warnock} alt="" width="384" height="256"></img>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" style={{'backgroundColor': polColor}}>
                        <h3 style={{'textAlign':'center'}}> Political Information</h3>
                        <p style={{'textAlign':'center'}}>
                            id: {data["results"][0]["id"]} <br></br>
                            party:  {data["results"][0]["party"]} <br></br>
                            office: {data["results"][0]["id"].charAt(0)==='S' ? 'Senate':'House'} <br></br>
                            state: {data["results"][0]["mailing_state"]} <br></br>
                        </p>
                    </div>
                    <div className="col-sm-6"  style={{'backgroundColor':'LightGrey'}}>
                        <h3 style={{'textAlign':'center'}}> Campaign Finance</h3>
                        <p style={{'textAlign':'center'}}>
                            Dates: {data["results"][0]["date_coverage_from"]} to {data["results"][0]["date_coverage_to"]} <br></br>
                            PAC total: ${data["results"][0]["total_from_pacs"]} <br></br>
                            Individuals total: ${data["results"][0]["total_from_individuals"]} <br></br>
                            Total Received: ${data["results"][0]["total_contributions"]} <br></br>
                            Total Disbursements: {data["results"][0]["total_disbursements"]} <br></br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CfRWarnock;
