import * as React from 'react';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


function SimilarUser({name, part, score}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box ml="13px" width="23%">
      <Card variant="outlined" style={{backgroundColor: "#3e4396"}}>
        <React.Fragment>
          <CardContent>
          <Typography color="#ffda85">
              이름 : {name}
          </Typography>
          <Typography color="#ffda85">
              지원 분야 : {part}
          </Typography>
          <Typography color="#ffda85">
              Test Score : {score}
          </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
      <Box mt="30px">
        <Typography>&nbsp;</Typography>
      </Box>
    </Box>
  )
}

export default SimilarUser