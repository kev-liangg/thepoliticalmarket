import React from 'react';
import TPMScatterPlot from "./TPMScatterPlot";
import TPMBarGraph from "./TPMBarGraph";
import TPMPieGraph from "./TPMPieGraph";

function TPMVisuals() {
    
    return (
        <div>
            <h1 style={{'textAlign':'center'}}>Visualizations of Our Data</h1>
            <br></br>
            <br></br>
            <TPMBarGraph />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <TPMScatterPlot />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <TPMPieGraph />
            <br></br>
            <br></br>

        </div>
    )
}

export default TPMVisuals
