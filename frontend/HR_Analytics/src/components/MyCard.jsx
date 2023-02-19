import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { permitLabel, rejectLabel } from "../scenes/utils/Utils.js";

function MyCard({ data }) {
  const id = data._id;
  const nick_name = data.nick_name;
  const text = data.text;
  const target = data.target;
  const label = data.label;

  return (
    <Box sx={{ minWidth: 275, gridColumn: "span 2"}}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Box 
            sx={{
              display: "flex",
              justifyContent: "space-between"
            }}
            >
              <Box>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Text ID : 
                </Typography>
                <Typography variant="h7" component="div" gutterBottom>
                    {id}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Nick Name : 
                </Typography>
                <Typography variant="h7" component="div" gutterBottom>
                    {nick_name}
                </Typography>
                <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Label : 
                </Typography>
                <Typography mb="5px" variant="h7" component="div" gutterBottom>
                    ({label})
                </Typography>
                <Typography  sx={{ fontSize: 18 }} color="greenyellow" gutterBottom>
                    욕설 or 혐오 데이터 : 
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {text}
                </Typography>
                <Typography  sx={{ fontSize: 18 }} color="greenyellow" gutterBottom>
                    순화한 데이터 : 
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {target}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="end">
                <Button type="submit" onClick={() => permitLabel({"id": id, "nick_name": nick_name, "text": text, "target": target, "label": label})} color="secondary" variant="outlined">OK</Button>
                <p>&nbsp;&nbsp;</p>
                <Button type="submit" onClick={() => rejectLabel({"id": id, "nick_name": nick_name, "text": text, "target": target, "label": label})} color="secondary" variant="outlined">Reject</Button> 
              </Box>
            </Box>
          </CardContent>
        </React.Fragment>  
      </Card>
    </Box>
  )
}

export default MyCard