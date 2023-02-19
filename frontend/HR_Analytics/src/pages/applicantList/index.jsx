import { Box } from "@mui/material";
import React, { useState } from 'react';
import Header from "../../components/Header";
import { DataGrid } from '@mui/x-data-grid';


import { applicationList } from "../../data/userData";

const columns = [
  {field: "id", headerName: "ID", width: 30},
  {field: "name", headerName: "Name", width: 150},
  {field: "company", headerName: "Company", width: 180},
  {field: "application_area", headerName: "Area", width: 150},
  {field: "test_score", headerName: "Score", width: 60},
]


function ApplicantList() {

  return (
    <Box m="20px">
      <Header title="Applicant List" subtitle="Applicants who applied our company" />
      <Box sx={{ height: 800, width: '100%' }}>
        <DataGrid rows={applicationList} columns={columns}/>
      </Box>
    </Box>
  )
}

export default ApplicantList