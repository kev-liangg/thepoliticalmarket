import React, { useState, useEffect } from "react";
import {ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter} from "recharts";

function TPMScatterPlot() {
    const [data, setData] = useState();

    // useEffect(() => {
    //     fetch(`https://api.thepoliticalmarket.tech/v1/candidate?page=${page}`, {})
    //       .then((res) => res.json())
    //       .then((response) => {
    //         setData(response);
    //         setIsLoading(false);
    //       })
    //       .catch((error) => console.log(error));
    // }, []);
    
    // if (isLoading) {
    //     return <h2>Loading...</h2>
    // }
    return (
        <div>
            <ScatterChart width='800px' height='600px'>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="market cap" unit="$ (millions)" />
                <YAxis dataKey="y" name="volume" unit="shares" />
                <Tooltip cursor={{strokeDasharray:"2 2"}} />
            </ScatterChart>
        </div>
    )
}

export default TPMScatterPlot
