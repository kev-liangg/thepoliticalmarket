import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const MemberPage = ({match}) => {
    const {
        params: { candId },
    } = match;

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch(`http://127.0.0.1:8081/api/candidate/${candId}`, {})
        .then((res) => res.json())
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [candId]);
  
    return (
      <>
      {!isLoading && (
        <>
          <h1>first name: {data.cand_firstname}</h1>
          <h2>image: {data.cand_image}</h2>
          <h2>last name: {data.cand_lastname}</h2>
          <h2>office: {data.cand_office}</h2>
          <h2>party: {data.cand_party}</h2>
          <h2>state: {data.cand_state}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
    );
}

export default MemberPage;