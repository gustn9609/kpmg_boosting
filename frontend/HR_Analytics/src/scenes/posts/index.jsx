import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Trafic } from "@mui/icons-material";
import React, { useState } from 'react'
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard";
import AddCardIcon from '@mui/icons-material/AddCard';
import { getPosters, postDisplay } from "../utils/Utils.js"

function Posts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [initial, setInitial] = useState(false);
  const [data, setData] = useState([]);

  if (initial == false){
    const response = getPosters();
    response.then(function(response){
      setData(response.data["datas"]);
      setInitial(true);
    })
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
          <Header title="Post" subtitle="Make posts and write your comments" />
        <Box>
            <Button
              sx={{ 
                backgroundColor: colors.blueAccent[700], 
                color: colors.grey[100], 
                fontSize: "14px", 
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <AddCardIcon sx={{ mr: "10px" }}/>
              Add new post
            </Button>
        </Box>
      </Box>
      
      {/* Posts + add new post */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="250px"
        gap="20px"
      >

        { postDisplay(data.copyWithin()) }

      </Box> 
    </Box>
  )
}

export default Posts