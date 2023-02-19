import { Box, IconButton, Typography, useTheme  } from "@mui/material";
import Header from "../../components/Header";
import React, {useState} from 'react'
import { tokens } from "../../theme";
import { userCount, getDashboardData } from "../utils/Utils.js"
import StateBox from "../../components/StateBox";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";

import DatasetIcon from '@mui/icons-material/Dataset';
import MouseIcon from '@mui/icons-material/Mouse';
import RuleIcon from '@mui/icons-material/Rule';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


function Dashboard() {
  const [checkCount, setCheckCount] = useState(false);
  const [todayHit, setTodayHit] = useState(false);
  const [todayData, setTodayData] = useState(false);
  const [barData, setBarData] = useState(false);
  const [lineData, setLineData] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  if (todayHit === false){
    userCount();
    const response = getDashboardData();
    response.then(async function(response){
      setCheckCount(response.data["check_count"]);
      setTodayHit(response.data["today_hit"]);
      setTodayData(response.data["today_data"]);
      setBarData(response.data["top_user"]);
      setLineData(response.data["daily_data"]);
    })
  }
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="155px"
        gap="20px"
      >
        {/* Row 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox 
            title="Need to check" 
            subtitle="빠른 checking 필요" 
            icon={<RuleIcon sx={{color: colors.greenAccent[600], fontSize: "32px"}}/>} 
            value={checkCount} 
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox 
            title="Today Hit" 
            subtitle="관심도" 
            icon={<MouseIcon sx={{color: colors.greenAccent[600], fontSize: "32px"}}/>} 
            value={todayHit}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox 
            title="Today Data" 
            subtitle="꾸준한 수집" 
            icon={<DatasetIcon sx={{color: colors.greenAccent[600], fontSize: "32px"}}/>} 
            value={todayData}
          />
        </Box>

        {/* Row 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h7" fontWeight="600" color={colors.grey[100]}>
                고마운 분들
              </Typography>
              <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                Top 10
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <EmojiEventsIcon
                  sx={{ fontSize: "32px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Chart */}
          <Box height="240px" ml="20px">
            {barData != false && (
              <BarChart data={barData}/>
            )}
          </Box>
        </Box>

        {/* Row 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h7" fontWeight="600" color={colors.grey[100]}>
                꾸준한 데이터 수집
              </Typography>
              <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                Daily Collected
              </Typography>
            </Box>

            <Box>
              <IconButton>
                <DirectionsRunIcon
                  sx={{ fontSize: "32px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Line  */}
          <Box height="240px" ml="20px">
            {lineData != false && (
              <LineChart data={lineData}/>
            )}
          </Box>
        </Box>

      </Box>

    </Box>
  )
}

export default Dashboard