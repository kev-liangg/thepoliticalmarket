import React from 'react';
import DoggiePieChart from './DoggiePieChart';
import ShelterBubbleChart from './ShelterBubbleChart';
import { Container } from '@material-ui/core';


function DoggieDBVisuals() {
    
    return (
        <div>
            <div className="col-lg-6" style={{height: '1000px', width: '1000px','textAlign':'center'}}>
                <h3> Breed Classifications</h3>
                <DoggiePieChart/>
            </div>
            <div style={{ height: '1000px', width: '1000px','textAlign':'center'}}>
                <h3> Shelters per State</h3>
                <ShelterBubbleChart />
            </div>
        </div>
       
    )
}

export default DoggieDBVisuals
