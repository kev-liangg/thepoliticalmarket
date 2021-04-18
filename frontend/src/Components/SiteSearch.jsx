import React, { useEffect, useState } from "react";
function SiteSearch() {
    const [searchTerms, setSearchTerms] = useState("");
    const candidate_atts = ['cand_crp_id', 'cand_firstname', 'cand_lastname', 'cand_party', 'cand_office', 'cand_state'];
    const stock_atts = [];
    const contract_atts = ['contract_award_id','contract_naics','contract_sop','contract_recipient','contract_parentagency'];

    const [candidateIsLoading, setCandidateIsLoading] = useState(true);
    const [candidateData, setCandidateData] = useState([]);
    const [candidatePage, setCandidatePage] = useState(1);
    const [candidateNumResults, setCandidateNumResults] = useState(0);
    const [candidateNumPages, setCandidateNumPages] = useState(0);

    useEffect(() => {
        let query = {};
        
        searchTerms.split(" ").map((searchTerm) => {
            if (searchTerm !== "") {
            query.filters = [];

            query.filters.push({"or": candidate_atts.map((attribute)=>{
                let filter = {name: attribute};
                filter.op = "like";
                filter.val = "%"+searchTerm+"%";
                return filter;
            })});
            }
        });
    
        let toFetch = `https://api.thepoliticalmarket.tech/v1/candidate?page=${candidatePage}&q=${JSON.stringify(query)}`;
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
        <div style={{'textAlign':'center'}}>
            {/* Search Bar */}
            <input
                type="text"
                size="50"
                placeholder="Search..."
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                    setSearchTerms(event.target.value);
                    console.log(event.target.value);
                    }
                }}
                >
            </input>

            {/* Model 1: data and pagination*/}

            {/* Model 2: data and pagination*/}

            {/* Model 3: data and pagination*/}

        </div>
    );
}

export default SiteSearch;