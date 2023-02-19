import * as React from 'react';
import { tokens } from "../theme";
import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme  } from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import LineChart from "./LineChart";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


function HateInfo({flag, data, text}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = React.useState(false);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(!expanded);
  };


  const temp = {

  };

  return (
    <Accordion disabled={flag} expanded={expanded} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h8" color="secondary">욕설 및 혐오 표현 확인</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="120px"
            gap="20px"
          >
            <Box
              gridColumn="span 12"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box height="240px" ml="20px">
                <LineChart data={data}/>
              </Box>
            </Box>
          </Box>
          <Box mt="10px" mb="10px">
            <Typography variant="h8" sx={{ color: "#f0e68c" }}>이런 방식으로 댓글을 바꿔보면 어떨까요??</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "#00bfff" }}> {text} </Typography>
          </Box>
          
        </AccordionDetails>
    </Accordion>
  )
}

export default HateInfo