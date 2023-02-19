import * as React from 'react';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function FeedbackCard({num, part, comment}) {
  return (
    <Box ml="20px" mr="20px" mb="10px">
      <Card variant="outlined" style={{backgroundColor: "#3e4396"}}>
        <React.Fragment>
          <CardContent>
          <Typography color="#ffda85">
              익명 {num}
          </Typography>
          <Typography color="#ffda85">
              부서 : {part} 
          </Typography>
          <Typography color="#ffda85">
              Peer Review : {comment} 
          </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  )
}

export default FeedbackCard