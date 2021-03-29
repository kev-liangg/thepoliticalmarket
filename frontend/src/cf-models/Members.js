import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import {Pagination} from "@material-ui/lab";
// import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {Box} from "@material-ui/core"

// const useStyles = makeStyles((theme) => {
//   createStyles({
//     button: {
//       alignItems: "center",
//       justifyContent: "center",
//       display: "flex",
//       "& > *": {
//         margin: theme.spacing(1)
//       }
//     },
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 200,
//       maxWidth: 300
//     }
//   })
// });

function Members() {

  //let numPerPage = 0;
  //const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)

   useEffect(() => {
    fetch(`http://api.thepoliticalmarket.tech/v1/candidate?page=${page}`, {})
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
      <br></br>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination 
          count = {numPages}
          onChange = {(event, page) => setPage(page)}
          showFirstButton
          showLastButton
          variant = "outlined"
          color="black"
          size="large"
        />
      </Box>
      <br></br>
    </div>
  )
}

export default Members
