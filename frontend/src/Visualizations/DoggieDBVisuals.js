import React from 'react';
import DoggiePieChart from './DoggiePieChart';
import ShelterBubbleChart from './ShelterBubbleChart';
import DogBarChart from './DogBarChart';


function DoggieDBVisuals() {
    
    return (
        <div>
            <div className="col-lg-6" style={{height: '1000px', width: '1000px','textAlign':'center', top: "100px"}}>
                <h3> Breed Classifications</h3>
                <DoggiePieChart/>
            </div>
            <div className="col-lg-6" style={{ height: '1000px', width: '1000px','textAlign':'center', top: "100px"}}>
                <h3> Shelters per State</h3>
                <ShelterBubbleChart />
            </div>
            <div className="col-lg-6" style={{height: '1000px', width: '1000px','textAlign':'center', top: "200px"}}>
                <h3> Dogs by Gender and Age</h3>
                <DogBarChart />
            </div>
        </div>
       
    )
}

export default DoggieDBVisuals
