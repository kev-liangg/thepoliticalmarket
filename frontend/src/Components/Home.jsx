import React, { Component } from 'react';
import bg from "../1393726.jpg";
import '../App.css'

class Home extends Component {

    render() {
        return (
            <div>
            <img src={bg} class="img-fluid" alt="bg" />
            <div className="centered">The Political Market</div>
            </div>
        )
    }

}

export default Home;