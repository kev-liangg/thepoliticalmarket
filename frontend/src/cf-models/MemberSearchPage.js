import React, { useEffect, useState } from "react";
import MemberSearch from './MemberSearch'

function MemberSearchPage() {

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
            <MemberSearch searchTerms={searchTerms} />

        </div>
    )
}

export default MemberSearchPage
