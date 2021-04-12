import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import { Pagination, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  }
}));

function Members() {

  //let numPerPage = 0;
  const attributes = ['cand_firstname', 'cand_lastname', 'cand_crp_id', 'cand_office', 'cand_party', 'cand_state'];
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
    // setIsLoading(true);
    let query = {};
    if (filters.length !== 0) {
      query.filters = filters.map((filter)=>constructFilter(filter));
    }
    if (orderField !== "" && orderDirection !== "none") {
      query.order_by = constructOrderBy();
    }
    if (searchTerm !== "") {
      if (filters.length === 0) {
        query.filters = [];
      }
      query.filters.push({"or": attributes.map((attribute)=>{
        let filter = {name: attribute};
        filter.op = "like";
        filter.val = "%"+searchTerm+"%";
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
      case "Contributions Received":
        orderby.field='total_contributions';
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
      case "Contributions Received":
        filter.name='total_contributions';
        break;
      default:
        filter.name=undefined;
    }
    switch (item.op) {
      case "contains":
        filter.op="like";
        filter.val="%"+item.val+"%";  // any characters before or after
        break;
      case "equals":
        filter.op="like";
        filter.val=item.val           // must contain exact value
        break;
      case "starts with":
        filter.op="like";
        filter.val=item.val+"%";      // any characters after only
        break;
      case "ends with":
        filter.op="like";
        filter.val="%"+item.val;      // any characters before only
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
  function mapData () {
    if (typeof data != "undefined") {
      return data.map((memb) => {
        return <MemberCard member={memb} />;
      });
    }
    return [];
  }
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  return (
    <div className={classes.root}>
      <div className="container">
        <h1 style={{'textAlign':'center'}}>Campaign Finance</h1>
        <div className="row">
          <div className="col-sm-5" style={{'backgroundColor':'lightgray'}}>
            <h1>1. Filter </h1>
            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="filter-field-label">Attribute</InputLabel>
                    <Select
                      labelID="filter-field-label"
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
                      <MenuItem value={'Contributions Received'}>Contributions Received</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="filter-op-label">Operator</InputLabel>
                    <Select
                      labelID="filter-op-label"
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
                <br></br>
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
                          setFilters([...filters, {name: filterField, op: filterOp, val: event.target.value}]);
                        }
                      }
                    }}
                  >
                  </input>
                </div>
                <div className="row">
                  <p style={{'color':'black'}}>(Press Enter to Add Filter)</p>
                </div>
              </div>
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
            </div>
          </div>





          <div className="col-sm-4" style={{'backgroundColor':'white'}}>
            <h1>2. Sort </h1>
            <div className="row">
              <div className="col-sm-8">
                <div className="row">
                  <FormControl required className={classes.formControl}>
                    <InputLabel id="order-field-label">Attribute</InputLabel>
                    <Select
                      labelID="order-field-label"
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
                      <MenuItem value={'Contributions Received'}>Contributions Received</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="row">
                <FormControl required className={classes.formControl}>
                    <InputLabel id="order-direction-label">Order</InputLabel>
                    <Select
                      labelID="order-direction-label"
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
              <div className="col-sm-4">

              </div>
            </div>
          </div>
          <div className="col-sm-2.5" style={{'backgroundColor':'lightgray'}}>
            <h1>3. Search</h1>
            <input
              type="text"
              placeholder="Search..."
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  setSearchTerm(event.target.value);
                  console.log(event.target.value);
                }
              }}
            >
            </input>
          </div>
        </div>
        <Dialog open={view} onClose={()=>setView(false)}>
        {
          filters.map((filter)=>{
            return <ListItem>{`${filter['name']}    ${filter['op']}    ${filter['val']}`}</ListItem>;
          })
        }
        </Dialog>
        Number of Instances: {numResults}
        <div className="row">
        {
          mapData()
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
          color="primary"
          size="large"
        />
      </Box>
      <br></br>
    </div>
  )
}

export default Members
