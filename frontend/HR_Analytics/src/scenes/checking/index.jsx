import { Box } from "@mui/material";
import React, { useState } from 'react';
import Header from "../../components/Header";
import { getNeedCheckData, cardDisplay } from "../utils/Utils.js";

function Checking() {
  const [initial, setInitial] = useState(false);
  const [dataStore, setDataStore] = useState([]);

  // Initial setting
  if (initial === false){
    const needCheckData = getNeedCheckData();
    const tempStore = []
    needCheckData.then(function(response){
      for(var item in response.data){
        tempStore.push(response.data[item]);
      }
      tempStore.sort(() => Math.random() - 0.5);
      setDataStore(tempStore);
      setInitial(true);
    })
  }

  return (
    <Box m="20px">
      <Header title="Data Checking" subtitle="Check labeled data before updating to database (Only for team 6)" />
      <Box 
        display="grid" 
        gap="30px" 
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > box": { gridColumn: "span 2"}
        }}
      >
        
      {cardDisplay(dataStore.copyWithin(), setInitial)}
      </Box>
    </Box>
  )
}

export default Checking