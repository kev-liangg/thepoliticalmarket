import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { hl } from '../filtering-logic/Helpers'
import { Pager } from '../Components/Pagination'

const contract_atts = [
    'contract_award_id',
    'contract_naics_description',
    'contract_award_description',
    'contract_parentagency',
    'contract_recipient',
    'contract_sop',
    'contract_date',
    'contract_recipient_address',
];

function ContractSearchCard({item, toHl}) {
    console.log(item);
    return (
        <div className='col-sm-12'>
            <div className='card mt-5'>
                <div className='card-body'>                
                <p className="card-text">
                    <h5>{hl(toHl, item.contract_recipient)}</h5> 
                    <b>Award ID:</b> {item.contract_award_id} &emsp;
                    <b>Award Amount:</b> {item.contract_currentval} &emsp;
                    <b>State:</b> {hl(toHl, item.contract_sop)} &emsp;
                    <b>Date:</b> {hl(toHl, item.contract_date)} &emsp;
                    <b>NAICS:</b> {item.contract_naics} <br></br>
                    <b>NAICS Description:</b> {hl(toHl, item.contract_naics_description)} <br></br>
                    <b>Award Description:</b> {hl(toHl, item.contract_award_description)} <br></br>            

                    <b>Address:</b> {hl(toHl, item.contract_recipient_address)} <br></br>
                    <Link to={`/Contract/${item.id}`}>Go to Page...</Link>
                </p>               
                </div>
            </div>
        </div>
    )
}

function mapData (data, searchTerm) {
    if (data.length === 0) {
        return <h3 style={{'textAlign':'center', 'color':'red', 'backgroundColor':'lightgray'}}> No Search Results </h3>
    }
    if (typeof data != "undefined") {
      return data.map((contract) => {
        return <ContractSearchCard item={contract} toHl={searchTerm} />;
      });
    }
    return [];
}

function ContractSearch ({searchTerms}) {

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

                contract_atts.forEach((attribute)=>{
                    let filter = {name: attribute};
                    filter.op = "like";
                    filter.val = "%25"+searchTerm+"%25";
                    query.filters[0].or.push(filter);
                });
            }
        });
    
        let toFetch = `https://api.thepoliticalmarket.tech/v1/contract?page=${page}&q=${JSON.stringify(query)}&results_per_page=5`;
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

export default ContractSearch;