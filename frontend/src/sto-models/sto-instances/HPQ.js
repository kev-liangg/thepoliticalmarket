import React from "react";
import "./HPQ.css";
import { toy_data } from "../stockTrends";

function HPQ() {
    return (
        <div>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;HP Inc</h1>
            <br></br>
            <div className='hpdata'>
                <div className='col-sm-4'>
                    <p class="card-text">Updated period: {toy_data[1]['Time']}</p>
                    <p class="card-text">Symbols for the Company: {toy_data[1]['Symbols']}</p>
                    <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[1]['Buy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[1]['Hold']}</p>
                    <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[1]['Sell']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[1]['StrongBuy']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[1]['StrongSell']}</p>
                    <p class="card-text">Candidates from States with HP Inc. Offices:</p>
                    <li>
                    <a href={"/CampFin/RWarnock"}>CfRWarnock</a>
                    </li>
                </div>
            </div>
            <br></br>
            <p>Plan to put hitory trend here for next time</p>
        </div>
    )
}
export default HPQ;