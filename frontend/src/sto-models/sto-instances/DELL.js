import React from "react";
import "./DELL.css";
import { toy_data } from "../stockTrends";
import dell_5 from "./DELL_5Year.PNG";

function DELL() {
    return (
        <div>
            <br></br>
            {/*&nbsp;&nbsp;&nbsp;&nbsp;DELL Inc*/}
            <br></br>
            <div className='container'>
                <div className="row">
                    <div className='col-sm-4'>
                        <h1>DELL Inc</h1>
                        <p class="card-text">Updated period: {toy_data[2]['Time']}</p>
                        <p class="card-text">Symbols for the Company: {toy_data[2]['Symbols']}</p>
                        <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[2]['Buy']}</p>
                        <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[2]['Hold']}</p>
                        <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[2]['Sell']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[2]['StrongBuy']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[2]['StrongSell']}</p>
                        <li>
                        <a href={"/CampFin/JHarrison"}>CfJ Harrison</a>
                        </li>
                    </div>
                    <div className='col-sm-8'>
                        <h3>DELL 5 Years</h3>
                        <img src={dell_5} alt="" width="576" height="384"></img>
                    </div>
                </div>
            </div>
            <br></br>
            {/*Plan to put hitory trend here for next time</p>*/}

            <div className = "container">
        <div className='row'>
          <div className="col-sm-12" style={{'textAlign':'center','backgroundColor':'pink', 'color':'white'}}>
          </div>
        </div>
      </div>

      
        </div>
    )
}
export default DELL;
