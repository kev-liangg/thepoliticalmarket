import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pagination } from "@material-ui/core";
import Dropdown from 'react-bootstrap/Dropdown'
import './ContractTable.css'
import '../Components/table-style.css'
// import 'ka-table/style.css'

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { 
  hideLoading, loadData, showLoading, updateData,
} from 'ka-table/actionCreators';
import { getSortedColumns } from 'ka-table/Utils/PropsUtils';

import FilterControl from 'react-filter-control';
import { IFilterControlFilterValue } from 'react-filter-control/interfaces';
import { fields, groups } from './ContractFilter'


const tablePropsInit: ITableProps = {
  columns: [
    {key: 'id', title: 'Contract Page', style: {width: 150, textAlign: 'center'}},
    {key: 'contract_award_id', title: 'Award ID', dataType: DataType.String},
    {key: 'contract_recipient', title: 'Recipient', dataType: DataType.String},
    {key: 'contract_currentval', title: 'Contract Value', dataType: DataType.Number},
    {key: 'contract_date', title: 'Award Date', dataType: DataType.String},
    {key: 'contract_naics', title: 'NAICS', dataType: DataType.String},
    {key: 'contract_sop', title: 'State', dataType: DataType.String},
    {key: 'contract_recipient_district', title: 'Congressional District', dataType: DataType.String},
  ],
  data: [],
  loading: {
    enabled: true
  },
  sortingMode: SortingMode.MultipleTripleStateRemote,
  rowKeyField: 'id'
}

export const filter: IFilterControlFilterValue = {
  groupName: 'and',
  items: []
};

const url = "https://api.thepoliticalmarket.tech/v1/contract"

function Contracts() {

  const cancel = ""
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)
  const [filterValue, setFilterValue] = useState(filter);
  const [searchTerm, setSearchTerm] = useState("");
  const [numResults, setNumResults] = useState(0);
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  useEffect(() => {
    // start loading animation
    
    dispatch(showLoading());

    let query : any = {};

    // process pagination
    let toFetch = url + `?page=${page}`;

    // process (multi)sort field of query
    let sorts = getSortedColumns(tableProps);
    if (sorts.length !== 0) {
      query.order_by = sorts.map(c => ({ 
        field: c.key, 
        direction: c.sortDirection === 'ascend' ? 'asc' : 'desc' 
      }));
    }

    // process filtering field of query
    console.log(filterValue);
    query.filters = [{[filterValue.groupName]: filterValue.items.map(makeFilter)}]

    // apply entire query to URL and fetch
    toFetch = toFetch + `&q=${JSON.stringify(query)}`;
    fetch(toFetch, {})
      .then((res) => res.json())
      .then((response) => {
        console.log(toFetch);
        // setIsLoading(true);

        dispatch(updateData(response["objects"]))
        setNumResults(response["num_results"]);
        setNumPages(response["total_pages"]);

        // finished loading all data, components updated
        dispatch(hideLoading());
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, tableProps.columns, filterValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const makeFilter = (item : any) : any => {
    if (item.groupName !== undefined) {
      return {[item.groupName]: item.items.map(makeFilter)};
    }
    let ret : any = {};
    ret.name = item.field;
    ret.op = item.operator;
    if (ret.op === 'like' || ret.op === 'not_like') {
      ret.val = '%25'+item.value+'%25';
    }
    else {
      ret.val = item.value;
    }
    return ret;
  }

  const handleFilter = (newFilterValue: IFilterControlFilterValue) => {
    setFilterValue(newFilterValue);
  }

  const fetchSearchResults = (pageNumber = '',query : string) =>{
    
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  } 
  return (
    <> {
      <div>
        <br></br>
        <div className = "wrapper">
        <div className = "block">
        <Button
          component={Link} to={`/Contracts/Search`}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}>
          Search Contracts
        </Button>
        </div>
        </div>
        <div>
          <br></br>
          <h4>Filters:</h4>
          <FilterControl {...{fields, groups, filterValue, 
            onFilterValueChanged: handleFilter}} />
        </div>
       
        <div>
            <Table
              {...tableProps}
              childComponents={{
                cellText: {
                  // for id column in each row, make button to contract page
                  content: (props) => {
                    switch (props.column.key){
                      case 'id': return (           
                        <Button
                          component={Link} to={`/Contracts/${props.rowData.id}`}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}>
                          Open
                        </Button>
                      )
                    }
                  }
                }
              }}
              dispatch={dispatch}
            />
        </div>
        <h5>
        </h5>
      <div>
      Number of Instances: {numResults}
      <div>Sorted Columns: {getSortedColumns(tableProps).map(c => `${c.key}: ${c.sortDirection}; `)}</div>
      </div>
      <h5>
      </h5>
      <Pagination 
          count = {numPages}
          page={page} // need to preserve old page number on render reset
          onChange = {(event, page) => setPage(page)}
          showFirstButton
          showLastButton
          variant="outlined"
          color="primary"
          size="large"
        />
      </div>
    } </>
  );
}
export default Contracts