import React from 'react'
import { tokens } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

function StateBox({ title, subtitle, icon, value}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h6" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle />
        </Box>
      </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h7" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {value}
          </Typography>
        </Box>
      
    </Box>
  )
}

export default StateBox