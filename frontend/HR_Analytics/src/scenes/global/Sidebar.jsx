import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import 'react-pro-sidebar/dist/css/styles.css';
import React from 'react'

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StarsIcon from '@mui/icons-material/Stars';
import BugReportIcon from '@mui/icons-material/BugReport';

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
                <Typography variant="h6" color={colors.grey[100]}>ADMINIS</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>

              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img alt="user-profile" width="100px" height="100px" src={'../../logo192.png'} style={{cursor: "pointer", borderRadius: "50%"}} />
              </Box>

              <Box textAlign="center">
                <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sc={{m: "10px 0 0 0"}}>
                  Happy-6조
                </Typography>
                <Typography variant="h7" color={colors.greenAccent[500]}>
                  Hate Speech Purification
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography variant="h7" ml="15px">Service</Typography>
            <Item title="Posts" to="/posts" icon={<NewspaperIcon />} selected={selected} setSelected={setSelected} />
            {/* <Item title="Test" to="/test" icon={<BugReportIcon />} selected={selected} setSelected={setSelected} /> */}
            <Typography variant="h7" ml="15px">Data</Typography>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Manage Team" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Labeling FAQ" to="/faq" icon={<HelpOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Data Collection" to="/collect_data" icon={<LibraryBooksIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Data Checking" to="/check_data" icon={<AssignmentTurnedInIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Reward Data" to="/reward_data" icon={<StarsIcon />} selected={selected} setSelected={setSelected} />
            {/* <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            {/* <Item title="Pie Chart" to="/pie" icon={<PieChartOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            {/* <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            {/* <Item title="Geography Chart" to="/geography" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
          </Box>
        </Menu>
      </ProSidebar>

    </Box>
  )
}

export default Sidebar