import React, { Component } from 'react';
import bg from "../1393726.jpg";
import './Home.css'

class Home extends Component {

    render() {
        return (
            <div className="wrapper"> 
                <img src={bg} class="img-fluid w-100" alt="bg" />
                <div className="centered">The Political Market</div>
            </div>
        )
    }

}

export default Home;