import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@material-ui/data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Index', width: 150,
    renderCell: (params: GridCellParams) => (
      <strong>
        <Button
          component={Link} to={`/Stocks/${params.value}`}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}>
          Open
        </Button>
      </strong>
    ),},
    { field: 'Symbol', headerName: 'Symbol', width: 200 },
    { field: 'contract_recipient', headerName: 'Recipient', width: 200, 
    renderCell: (params: GridCellParams) => (
      <strong>
        {<Link to="/react">{params.value}</Link>}
      </strong>
    ), },
    {
      field: 'contract_currentval', headerName: 'Contract Value',
      type: 'number',
      width: 200,
    },
    {
      field: 'contract_date',
      headerName: 'Award Date',
      width: 160,
    },
    {
      field: 'contract_naics', headerName: 'NAICS',
      type: 'number',
      width: 200,
    },
    {
      field: 'contract_sop',
      headerName: 'State',
      width: 160,
    },
  ];
  const rows: GridRowsProp = [
    { index: 30, id: '1', contractor: 'LOCKHEED MARTIN CORPORATION',amountAwarded: 16597954142, awardDate: '11/26/2019'},
    { id: '2', contractor: 'RAYTHEON TECHNOLOGIES CORPOR',amountAwarded: 3179973445, awardDate: '9/30/2019'},
    { id: '3', contractor: 'BOEING COMPANY THE', amountAwarded: 3373880000, awardDate: '3/8/2012'},
  ];
function Stocks(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GridRowsProp>([] as GridRowsProp);

  useEffect(() => {
    fetch(`http://127.0.0.1:8081/api/stock`, {})
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
      </div>
      
      )} </>
  );
}
export default Stocks