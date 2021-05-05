import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { hl } from '../filtering-logic/Helpers'
import { Pager } from '../Components/Pagination'

const candidate_atts = [
    'org_name', 
];

function ContributionSearchCard({org, toHl}) {
    console.log(org);
    return (
        <div className='col-sm-12'>
            <div className='card mt-5'>
                <div className='card-body'>                
                <p className="card-text">
                    <h5>{hl(toHl, org.org_name)}</h5> &emsp;
                    <b>Total Contributions:</b> {org.total} &emsp;
                    <b>PAC Contributions:</b> {org.pacs} &emsp;
                    <b>Individual Contributions:</b> {org.indivs} &emsp;
                    <b>Receiving Candidate:</b> {hl(toHl, org.recipient.cand_firstname+" " +org.recipient.cand_lastname)} &emsp;
                    <Link to={`/CampFin/${org.recipient.cand_crp_id}`}>Go to Recipient...</Link>
                </p>                
                </div>
            </div>
        </div>
    )
}

function mapData (data, searchTerm) {
    if (typeof data != "undefined") {
      return data.map((org) => {
        return <ContributionSearchCard org={org} toHl={searchTerm} />;
      });
    }
    return [];
}

function ContributionSearch ({searchTerms}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [numResults, setNumResults] = useState(0);
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        let query = {};
        
        searchTerms.split(" ").forEach((searchTerm) => {
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
    
        let toFetch = `https://api.thepoliticalmarket.tech/v1/contribution?page=${page}&q=${JSON.stringify(query)}&results_per_page=5`;
        console.log(toFetch); 
    
        fetch(toFetch, {})
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            setData(res["objects"]);
            setNumPages(res["total_pages"]);
            setNumResults(res["num_results"])
            setIsLoading(false);
            console.log(data);
          })
          .catch((error) => console.log(error));
    
    }, [page, searchTerms]); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return (
            <div>
                Loading Search Results...
            </div>
        )
    }

    return (
        <div>
            Number of Results: {numResults}
            {mapData(data, searchTerms)} <br></br>
            <Pager
                page={page}
                numPages={numPages}
                setPage={setPage}
            />
        </div>
        
        
    )

}

export default ContributionSearch;