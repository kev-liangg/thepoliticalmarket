import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const TableBody = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td >
                    <Link to={"/sto-models/sto-instances/" + row.Symbols}>{row.Company}</Link>
                </td>
                <td>{row.Time}</td>
                <td>{row.Symbols}</td>
                <td>{row.Buy}</td>
                <td>{row.Hold}</td>
                <td>{row.Sell}</td>
                <td>{row.StrongBuy}</td>
                <td>{row.StrongSell}</td>
            </tr >

        )
    })

    return <tbody>{rows}</tbody>
}
class StoTable extends Component {
    render() {
        const { characterData } = this.props;

        return (
            <table border="10" width={1000} fixed>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Time period</th>
                        <th>Symbols</th>
                        <th>buy</th>
                        <th>hold</th>
                        <th>sell</th>
                        <th>StrongBuy</th>
                        <th>StrongSell</th>
                    </tr>
                </thead>
                <TableBody characterData={characterData} />
            </table>
        );
    }
}

export default StoTable;
