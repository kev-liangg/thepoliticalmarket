import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { dogattributes } from './dog-attributes';


class DogBarChart extends React.Component {

    render() {
        return (
            <BarChart width={730} height={250} data={dogattributes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Female" fill="#ab365f" />
                <Bar dataKey="Male" fill="#006D77" />
            </BarChart>
        )
    };
}

export default DogBarChart;