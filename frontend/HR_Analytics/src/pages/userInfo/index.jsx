import { Box, Typography, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HorizonLine from "../../components/HorizonLine";
import CoverLetter from "../../components/CoverLetter";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudIcon from '@mui/icons-material/Cloud';
import TagIcon from '@mui/icons-material/Tag';
import DiamondIcon from '@mui/icons-material/Diamond';
import RadarChart from "../../components/RadarChart";
import PersonIcon from '@mui/icons-material/Person';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import RankChart from "../../components/RankChart";
import SimilarUser from "../../components/SimilarUser";


function UserInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box m="20px">
      <Box
        backgroundColor={colors.primary[300]}
      >
        <Box m="20px">
          {/* Space */}
          <Box mb="10px">
            <Typography>&nbsp;</Typography>
          </Box>
          
          <Box display="flex" justifyContent="space-between" alignitem="center">
            <Header title="User Information" subtitle="Evaluate the applicant's competence" />
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
                  <ArrowBackIosIcon sx={{ mr: "10px" }}/>
                  Go Back
                </Button>
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="50px"
            gap="20px"
          >

            {/* User Infomation */}
            <Box
              gridColumn="span 12"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                mb="10px"
                p="0 20px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                  User Information
                </Typography>
                <PersonIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
              </Box>

              <Box ml="10px" mr="10px" mb="10px">
                <HorizonLine />
              </Box>
              
              <Box ml="10px">
                <Typography variant="h6" fontWeight="500">
                  ?????? : ?????????
                </Typography>
                <Typography variant="h6" fontWeight="500">
                  ?????? ?????? : SW ??????
                </Typography>
                <Typography variant="h6" fontWeight="500">
                  Test Score : 10 / 10
                </Typography>
              </Box>


            </Box>

            {/* Cover letter */}
            <Box
              gridColumn="span 7"
              gridRow="span 19"
              backgroundColor={colors.primary[400]}
            >
              <CoverLetter />
              
            </Box>
            
            {/* Word Cloud */}
            <Box
              gridColumn="span 5"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
              alignItems="center"
              justifyContent="center"
            >
              <Box m="10px 10px">
                <Box
                  mt="25px"
                  mb="10px"
                  p="0 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                    Word Cloud
                  </Typography>
                  <CloudIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
                </Box>
              </Box>
              
              
              <Box ml="10px" mr="10px" mb="10px">
                <HorizonLine />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <img src="./wordcloud.png" alt="word_cloud" width="90%"/>
              </Box>
            </Box>
            
            {/* Hash Tag */}
            <Box
              gridColumn="span 5"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Box m="10px 10px">
                <Box
                  mt="25px"
                  mb="10px"
                  p="0 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                    Hash Tag
                  </Typography>
                  <TagIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
                </Box>
                
                <Box ml="10px" mr="10px" mb="20px">
                  <HorizonLine />
                </Box>
                
                <Box ml="10px">
                  <Chip label="#??????" variant="outlined" color="secondary"/>
                  <Chip label="#??????" variant="outlined" color="secondary"/>
                  <Chip label="#??????" variant="outlined" color="secondary"/>
                  <Chip label="#????????????" variant="outlined" color="secondary"/>
                  <Chip label="#?????????" variant="outlined" color="secondary"/>
                  <Chip label="#????????????" variant="outlined" color="secondary"/>
                </Box>

              </Box>
            </Box>
            

            {/* Ability */}
            <Box
              gridColumn="span 5"
              gridRow="span 5"
              backgroundColor={colors.primary[400]}
            >
              <Box m="10px 10px">
                <Box
                  mt="25px"
                  mb="10px"
                  p="0 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                    Ability
                  </Typography>
                  <DiamondIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
                </Box>

                <Box ml="10px" mr="10px">
                  <HorizonLine />
                </Box>
                  
                <Box height="250px">
                  <RadarChart />
                </Box>

              </Box>
            </Box>

            
            {/* Ranking */}
            <Box
              gridColumn="span 5"
              gridRow="span 6"
              backgroundColor={colors.primary[400]}
            >
              <Box m="10px 10px">
                <Box
                  mt="25px"
                  mb="10px"
                  p="0 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                    Rank
                  </Typography>
                  <MilitaryTechIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
                </Box>
              </Box>

              <Box ml="10px" mr="10px">
                  <HorizonLine />
              </Box>

              <Box height="310px">
                <RankChart />
              </Box>
              
            </Box>
            
            {/* Similar user */}
            <Box
              gridColumn="span 12"
              gridRow="span 3"
              backgroundColor={colors.primary[400]}
            >
              <Box m="0 10px">
                <Box
                  mt="20px"
                  mb="10px"
                  p="0 20px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
                    Similar User
                  </Typography>
                  <AltRouteIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
                </Box>
              </Box>

              <Box ml="10px" mr="10px">
                  <HorizonLine />
              </Box>
              
              <Box display="flex">
                <SimilarUser name={"?????????"} part={"SW ??????"} score={10} />
                <SimilarUser name={"?????????"} part={"SW ??????"} score={6} />
                <SimilarUser name={"?????????"} part={"SW ??????"} score={8} />
                <SimilarUser name={"?????????"} part={"SW ??????"} score={5} />
              </Box>
            </Box>
          </Box>

          {/* Space */}
          <Box mt="10px">
              <Typography>&nbsp;</Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="10px">
        <Button type="submit" color="secondary" variant="contained">
          ??????
        </Button>
        <Button type="submit" color="primary" variant="contained">
          ?????????
        </Button>
      </Box>
      
    </Box>
  )
}

export default UserInfo