import React, { useState, useEffect } from "react";
import {scatterData} from "./stocksScatterData";
import {ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Legend, Scatter} from "recharts";
function TPMScatterPlot() {
    
    return (
        <div>
            <h3 style={{'textAlign':'center', 'color':'#4a50f0'}}>Stock Volume vs Market Capitalization</h3>
            <ScatterChart 
                width={1200} 
                height={500}
                margin={{
                    top: 10,
                    left: 100,
                    right: 30
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Market_Cap" type="number" name="market cap" domain={[0, 2200000000000]} scale="auto"/>
                <YAxis dataKey="Volume" type="number" name="volume" domain={[0,54000000]}/>
                <ZAxis dataKey="Symbol" type="string" />
                <Tooltip cursor={{strokeDasharray:"2 2"}} />
                <Scatter name="stocks" data={scatterData} fill="#4a50f0" />
            </ScatterChart>
        </div>
    )
}

export default TPMScatterPlot
