import { Box, Typography } from "@mui/material";
import React, { useState } from 'react';
import Header from "../../components/Header";
import OneGroup from "../../components/OneGroup";

import { groupData } from "../../data/groupData";


function Grouping() {
  const [expanded, setExpanded] = useState(false);

  const groupMaker = () => {
    const groups = [];
    for(var i in groupData){
      groups.push(
        <OneGroup 
          num={Number(i)+1}
          detail={groupData[i]["detail"]}
          data={groupData[i]["data"]}
          expanded={expanded}
          handleChange={(panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
          }}
        />
      )
    }
    return groups;
  }

  return (
    <Box m="20px">
      <Header title="Grouping" subtitle="Grouping similar candidates" />
      
      {groupMaker()}
    
    </Box>
  )
}

export default Grouping