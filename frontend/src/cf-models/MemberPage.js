import React, { useState, useEffect } from "react";
// import {Link} from "react-router-dom";
import StateMap from "../Components/StateMap";

const MemberPage = ({match}) => {
    const {
        params: { candId },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`http://127.0.0.1:8081/api/candidate/${candId}`, {})
        .then((res) => res.json())
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [candId]);
    
    function getContribInfo() {
      let count = 0;
      return data.contributions.map(element => {
        // let labels = <div className='col-sm-4' style={{'fontWeight':'800'}}>
        //               Contributor Org <br></br>
        //               Pac Contributions<br></br> 
        //               Individual Contributions<br></br>
        //               Total Contributions<br></br>
        //             </div>
        let org_name = <div className='col-sm-3'>{element.org_name}</div>;
        let pacs = <div className='col-sm-3'>{element.pacs}</div>;
        let indivs = <div className='col-sm-3'>{element.indivs}</div>;
        let total = <div className='col-sm-3'>{element.total}</div>;
                      
                       
        if (count%2===0) {
          count = count + 1;
          return <div className="row" style={{'backgroundColor':'lightgray', 'color':'gray', 'textAlign':'center'}}>{org_name}{pacs}{indivs}{total}</div>;
        } else {
          count = count + 1;
          return <div className="row" style={{'backgroundColor': 'gray', 'color':'lightgray', 'textAlign':'center'}}>{org_name}{pacs}{indivs}{total}</div>;
        }
      })
    }


    if (isLoading) {
      return <h2>Loading...</h2>
    }
    let polColor = 'Gray'
    if (data.cand_party === 'D')
      polColor = 'Blue'
    if (data.cand_party === 'R')
      polColor = 'Red'
    return (
      <div>
        
        <div className="container">
          <div className="row">
            <div className="col-sm-12" style={{'textAlign':'center','backgroundColor':'black', 'color':'white'}}>
              <h1> {data.cand_firstname} {data.cand_lastname}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6" style={{'backgroundColor': 'black'}}>
             <img className="rounded mx-auto d-block" src={data.cand_image} alt="" width="100%"></img>
            </div>
            <div className="col-sm-6" style={{'backgroundColor': polColor, 'color':'white'}}>
              <br></br>
              <h2 style={{'textAlign':'center'}}> Candidate Information</h2>
              <br></br>
              <div className="row">
                <div className="col-sm-4" style={{'color':'white', 'textAlign':'center', 'fontWeight':'900'}}>
                  <br></br>
                  Cycle <br></br><br></br>
                  First <br></br><br></br>
                  Last <br></br><br></br>
                  OpenSecrets ID <br></br><br></br>
                  Office <br></br><br></br>
                  Party <br></br><br></br>
                  State <br></br><br></br>
                </div>
                <div className="col-sm-8">
                  <br></br>
                  {data.cycle} <br></br><br></br>
                  {data.cand_firstname} <br></br><br></br>
                  {data.cand_lastname} <br></br><br></br>
                  {data.cand_crp_id} <br></br><br></br>
                  {data.cand_office==='s'?'Senate':'House'} <br></br><br></br>
                  {data.cand_party} <br></br><br></br>
                  {data.cand_state} <br></br><br></br>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-sm-12" style={{'backgroundColor':'black'}}>
              <br></br>
              <h2 style={{'textAlign':'center', 'color':'gray'}}> Contributions Received</h2> <br></br>
              <div className="row" style={{'textAlign':'center'}}>
                <div className="col-sm-3">Contributor Org Name</div>
                <div className="col-sm-3">Pac Contributions ($)</div>
                <div className="col-sm-3">Individual Contributions ($)</div>
                <div className="col-sm-3">Total Contributions ($)</div>
              </div>

              {getContribInfo()}

            </div>
          </div>
          <br></br>
          <StateMap state={data.cand_state} />
          {/* <iframe title="test map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7245788.933753486!2d-88.30160078103759!3d27.531991061531965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c1766591562abf%3A0xf72e13d35bc74ed0!2sFlorida!5e0!3m2!1sen!2sus!4v1616887562929!5m2!1sen!2sus" width="600" height="450" style={{'border':'0'}} allowfullscreen="" loading="lazy"></iframe> */}
        </div>
        {/* <h1>first name: {data.cand_firstname}</h1>
        <h2>image: {data.cand_image}</h2>
        <h2>last name: {data.cand_lastname}</h2>
        <h2>office: {data.cand_office}</h2>
        <h2>party: {data.cand_party}</h2>
        <h2>state: {data.cand_state}</h2>
        <Link to="/">Back to homepage</Link> */}
      </div>
    );
}

export default MemberPage;