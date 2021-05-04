import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const data = [
    { name: "0-50K", members: 25 },
    { name: "50-100K", members: 57 },
    { name: "100-150K", members: 249 },
    { name: "150-200K", members: 79 },
    { name: "200-250K", members: 36 },
    { name: "250-300K", members: 33 },
    { name: "300-350K", members: 21 },
    { name: "350-400K", members: 11 },
    { name: "400-450K", members: 13 },
    { name: "450-500K", members: 8 },
    { name: ">500K", members: 17 }
]

function TPMBarGraph() {
    return (
        <div>
            <h3 style={{'textAlign':'center', 'color':'#228b22'}}> Number of Congress Members receiving Contribution Amounts</h3>
            <BarChart
                width={1200}
                height={500}
                data={data}
                margin={{
                    top: 10,
                    left: 20,
                    right: 30
                }}
            >
                <XAxis dataKey="name" scale="auto" />
                <YAxis type="number" domain={[0, 300]} />
                <Tooltip />
                <CartesianGrid strokeDasharray="1 1"/>
                <Bar dataKey="members" fill="#228b22" />

            </BarChart>
        </div>
    )
}

export default TPMBarGraph
