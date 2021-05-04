import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { dogattributes } from './dog-attributes';


class DogBarChart extends React.Component {

    COLORS = ['#F7F4EA', '#DED9E2', '#473f66', '#80A1D4', '#145453', '#18206F', '#006D77', '#9FA0C3', '#00AFB9'];

    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

    render() {
        return (
            <BarChart width={730} height={250} data={dogattributes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        )
    };
}

export default DogBarChart;