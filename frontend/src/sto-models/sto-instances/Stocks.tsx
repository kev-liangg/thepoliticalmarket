import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Pagination} from "@material-ui/core";
import { DataGrid, 
         GridRowsProp, 
         GridColDef, 
         GridCellParams,
         GridSortModel,
         GridSortModelParams } from '@material-ui/data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Index', width: 100,
    renderCell: (params: GridCellParams) => (
      <strong>
        <Button
          component={Link} to={`/Stocks/${params.value}`}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 5 }}>
          Open
        </Button>
      </strong>
    ),},
    { field: 'Symbol', headerName: 'Symbol', width: 100 },
    // { field: 'contract_recipient', headerName: 'Recipient', width: 200, 
    // renderCell: (params: GridCellParams) => (
    //   <strong>
    //     {<Link to="/react">{params.value}</Link>}
    //   </strong>
    // ), },
    {
      field: 'Full_Name', headerName: 'Full Name',
      width: 300,
    },
    {
      field: 'Last_Sale',
      headerName: 'Last Sale',
      type: 'number',
      width: 120,
    },
    {
      field: 'Net_Change', headerName: 'Net Change',
      type: 'number',
      width: 150,
    },
    {
      field: 'Percentage_Change',
      headerName: '% Change',
      width: 150,
    },

    {
      field: 'Market_Cap',
      headerName: 'Market Capacity (k)',
      type: 'number',
      width: 200,
    },

    {
      field: 'Volume',
      headerName: 'Volume',
      type: 'number',
      width: 160,
    },
    
    {
      field: 'IPO_Year',
      headerName: 'IPO Year',
      width: 120,
    },

    {
      field: 'Sector',
      headerName: 'Sector',
      width: 160,
    },
    {
      field: 'Industry',
      headerName: 'Industry',
      width: 250,
    },
    {
      field: 'State',
      headerName: 'State',
      width: 160,
    },
    {
      field: 'Country',
      headerName: 'Country',
      width: 160,
    },

  ];

const url = "https://api.thepoliticalmarket.tech/v1/matchedstock"

function Stocks(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GridRowsProp>([] as GridRowsProp);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)
  const [sortCol, setSortCol] = useState<GridSortModel>([{field:'Symbol', sort:'asc'}])

  useEffect(() => {
    let toFetch = url+`?page=${page}`;
    if (sortCol.length !== 0) {
      let query = {field: sortCol[0].field, direction:sortCol[0].sort};
      toFetch = toFetch+`&q={"order_by":[${JSON.stringify(query)}]}`
    }
    fetch(toFetch, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response["objects"]);
        setNumPages(response["total_pages"]);
        // console.log(response["objects"]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page, sortCol]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSort = (params : GridSortModelParams) => {
    if (params.sortModel !== sortCol) {
      setSortCol(params.sortModel);
    }
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  } 
  return (
    <> {
      <div>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid 
          getRowId={(row)=>row.Symbol} 
          rows={data} columns={columns} 
          pageSize={10} 
          hideFooterPagination={true}
          checkboxSelection
          sortingMode="server"
          onSortModelChange={handleSort}
        />
      </div>
      <Pagination 
          count = {numPages}
          onChange = {(event, page) => setPage(page)}
          showFirstButton
          showLastButton
          variant = "outlined"
          color="primary"
          size="large"
      />
      </div>
      }</>
  );
}
export default Stocks