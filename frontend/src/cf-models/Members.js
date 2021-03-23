import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import {Pagination} from "@material-ui/lab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


function Members() {

  let numPerPage = 0;
  //const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)

   useEffect(() => {
    fetch(`http://127.0.0.1:8081/api/candidate?page=${page}`, {})
      .then((response) => response.json())
      .then((res) => {
        setData(res["objects"]);
        setNumPages(res["total_pages"])
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <div className="container">
        <h1 style={{'text-align':'center'}}>Campaign Finance</h1>
        <div className="row">
        {
          data.map((memb) => {
            return <MemberCard member={memb} />;
          })
        }  
          
        </div>
        
      </div>
        <div>
          <Pagination 
            count = {numPages}
            onChange = {(event, page) => setPage(page)}
            showFirstButton
            showLastButton
            shape="rounded"
            color="primary"
          />
        </div>
    </div>
  )
}

export default Members
