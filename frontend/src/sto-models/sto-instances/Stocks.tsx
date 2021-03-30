import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Pagination} from "@material-ui/core";
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@material-ui/data-grid';

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
      headerName: 'Market Capacity',
      type: 'number',
      width: 160,
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
function Stocks(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GridRowsProp>([] as GridRowsProp);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    fetch(`https://api.thepoliticalmarket.tech/v1/matchedstock?page=${page}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response["objects"]);
        setNumPages(response["total_pages"]);
        // console.log(response["objects"]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <h2>Loading...</h2>
  } 
  return (
    <> {
      <div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          getRowId={(row)=>row.Symbol} 
          rows={data} columns={columns} 
          pageSize={10} 
          hideFooterPagination={true}
          checkboxSelection
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