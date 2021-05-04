import React from 'react';
import {PieChart, Pie, Legend, Tooltip} from "recharts";
import {pieData} from "./contractsPieData";

function TPMPieGraph() {
    return (
        <div>
            <h3 style={{'textAlign':'center', 'color':'#f08a4a'}}>Number of Contracts by US State</h3>
            <PieChart
                width={1350}
                height={500}
            >
                <Pie 
                    dataKey="contracts" 
                    data={pieData}
                    isAnimationActive={true}
                    outerRadius={200}
                    fill="#f08a4a"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default TPMPieGraph
