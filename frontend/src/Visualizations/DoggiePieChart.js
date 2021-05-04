import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { breedclass } from './breed-class';


class DoggiePieChart extends React.Component {

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
            <PieChart width={800} height={800}>
                <Pie data={breedclass} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={350} fill="#8884d8" >
                    {
                        breedclass.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<this.CustomTooltip />} />
                <Legend />
            </PieChart>
        )
    };
}

export default DoggiePieChart;