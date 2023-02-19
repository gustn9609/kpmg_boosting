import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import { mockDataTeam } from "../../data/mockData";
import React from 'react'

function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1},
    { field: "email", headerName: "Email Number", flex: 1},
    { 
      field: "access", 
      headerName: "Access Level", 
      flex: 1, 
      renderCell: ({row: { access }}) => {
        return (
          <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" 
          backgroundColor={ access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700] }
          borderRadius="4px">
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        )
       }},
  ]
    
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
        <Header title="TEAM" subtitle="Manaing the Team Members" />
      </Box>
      <Box m="40px 0 0 0" height="75vh" 
      sx={{ "&.MuiDataGrid-root": {border: "none",}, }}>
        <DataGrid rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>

  )
}

export default Team