import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


const columns = [
    {field: "id", headerName: "ID", width: 30},
    {field: "name", headerName: "Name", width: 150},
    {field: "company", headerName: "Company", width: 180},
    {field: "application_area", headerName: "Area", width: 150},
    {field: "test_score", headerName: "Score", width: 60},
  ]

function OneGroup({num, detail, data, expanded, handleChange}) {

  return (
      <Accordion expanded={expanded === num} onChange={handleChange(num)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Group {num}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{detail}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: 800, width: '100%' }}>
            <DataGrid rows={data} columns={columns}/>
          </Box>
        </AccordionDetails>
      </Accordion>
  )
}

export default OneGroup