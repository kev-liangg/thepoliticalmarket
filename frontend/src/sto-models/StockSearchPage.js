import { useState } from "react";
import StockSearch from './StockSearch'

function StockSearchPage() {

    const [searchTerms, setSearchTerms] = useState("");

    return (
        <div style={{'textAlign':'center'}}>
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
            <StockSearch searchTerms={searchTerms} />

        </div>
    )
}

export default StockSearchPage