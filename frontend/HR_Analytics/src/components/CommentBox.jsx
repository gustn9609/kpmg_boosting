import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { permitLabel, rejectLabel } from "../scenes/utils/Utils.js";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function CommentBox({idx, text, date}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="20px">
      <Card>
        <Box display="flex">
          <Box ml="10px" mt="7px">
            <AccountCircleIcon />
          </Box>
          <Typography variant="h6" ml="10px" mt="5px" sx={{ color: "#f0e68c" }}>익명 {Number(idx) + 1} </Typography>
        </Box>
        <Box>
          <Typography variant="h8" ml="20px">Date : {date}</Typography>
        </Box>
        <Box>
          <Typography variant="h7" ml="20px" sx={{ color: "#fffacd" }}>Comment : {text}</Typography>
        </Box>
      </Card>
    </Box>
  )
}

export default CommentBox