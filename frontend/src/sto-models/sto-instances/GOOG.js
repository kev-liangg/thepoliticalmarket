import React from "react";
import "./GOOG.css";
import { toy_data } from "../stockTrends";
<<<<<<< HEAD
import aapl_5 from "./AAPL_5Year.PNG"


=======
>>>>>>> origin/master
function GOOG() {
    return (
        <div>
            <br></br>
            {/*&nbsp;&nbsp;&nbsp;&nbsp;Apple Inc*/}
            <br></br>
            <div className="container">
                <div className="row">
                    <div className='col-sm-4'>
                        <h1>Google Inc</h1>
                        <br></br>
                        <p class="card-text">Updated period: {toy_data[0]['Time']}</p>
                        <p class="card-text">Symbols for the Company: {toy_data[0]['Symbols']}</p>
                        <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[0]['Buy']}</p>
                        <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[0]['Hold']}</p>
                        <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[0]['Sell']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[0]['StrongBuy']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[0]['StrongSell']}</p>
                        <li>
                        <a href={"/CampFin/TJOssoff"}>TJ Ossof</a>
                        </li>
                    </div>
                    <div className='col-sm-8'>
                        <h3>GOOG 5 Years</h3>
                        <img src={aapl_5} alt="" width="576" height="384"></img>
                    </div>
                </div>
            </div>
            <br></br>
            {/*Plan to put hitory trend here for next time*/}
        </div>
    )
}
export default GOOG;
