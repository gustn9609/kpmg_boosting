import { Box } from "@mui/material";
import React, { useState } from 'react';
import Header from "../../components/Header";
import { DataGrid } from '@mui/x-data-grid';

import { applicationList } from "../../data/userData";
import { staffDatas } from "../../data/staffData";

const columns = [
  {field: "id", headerName: "ID", width: 30},
  {field: "name", headerName: "Name", width: 150},
  {field: "company", headerName: "Company", width: 180},
  {field: "application_area", headerName: "Area", width: 150},
  {field: "year", headerName: "Years", width: 60},
]


function Staff() {
  return (
    <Box m="20px">
      <Header title="Staff List" subtitle="Employees of our company" />
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid rows={staffDatas} columns={columns}/>
      </Box>
    </Box>
  )
}

export default Staff