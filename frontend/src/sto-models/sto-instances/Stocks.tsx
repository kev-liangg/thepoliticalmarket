import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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

  useEffect(() => {
    fetch(`https://api.thepoliticalmarket.tech/v1/matchedstock`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.objects);
        console.log(data)
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  });

  
  return (
    <> {
      !isLoading && (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid getRowId={(row)=>row.Symbol} rows={data} columns={columns} pageSize={5} checkboxSelection />
      </div>
      
      )} </>
  );
}
export default Stocks