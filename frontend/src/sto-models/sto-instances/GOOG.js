import React from "react";
import "./GOOG.css";
import { toy_data } from "../stockTrends";
function GOOG() {
    return (
        <div>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;Alphabet Inc</h1>
            <br></br>
            <div className='GOOGdata'>
                <div className='col-sm-4'>
                    <p class="card-text">Updated period: {toy_data[0]['Time']}</p>
                    <p class="card-text">Symbols for the Company: {toy_data[0]['Symbols']}</p>
                    <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[0]['Buy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[0]['Hold']}</p>
                    <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[0]['Sell']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[0]['StrongBuy']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Sell category:</p>
                    <p class="card-text">Candidates from States with Alphabet Inc. Offices:</p>
                    <li>
                    <a href={"/CampFin/TJOssoff"}>TJ Ossof</a>
                    </li>
                </div>
            </div>
            <br></br>
            <p>Plan to put history trend here for next time</p>
        </div>
    )
}
export default GOOG;
