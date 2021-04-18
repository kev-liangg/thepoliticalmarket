import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import MemberCard from "./MemberCard";
import { Pagination, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// For selects
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// For pop-up
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';



// formatting for material-ui selects (constant width 200)
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  }
}));

function Members() {

  const search_attributes = ['cand_firstname', 'cand_lastname', 'cand_crp_id', 'cand_office', 'cand_party', 'cand_state', 'total_received'];
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numResults, setNumResults] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const [filters, setFilters] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [filterOp, setFilterOp] = useState('');
  const [view, setView] = useState(false);
  
  const [orderField, setOrderField] = useState("");
  const [orderDirection, setOrderDirection] = useState("none");

  const [searchTerm, setSearchTerm] = useState("");


  
  useEffect(() => {
    let query = {};

    // filtering
    if (filters.length !== 0) {
      query.filters = filters.map((filter)=>constructFilter(filter));
    }

    // sorting
    if (orderField !== "" && orderDirection !== "none") {
      query.order_by = constructOrderBy();
    }
    
    // searching
    // searching is done by union-ing the set of candidate table rows that have an attribute that contains searchTerm
    // can specify this with just another filter (which can be boolean formulas thanks to flask-restless)
    if (searchTerm !== "") {
      if (filters.length === 0) {
        query.filters = [];
      }
      query.filters.push({"or": search_attributes.map((attribute)=>{
        let filter = {name: attribute};
        filter.op = "like";
        filter.val = "%25"+searchTerm+"%25";
        return filter;
      })});
    }

    let toFetch = `https://api.thepoliticalmarket.tech/v1/candidate?page=${page}&q=${JSON.stringify(query)}`;
    console.log(toFetch); 

    fetch(toFetch, {})
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setData(res["objects"]);
        setNumPages(res["total_pages"]);
        setNumResults(res["num_results"])
        setIsLoading(false);
      })
      .catch((error) => console.log(error));

  }, [page, filters, orderField, orderDirection, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  
// start of switch case functions to reformat select input into backend attributes
  const constructOrderBy = () => {
    let orderby = {};
    switch (orderField) {
      case "First Name":
        orderby.field='cand_firstname';
        break;
      case "Last Name":
        orderby.field='cand_lastname';
        break;
      case "OpenSecrets ID":
        orderby.field='cand_crp_id';
        break;
      case "Office":
        orderby.field='cand_office';
        break;
      case "Party":
        orderby.field='cand_party';
        break;
      case "State":
        orderby.field='cand_state';
        break;
      case "Total Received":
        orderby.field='total_received';
        break;
      default:
        orderby.field=undefined;
    }
    switch (orderDirection) {
      case "ascending":
        orderby.direction = "asc";
        break;
      case "descending":
        orderby.direction = "desc";
        break;
      default:
        orderby.direction = undefined;
    }
    return [orderby];
  }

  const constructFilter = (item) => {
    let filter = {};
    switch (item.name) {
      case "First Name":
        filter.name='cand_firstname';
        break;
      case "Last Name":
        filter.name='cand_lastname';
        break;
      case "OpenSecrets ID":
        filter.name='cand_crp_id';
        break;
      case "Office":
        filter.name='cand_office';
        break;
      case "Party":
        filter.name='cand_party';
        break;
      case "State":
        filter.name='cand_state';
        break;
      case "Total Received":
        filter.name='total_received';
        break;
      default:
        filter.name=undefined;
    }
    switch (item.op) {
      case "contains":
        filter.op="like";
        filter.val="%25"+item.val+"%25";  // any characters before or after
        break;
      case "equals":
        filter.op="like";
        filter.val=item.val           // must contain exact value
        break;
      case "starts with":
        filter.op="like";
        filter.val=item.val+"%25";      // any characters after only
        break;
      case "ends with":
        filter.op="like";
        filter.val="%25"+item.val;      // any characters before only
        break;
      case "is greater than":
        filter.op="gt";
        filter.val=item.val;
        break;
      case "is less than":
        filter.op="lt";
        filter.val=item.val;
        break;
      default:
        filter.op=undefined;
        filter.val=undefined;
    }
    return filter;
  }
// end of switch case functions


  // for displaying instance member cards
  function mapData () {
    if (typeof data != "undefined") {
      return data.map((memb) => {
        return <MemberCard member={memb} toHighlight={searchTerm} />;
      });
    }
    return [];
  }


  if (isLoading) {
    return <h2>Loading...</h2>
  }
  return (
    <div className={classes.root}>

      {/*Start of bootstrap container*/}
      <div className="container">
        <h1 style={{'textAlign':'center'}}>Campaign Finance</h1>

        {/*Start of row for filtering, sorting, and searching*/}
        <div className="row">

          {/*Start of filtering column*/}
          <div className="col-sm-5" style={{'backgroundColor':'lightgray'}}>
            <h1>1. Filter </h1>
            <div className="row">

              {/*Start of filtering subcolumn for material-ui selects and input text box*/}
              <div className="col-sm-6">

                {/*Start of 2 material-ui selects in 2 separate rows for filtering*/}
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="filter-field-label">Attribute</InputLabel>
                    <Select
                      labelId="filter-field-label"
                      id="filter-field"
                      value={filterField}
                      onChange={(event) => {setFilterField(event.target.value);console.log(event.target.value);}}
                    >
                      <MenuItem value={'First Name'}>First Name</MenuItem>
                      <MenuItem value={'Last Name'}>Last Name</MenuItem>
                      <MenuItem value={'OpenSecrets ID'}>OpenSecrets ID</MenuItem>
                      <MenuItem value={'Office'}>Office</MenuItem>
                      <MenuItem value={'Party'}>Party</MenuItem>
                      <MenuItem value={'State'}>State</MenuItem>
                      <MenuItem value={'Total Received'}>Total Received</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="filter-op-label">Operator</InputLabel>
                    <Select
                      labelId="filter-op-label"
                      id="filter-op"
                      value={filterOp}
                      onChange={(event) => setFilterOp(event.target.value)}
                    >
                      <MenuItem value={'contains'}>contains</MenuItem>
                      <MenuItem value={'equals'}>equals</MenuItem>
                      <MenuItem value={'starts with'}>starts with</MenuItem>
                      <MenuItem value={'ends with'}>ends with</MenuItem>
                      <MenuItem value={'is greater than'}>is greater than</MenuItem>
                      <MenuItem value={'is less than'}>is less than</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {/*End of 2 material-ui selects in 2 separate rows for filtering*/}

                <br></br>

                {/*Start of value text box on a 3rd row for filtering*/}
                <div className="row">
                  <input
                    type="text"
                    placeholder="Value"
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        console.log(event.target.value)
                        if ((filterField !== "") && (filterOp !== "") && (event.target.value !== "")) {
                          // let newFilters = JSON.parse(JSON.stringify(filters));
                          // console.log(newFilters);
                          // newFilters.push({name: filterField, op: filterOp, val: event.target.value});
                          // console.log(newFilters);
                          // setIsLoading(true);

                          // Update a state array like this to avoid race conditions
                          setFilters([...filters, {name: filterField, op: filterOp, val: event.target.value}]);
                        }
                      }
                    }}
                  >
                  </input>
                </div>
                {/*End of value text box on a 3rd row for filtering*/}

                <div className="row">
                  <p style={{'color':'black'}}>(Press Enter to Add Filter)</p>
                </div>

              </div>
              {/*End of filtering subcolumn for material-ui selects and input text box*/}

              {/*Start of filtering subcolumn for Clear Filters and View Filters buttons*/}
              <div className="col-sm-6">
                <div className="row">
                  <button 
                    type="button"
                    onClick={()=>setFilters([])}
                  >Clear Filters</button>
                </div>
                <br></br>
                <div className="row">
                  <button
                    type="button"
                    onClick={()=>setView(true)}
                  >View Filters</button>
                </div>
              </div>
              {/*End of filtering subcolumn for Clear Filters and View Filters buttons*/}

            </div>

          </div>
          {/*End of filtering column*/}


          {/*Start of sorting column*/}
          <div className="col-sm-4" style={{'backgroundColor':'white'}}>
            <h1>2. Sort </h1>
            <div className="row">

              {/*Start of sorting subcolumn for 2 material-ui selects on 2 separate rows for sorting*/}
              <div className="col-sm-8">
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="order-field-label">Attribute</InputLabel>
                    <Select
                      labelId="order-field-label"
                      id="order-field"
                      value={orderField}
                      onChange={(event) => {setOrderField(event.target.value);console.log(event.target.value);}}
                    >
                      <MenuItem value={'First Name'}>First Name</MenuItem>
                      <MenuItem value={'Last Name'}>Last Name</MenuItem>
                      <MenuItem value={'OpenSecrets ID'}>OpenSecrets ID</MenuItem>
                      <MenuItem value={'Office'}>Office</MenuItem>
                      <MenuItem value={'Party'}>Party</MenuItem>
                      <MenuItem value={'State'}>State</MenuItem>
                      <MenuItem value={'Total Received'}>Total Received</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row">
                <FormControl required className={classes.formControl}>
                    <InputLabel id="order-direction-label">Order</InputLabel>
                    <Select
                      labelId="order-direction-label"
                      id="order-direction"
                      value={orderDirection}
                      onChange={(event) => {setOrderDirection(event.target.value);console.log(event.target.value);}}
                    >
                      <MenuItem value={'none'}><em>none</em></MenuItem>
                      <MenuItem value={'ascending'}>ascending</MenuItem>
                      <MenuItem value={'descending'}>descending</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/*End of sorting subcolumn for 2 material-ui selects on 2 separate rows for sorting*/}
              
              {/*Start of sorting subcolumn for Clear Sorting button*/}
              <div className="col-sm-4">
                <div className="row">
                  <button 
                    type="button"
                    onClick={()=>{setOrderField("");setOrderDirection("none");}}
                  >Clear Sorting</button>
                </div>
              </div>
              {/*End of sorting subcolumn for Clear Sorting button*/}

            </div>
          </div>
          {/*End of sorting column*/}


          {/*Start of searching column*/}
          <div className="col-sm-3" style={{'backgroundColor':'lightgray'}}>
            <h1>3. Search</h1>
            {/* <input
              type="text"
              placeholder="Search..."
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  setSearchTerm(event.target.value);
                  console.log(event.target.value);
                }
              }}
            >
            </input> */}
            <Button
              component={Link} to={`/CampFin/Search`}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}>
              Search
            </Button>
          </div>
          {/*End of searching column*/}

        </div>
        {/*End of row for filtering, sorting, and searching*/}


        {/*Pop-up - when View Filters button is clicked, setView(true); pop-up closed by clicking anywhere else by default*/}
        <Dialog open={view} onClose={()=>setView(false)}>
        {
          filters.map((filter)=>{
            return <ListItem>{`${filter['name']}    ${filter['op']}    ${filter['val']}`}</ListItem>;
          })
        }
        </Dialog>

        Number of Instances: {numResults}

        {/*Displaying instance cards*/}
        <div className="row">
          {mapData()}  
        </div>
        
      </div>
      {/*End of bootstrap container*/}

      <br></br>
      
      {/*Pagination component*/}
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
          color="primary"
          size="large"
        />
      </Box>

      <br></br>

    </div>
  )
}

export default Members
