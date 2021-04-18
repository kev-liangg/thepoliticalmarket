import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { hl } from '../../filtering-logic/Helpers'
import { Pager } from '../../Components/Pagination'

const stock_atts = [
    'Symbol',
    'Full_Name',
    'Country',
    'Sector',
    'Industry',
    'Orgname',
    'State'
];

function ContractSearchCard({item, toHl}) {
    console.log(item);
    return (
        <div className='col-sm-12'>
            <div className='card mt-5'>
                <div className='card-body'>                
                <p className="card-text">
                    <h5>{hl(toHl, item.Symbol)}</h5> 
                    <b>Company Name</b> {hl(toHl, item.Orgname)} &emsp;
                    <b>Full Name:</b> {hl(toHl, item.Full_Name)} &emsp;
                    <b>Last Sale:</b> {item.Last_Sale} &emsp;
                    <b>Market Cap:</b> {hl(toHl, item.Market_Cap)} &emsp;
                    <b>Country:</b> {hl(toHl, item.Country)} &emsp;
                    <b>Sector:</b> {hl(toHl, item.Sector)} &emsp;
                    <b>Industry:</b> {hl(toHl, item.Industry)} &emsp;
                    <b>State:</b> {hl(toHl, item.State)} &emsp;         
                    <Link to={`/Stocks/${item.Symbol}`}>Go to Page...</Link>
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

function StockSearch ({searchTerms}) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [numResults, setNumResults] = useState(0);
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        let query = {};
        
        searchTerms.split(" ").map((searchTerm) => {
            if (searchTerm !== "") {
                if (!("filters" in query)) {
                    query.filters = [{"or":[]}]
                }

                stock_atts.forEach((attribute)=>{
                    let filter = {name: attribute};
                    filter.op = "like";
                    filter.val = "%25"+searchTerm+"%25";
                    query.filters[0].or.push(filter);
                });
            }
        });
    
        let toFetch = `https://api.thepoliticalmarket.tech/v1/matchedstock?page=${page}&q=${JSON.stringify(query)}&results_per_page=5`;
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

    return (
        <div>
            {mapData(data, searchTerms)} <br></br>
            <Pager
                page={page}
                numPages={numPages}
                setPage={setPage}
            />
        </div>
    )

}

export default StockSearch;