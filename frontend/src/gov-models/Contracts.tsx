import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Pagination } from "@material-ui/core";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridCellParams,
  GridSortModel,
  GridSortModelParams,
  GridFilterItem,
  GridFilterModelParams
} from '@material-ui/data-grid';
import Dropdown from 'react-bootstrap/Dropdown'
import './ContractTable.css'

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const columns: GridColDef[] = [
  {
    field: 'id', headerName: 'Contract Page', width: 150,
    renderCell: (params: GridCellParams) => (
      <strong>
        <Button
          component={Link} to={`/Contracts/${params.value}`}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}>
          Open
        </Button>
      </strong>
    ),
  },
  { field: 'contract_award_id', headerName: 'Award ID', width: 200 },
  { field: 'contract_recipient', headerName: 'Recipient', width: 200 },
  {
    field: 'contract_currentval', headerName: 'Contract Value',
    type: 'number',
    width: 160,
  },
  {
    field: 'contract_date',
    headerName: 'Award Date',
    width: 160,
  },
  {
    field: 'contract_naics', headerName: 'NAICS',
    type: 'string',
    width: 150,
  },
  {
    field: 'contract_sop',
    headerName: 'State',
    width: 160,
  },
  {
    field: 'contract_recipient_district',
    headerName: 'Congressional District',
    width: 140
  }
];

const tablePropsInit: ITableProps = {
  columns: [
    {key: 'id', title: 'View Contract', style: {width: 150, textAlign: 'center'}},
    {key: 'contract_award_id', title: 'Award ID', dataType: DataType.String},
    {key: 'contract_recipient', title: 'Recipient', dataType: DataType.String},
    {key: 'contract_currentval', title: 'Contract Value', dataType: DataType.Number},
    {key: 'contract_date', title: 'Award Date', dataType: DataType.String},
    {key: 'contract_naics', title: 'NAICS', dataType: DataType.String},
    {key: 'contract_sop', title: 'State', dataType: DataType.String},
    {key: 'contract_recipient_district', title: 'Congressional District', dataType: DataType.String},
  ],
  data: [],
  rowKeyField: 'id'
}

const url = "https://api.thepoliticalmarket.tech/v1/contract"

function Contracts() {

  const cancel = ""
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GridRowsProp>([] as GridRowsProp);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCol, setSortCol] = useState<GridSortModel>([{ field: 'id', sort: 'asc' }])
  const [filter, setFilter] = useState<GridFilterItem>();
  const [numResults, setNumResults] = useState(0);
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  useEffect(() => {
    let query : any = {};
    let toFetch = url + `?page=${page}`;
    if (sortCol.length !== 0) {
      query.order_by = [{ field: sortCol[0].field, direction: sortCol[0].sort }];
    }
    if (typeof filter !== "undefined" && filter.value) {
      query.filters = constructFilter(filter);
    }
    toFetch = toFetch + `&q=${JSON.stringify(query)}`;
    fetch(toFetch, {})
      .then((res) => res.json())
      .then((response) => {
        console.log(toFetch);
        setData(response["objects"]);
        setIsLoading(true);

        let newProps = tableProps;
        newProps.data = response["objects"];
        changeTableProps(newProps);

        setNumResults(response["num_results"]);
        setNumPages(response["total_pages"]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, sortCol, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to handle server-side sort
  const handleSort = (params: GridSortModelParams) => {
    if (params.sortModel !== sortCol) {
      setSortCol(params.sortModel);
    }
  };

  const handleFilter = (params: GridFilterModelParams) => {
    setFilter(params.filterModel.items[0]);
  };

  const constructFilter = (item: GridFilterItem) => {
    let filter : any = {name: item.columnField};
    switch (item.operatorValue) {
      case "contains":
        filter.op="like";
        filter.val="%"+item.value+"%";  // any characters before or after
        break;
      case "equals":
        filter.op="like";
        filter.val=item.value           // must contain exact value
        break;
      case "starts_with":
        filter.op="like";
        filter.val=item.value+"%";      // any characters after only
        break;
      case "ends_with":
        filter.op="like"
        filter.val="%"+item.value;      // any characters before only
        break;
      default:
        filter.op=undefined;
        filter.val=undefined;
    }
    return [filter];
  }

  const fetchSearchResults = (pageNumber = '',query : string) =>{
    
  }

  return !isLoading && (
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
        
        <div style={{ height: 800, width: '100%' }}>
          {/* <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            hideFooterPagination={true}
            checkboxSelection
            sortingMode="server"
            filterMode="server"
            onSortModelChange={handleSort}
            onFilterModelChange={handleFilter}
          /> */}
              <Table
                {...tableProps}
                childComponents={{
                  cellText: {
                    content: (props) => {
                      switch (props.column.key){
                        case 'command1': return (           
                        <Button
                          component={Link} to={`/Contracts/1`}
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