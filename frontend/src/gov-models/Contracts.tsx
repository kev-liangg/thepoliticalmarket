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
        filter.op="like"
        filter.val="%"+item.value+"%";
        break;
      default:
        filter.op=undefined;
        filter.val=undefined;
    }
    return [filter];
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
          onChange={(event) => {
            setSearchTerm(event.target.value)
            console.log(event.target.value)
          }}></input>
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
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            hideFooterPagination={true}
            checkboxSelection
            sortingMode="server"
            filterMode="server"
            onSortModelChange={handleSort}
            onFilterModelChange={handleFilter}
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