import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@material-ui/data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Contract Page', width: 150,
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
    ),},
    { field: 'contract_award_id', headerName: 'Award ID', width: 200 },
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
      width: 150,
    },
    {
      field: 'contract_sop',
      headerName: 'State',
      width: 160,
    },
  ];
function Contracts(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GridRowsProp>([] as GridRowsProp);

  useEffect(() => {
    fetch(`http://127.0.0.1:8081/api/contract`, {})
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
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection />
      </div>
      
      )} </>
  );
}
export default Contracts