import React from "react";
import "./DELL.css";
//import txgovernor from './txgovernor.jpg';
//import texas_ut from "./texas_ut.jpg"
import { toy_data } from "../stockTrends";

function DELL() {
    return (
        <div>
            <br></br>
            <h1>DELL</h1>
            <br></br>
            <div className='delldata'>
                <div className='col-sm-4'>
                    <p class="card-text">Updated period: {toy_data[0]['Time']}</p>
                    <p class="card-text">Symbols for the Company: {toy_data[0]['Symbols']}</p>
                    <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[0]['Buy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[0]['Hold']}</p>
                    <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[0]['Sell']}</p>
                    <p class="card-text">Number of recommendations that fall into the Strong Buy category: {toy_data[0]['StrongBuy']}</p>
                    <p class="card-text">Number of recommendations that fall into the Strong Sell category: {toy_data[0]['StrongSell']}</p>
                </div>
            </div>
            <br></br>
            {/* <a href="/America" className="btn btn-primary">See Related Country</a>
            <p></p>
            <a href="/AmericaBeliefs" className="btn btn-primary">See Beliefs in Related Country</a>
            <p></p>
            <img src={txgovernor} width="350" height="200"></img> */}
            <p>Here is Governor of Texas, Greg Abbott.</p>
            {/* <img src={texas_ut} ></img> */}
            <p>UT students get vaccinated on campus.</p>
        </div>
    )
}
export default DELL;
