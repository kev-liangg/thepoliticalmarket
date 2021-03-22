import React from "react";
import { Link } from 'react-router-dom';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@material-ui/data-grid';
const columns: GridColDef[] = [
    { field: 'id', headerName: 'Award ID', width: 200 },
    { field: 'contractor', headerName: 'Contractor', width: 200, 
    renderCell: (params: GridCellParams) => (
      <strong>
        {<Link to="/react">{params.value}</Link>}
      </strong>
    ), },
    {
      field: 'amountAwarded', headerName: 'Amount Awarded',
      type: 'number',
      width: 200,
    },
    {
      field: 'awardDate',
      headerName: 'Award Date',
      width: 160,
    },
  ];
  const rows: GridRowsProp = [
    { id: 'N0001917C0001', contractor: 'LOCKHEED MARTIN CORPORATION',amountAwarded: 16597954142, awardDate: '11/26/2019'},
    { id: 'N0001918C1021', contractor: 'RAYTHEON TECHNOLOGIES CORPOR',amountAwarded: 3179973445, awardDate: '9/30/2019'},
    { id: 'FA863412C2651', contractor: 'BOEING COMPANY THE', amountAwarded: 3373880000, awardDate: '3/8/2012'},
  ];
  

function Contracts(){
    return (
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
    );
}
export default Contracts