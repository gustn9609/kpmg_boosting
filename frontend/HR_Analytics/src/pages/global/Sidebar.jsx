import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import 'react-pro-sidebar/dist/css/styles.css';
import React from 'react'

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const Item = ({title, to, icon, selected, setSelected}) => {
  const theme = useTheme();
  const colors= tokens(theme.palette.mode);
  return (
    <MenuItem active={selected === title} style={{color: colors.grey[100]}} onClick={() => setSelected(title)} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important"
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important"
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important"
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important"
      },
      "& .pro-sidebar":{
        height: "250%"
      }
      }}>
      
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and Menu Icon */}
          <MenuItem 
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
          }}>
            {!isCollapsed && (
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                ml="15px"
                >
                <Typography variant="h6" color={colors.grey[100]}>Boosting</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>

              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mt="30px" mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center" mb="10px">
                <img alt="user-profile" width="100px" height="100px" src={'../../logo.png'} style={{cursor: "pointer", borderRadius: "50%"}} />
              </Box>

              <Box textAlign="center">
                <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sc={{m: "10px 0 0 0"}}>
                  Boosting
                </Typography>
                <Typography variant="h7" color={colors.greenAccent[500]}>
                  HR Analytics
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} mt="50px">
            <Box mb="20px">
              <Typography variant="h7" ml="15px">Application</Typography>
              <Item title="Application List" to="/applicant_list" icon={<RecentActorsIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Grouping" to="/grouping" icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Single User" to="/user_info" icon={<BadgeIcon />} selected={selected} setSelected={setSelected} />
            </Box>
            
            <Box>
              <Typography variant="h7" ml="15px">Peer Review</Typography>
              <Item title="Staffs" to="/staff" icon={<AssignmentIndIcon />} selected={selected} setSelected={setSelected} />
              <Item title="Staff Page" to="/staff_info" icon={<ContactPageIcon />} selected={selected} setSelected={setSelected} />
            </Box>
          
          </Box>
        </Menu>
      </ProSidebar>

    </Box>
  )
}

export default Sidebar