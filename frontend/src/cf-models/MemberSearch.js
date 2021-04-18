import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { hl } from '../filtering-logic/Helpers'
import { Pager } from '../Components/Pagination'

const candidate_atts = [
    'cand_crp_id', 
    'cand_firstname', 
    'cand_lastname', 
    'cand_party', 
    'cand_office', 
    'cand_state'
];

function MemberSearchCard({member, toHighlight}) {
    // function highlight(str) {
    //     return str.replace(new RegExp(to), <mark>str</mark>)
    // }
    return (
        <div className='col-sm-12'>
            <div className='card mt-5'>
            {/* <img className="card-img-left" src={member.cand_image} alt=""></img> */}
                <div className='card-body'>
                {/* <h4 className="card-title" style={{'textAlign':'center'}}></h4> */}
                <div className="card-text d-flex align-items-center justify-content-center">
                    <div><img src={member.cand_image} style={{"align":"left","height":"5vw","margin-right":"50px"}}/></div>
                    <b style={{"margin-right":"100px"}}>{hl(toHighlight, member.cand_firstname)} {hl(toHighlight, member.cand_lastname)} </b>
                    <b>OpenSecrets ID</b>: {hl(toHighlight, member.cand_crp_id)} &emsp;
                    <b>Office</b> {hl(toHighlight, member.cand_office)} &emsp;
                    <b>Party:</b> {hl(toHighlight, member.cand_party)} &emsp;
                    <b>State:</b> {hl(toHighlight, member.cand_state)} &emsp;
                    <b>Total Received:</b> &nbsp; ${member.total_received} &emsp;
                    <Link to={`/CampFin/${member.cand_crp_id}`}> Go to Page</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

function mapData (data, searchTerms) {
    if (data.length === 0) {
        return <h3 style={{'textAlign':'center', 'color':'red', 'backgroundColor':'lightgray'}}> No Search Results </h3>
    }
    if (typeof data != "undefined") {
      return data.map((memb) => {
        return <MemberSearchCard member={memb} toHighlight={searchTerms} />;
      });
    }
    return [];
}

function MemberSearch ({searchTerms}) {

    const [candidateIsLoading, setCandidateIsLoading] = useState(true);
    const [candidateData, setCandidateData] = useState([]);
    const [candidatePage, setCandidatePage] = useState(1);
    const [candidateNumResults, setCandidateNumResults] = useState(0);
    const [candidateNumPages, setCandidateNumPages] = useState(0);

    useEffect(() => {
        let query = {};
        
        searchTerms.split(" ").map((searchTerm) => {
            if (searchTerm !== "") {
                if (!("filters" in query)) {
                    query.filters = [{"or":[]}]
                }

                candidate_atts.forEach((attribute)=>{
                    let filter = {name: attribute};
                    filter.op = "like";
                    filter.val = "%25"+searchTerm+"%25";
                    query.filters[0].or.push(filter);
                });
            }
        });
    
        let toFetch = `https://api.thepoliticalmarket.tech/v1/candidate?page=${candidatePage}&q=${JSON.stringify(query)}&results_per_page=5`;
        console.log(toFetch); 
    
        fetch(toFetch, {})
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            setCandidateData(res["objects"]);
            setCandidateNumPages(res["total_pages"]);
            setCandidateNumResults(res["num_results"])
            setCandidateIsLoading(false);
            console.log(candidateData);
          })
          .catch((error) => console.log(error));
    
    }, [candidatePage, searchTerms]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {mapData(candidateData, searchTerms)} <br></br>
            <Pager 
                numPages={candidateNumPages} 
                page={candidatePage}
                setPage={setCandidatePage}
            />
        </div>
        
    );
}

export default MemberSearch;