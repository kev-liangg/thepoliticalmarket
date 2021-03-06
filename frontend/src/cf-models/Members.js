import React from "react";
import jon_ossoff from "./Jon_Ossoff.jpg";
import jaime_harrison from "./Jaime_Harrison.jpg";
import raphael_warnock from "./Raphael_Warnock.jpg";



class Members extends React.Component {
    render() {
      return (
        <div className="container">
          <h1 style={{'text-align':'center'}}>Campaign Finance</h1>
          <div className='row'>
            <div className='col-sm-4'>
              <div className='card' style={{'backgroundColor': 'black'}}>
              <img className="card-img-top" src={jon_ossoff} alt=""></img>
                <div className='card-body'>
                  <h4 className="card-title">T. J. Ossoff</h4>
                  <p className="card-text">Total Received: $146,082,030.53 </p>
                  <a href="/CampFin/TJOssoff" class="btn-link">Learn more</a>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='card' style={{'backgroundColor': 'black'}}>
              <img className="card-img-top" src={jaime_harrison} alt=""></img>
                <div className='card-body'>
                  <h4 className="card-title">J. Harrison</h4>
                  <p className="card-text">Total Received: $131,888,674.32 </p>
                  <a href="/CampFin/JHarrison" class="btn-link">Learn more</a>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <div className='card' style={{'backgroundColor': 'black'}}>
              <img className="card-img-top" src={raphael_warnock} alt=""></img>
                <div className='card-body'>
                  <h4 className="card-title">R. Warnock</h4>
                  <p className="card-text">Total Received: $118,397,930.66</p>
                  <a href="/CampFin/RWarnock" class="btn-link">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export default Members;
  