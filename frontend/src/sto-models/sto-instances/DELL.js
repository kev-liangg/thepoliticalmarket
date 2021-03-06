import React from "react";
import "./DELL.css";
import { toy_data } from "../stockTrends";

function DELL() {
    return (
        <div>
            <br></br>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;DELL Inc</h1>
            <br></br>
            <div className='delldata'>
                <div className='col-sm-4'>
                    <p class="card-text">Updated period: {toy_data[2]['Time']}</p>
                    <p class="card-text">Symbols for the Company: {toy_data[2]['Symbols']}</p>
                    <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[2]['Buy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[2]['Hold']}</p>
                    <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[2]['Sell']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[2]['StrongBuy']}</p>
                    <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[2]['StrongSell']}</p>
                </div>
            </div>
            <br></br>
            <p>Plan to put hitory trend here for next time</p>
        </div>
    )
}
export default DELL;
