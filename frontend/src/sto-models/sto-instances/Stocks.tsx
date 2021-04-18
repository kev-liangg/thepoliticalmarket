import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pagination } from "@material-ui/core";
import Dropdown from 'react-bootstrap/Dropdown'
import '../../Components/table-style.css'
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
import { fields, groups } from './StocksFilter'


const tablePropsInit: ITableProps = {
  columns: [
    { key: 'id', title: 'Stock Page', style: {width: 150, textAlign: 'center'}},
    { key: 'Symbol', title: 'Symbol'},
    { key: 'Full_Name', title: 'Full Name'},
    { key: 'Last_Sale', title: 'Last Sale', dataType: DataType.Number},
    { key: 'Net_Change', title: 'Net Change', dataType: DataType.Number},
    { key: 'Percentage_Change', title: '% Change'},
    { key: 'Market_Cap', title: 'Market Capacity (k)', dataType: DataType.Number},
    { key: 'Volume', title: 'Volume', dataType: DataType.Number},
    { key: 'IPO_Year', title: 'IPO Year'},
    { key: 'Sector', title: 'Sector'},
    { key: 'Industry', title: 'Industry'},
    { key: 'State', title: 'State'},
    { key: 'Country', title: 'Country'},
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

const url = "https://api.thepoliticalmarket.tech/v1/matchedstock"

function Stocks(){

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
        field: c.key === 'id' ? 'Symbol' : c.key,
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
        <div className = "wrapper">
        <div className = "block">
        <input
          type="text"
          placeholder="Search..."
          // onChange={(event) => {
          //   setSearchTerm(event.target.value)
          //   console.log(event.target.value)
          // }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setSearchTerm((event.target as HTMLInputElement).value)
              console.log((event.target as HTMLInputElement).value)
            }
          }}
        ></input>
        </div>
        <div className = "block2">
          <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filters
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Listed on Stock Market</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        </div>
        <div>
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
                          component={Link} to={`/Stocks/${props.rowData.Symbol}`}
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
export default Stocks