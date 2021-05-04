import React from 'react';
import DoggiePieChart from './DoggiePieChart';
import ShelterBubbleChart from './ShelterBubbleChart';
import DogBarChart from './DogBarChart';


function DoggieDBVisuals() {
    
    return (
        <div>
            <h1 style={{'textAlign':'center'}}>Visualizations of Our Provider's Data</h1>
            <div className="col-lg-6" style={{height: '1000px', width: '1000px','textAlign':'center', top: "100px", margin: 'auto'}}>
                <h3 style={{'textAlign':'center', 'color':'#006D77'}}>Breeds per Classification</h3>
                <DoggiePieChart/>
            </div>
            <div className="col-lg-6" style={{ height: '700px', width: '1000px','textAlign':'center', top: "100px", margin: 'auto'}}>
                <h3 style={{'textAlign':'center', 'color':'#006D77'}}>Shelters per State</h3>
                <ShelterBubbleChart />
            </div>
            <div className="col-lg-6" style={{height: '1000px', width: '1000px','textAlign':'center', top: "200px", margin: 'auto'}}>
                <h3 style={{'textAlign':'center', 'color':'#006D77'}}>Dogs by Gender and Age</h3>
                <DogBarChart />
            </div>
        </div>
       
    )
}

export default DoggieDBVisuals
