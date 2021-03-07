import React from "react";
import "./AAPL.css";
import { toy_data } from "../stockTrends";

function AAPL() {
    return (
        <div>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;Apple Inc</h1>
            <br></br>
            <div className='AAPLdata'>
                <div className='col-sm-4'>
                    <p class="card-text">Updated period: {toy_data[0]['Time']}</p>
                    <p class="card-text">Symbols for the Company: {toy_data[0]['Symbols']}</p>
                    <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[0]['Buy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[0]['Hold']}</p>
                    <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[0]['Sell']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[0]['StrongBuy']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[0]['StrongSell']}</p>
                </div>
            </div>
            <br></br>
            <p>Plan to put hitory trend here for next time</p>
        </div>
    )
}
export default AAPL;
