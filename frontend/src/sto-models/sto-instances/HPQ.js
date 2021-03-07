import React from "react";
import "./HPQ.css";
import { toy_data } from "../stockTrends";
import hpq_5 from "./HPQ_5Year.PNG";

function HPQ() {
    return (
        <div>
            <br></br>
            {/*&nbsp;&nbsp;&nbsp;&nbsp;HP Inc*/}
            <br></br>
            <div className='container'>
                <div className="row">
                    <div className='col-sm-4'>
                        <h1>HP Inc</h1>
                        <p class="card-text">Updated period: {toy_data[1]['Time']}</p>
                        <p class="card-text">Symbols for the Company: {toy_data[1]['Symbols']}</p>
                        <p class="card-text">Number of recommendations that fall into the Buy category: {toy_data[1]['Buy']}</p>
                        <p class="card-text">Number of recommendations that fall into the Hold category: {toy_data[1]['Hold']}</p>
                        <p class="card-text">Number of recommendations that fall into the Sell category: {toy_data[1]['Sell']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Buy category: {toy_data[1]['StrongBuy']}</p>
                        <p class="card-text">Recommendations that fall into the Strong Sell category: {toy_data[1]['StrongSell']}</p>
                        <li>
                        <a href={"/CampFin/RWarnock"}>CfRWarnock</a>
                        </li>
                    </div>
                    <div className='col-sm-8'>
                        <h3>HPQ 5 Years</h3>
                        <img src={hpq_5} alt="" width="576" height="384"></img>
                    </div>
                </div>
            </div>
            <br></br>
            {/*Plan to put hitory trend here for next time*/}
        </div>
    )
}
export default HPQ;