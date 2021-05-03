import React, { useEffect, useState } from "react";
import MemberSearch from '../cf-models/MemberSearch'
import ContributionSearch from '../cf-models/ContributionSearch'
import ContractSearch from '../gov-models/ContractSearch'
import StockSearch from '../sto-models/StockSearch'

function SiteSearch() {

    const [searchTerms, setSearchTerms] = useState("");

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

            <br></br>
            <br></br>

            {/* Model 1: data and pagination*/}
            <h4>Campaign Finance: Results for Candidates</h4>

            <MemberSearch searchTerms={searchTerms} />

            <br></br>
            <br></br>

            <h4>Campaign Finance: Results for Contributions</h4>

            <ContributionSearch searchTerms={searchTerms} />

            {/* Model 2: data and pagination*/}

            <br></br>
            <br></br>

            <h4>Results for Contracts</h4>

            <ContractSearch searchTerms={searchTerms} />

            {/* Model 3: data and pagination*/}

            <br></br>
            <br></br>

            <h4>Results for Stocks</h4>

            <StockSearch searchTerms={searchTerms} />

        </div>
    );
}

export default SiteSearch;