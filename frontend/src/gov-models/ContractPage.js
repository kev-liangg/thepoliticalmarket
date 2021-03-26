import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const ContractPage = ({match}) => {
    const {
        params: { awardId },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`http://127.0.0.1:8081/api/contract/${awardId}`, {})
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [awardId]);
  
    return (
      <>
      {!isLoading && (
        <>
          <h1>Award ID: {data.contract_award_id}</h1>
          <h2>Awarding Agency: {data.parentagency}</h2>
          <h2>Current value: {data.contract_currentval}</h2>
          <h2>Recipient Name: {data.contract_recipient}</h2>
          <h2>Contract Naics Code: {data.contract_naics}</h2>
          <h2>Contract State of Performance: {data.contract_sop}</h2>
          <h2>Date Awarded: {data.contract_date}</h2>
          <h2>Agency Logo: {data.contract_agencylogo}</h2>
          <h2>Contract Recipient's Congressional District: {data.contract_recipient_district}</h2>
          <h2>Contract Recipient's Address: {data.contract_recipient_address}</h2>
          <h2>Contract State Flag: {data.contract_stateflag}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
    );
}

export default ContractPage;