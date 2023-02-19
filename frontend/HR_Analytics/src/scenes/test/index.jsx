import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getTestData, getPosters, getPurified } from "../utils/Utils.js"


function Test() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState({});

  //const temp = {"text": "시발"};
  //const response = getTestData(temp);
  //console.log(response);
  const info = {
    "sentence": "아니 시발 이게 맞아요?? 좆같이 생겼네"
  }
  const response = getPurified(info);
  console.log(response);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
        <Header title="Test Page" subtitle="Here we test our API" />
        
      </Box>
    </Box>
  )
}

export default Test