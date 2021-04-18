import React from 'react'

function StateMap({state}) {
    let statesdict = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District_Of_Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New_Hampshire",
        "NJ": "New_Jersey",
        "NM": "New_Mexico",
        "NY": "New_York",
        "NC": "North_Carolina",
        "ND": "North_Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode_Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West_Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }
    let fullState = state;
    if (fullState.length===2) {
        fullState = statesdict[state];
    }
    let src_str = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q="+fullState+"+(StateMap)&t=&z=6&ie=UTF8&iwloc=B&output=embed"
    // let src_str = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ny+(StateMap)&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
    return (
        <div style={{'width': '100%'}}>
            <iframe title="state" width="100%" height="600" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={src_str}></iframe>
            {/* <a href="https://www.maps.ie/route-planner.htm">some text</a> */}
        </div>
    )
}

export default StateMap
