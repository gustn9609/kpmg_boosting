import { Box, Typography, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HorizonLine from "../../components/HorizonLine";
import FeedbackChart from "../../components/FeedbackChart";
import BarChartIcon from '@mui/icons-material/BarChart';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import FeedbackCard from "../../components/FeedbackCard";

function StaffInfo() {
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
            <Header title="Peer Review" subtitle="Peer review to evaluate employees" />
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
            {/* Employee information */}
            <Box
              gridColumn="span 5"
              gridRow="span 7"
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

              <Box
                mt="20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src="./person.png" alt="person" width="30%"/>
              </Box>
                
              <Box ml="10px" mr="10px" mb="20px" mt="10px">
                <HorizonLine />
              </Box>

              <Box
                mt="10px"
                ml="10px"
              >
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  이름 : 박승현
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  연락처 : 010-0000-0000
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  E-mail : kpmg.test@naver.com
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  나이 : 27
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  계열사 : KPMG
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  부서 : SW 개발
                </Typography>
                <Typography variant="h6" fontSize="18px" fontWeight="700">
                  최근 인사 평가 : A
                </Typography>
              </Box>

            </Box>

            {/* Feedback comment */}
            <Box
              gridColumn="span 7"
              gridRow="span 12"
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
                  Feedback Comment
                </Typography>
                <MessageIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
              </Box>

              <Box ml="10px" mr="10px" mb="10px">
                <HorizonLine />
              </Box>

              <Box>
                <FeedbackCard num={1} part={"SW 개발"} comment={"한 번 시작한 일은 책임감을 가지고 끝까지 해내며, 문제가 있을 경우 이를 해결하기 위해 능동적으로 소통한다."}/>
                <FeedbackCard num={2} part={"SW 개발"} comment={"새로운 기술 스택을 배우고 있음에도 좋은 코드를 빠르게 작성한다. 또 꾸준한 공부를 통해 팀에 도움이 많이 된다."}/>
                <FeedbackCard num={3} part={"SW 개발"} comment={"좋은 아이디어가 많은데도 불구하고 회의에서 조용한 편인 것 같다。회의에서 좀 더 의견을 냈으면 좋겠다。"}/>
                <FeedbackCard num={4} part={"SW 개발"} comment={"비현실적인 요구 사항이 있을 때 야근을 해서라도 다 해내는 경향이 있는데、 이럴 때는 어느 정도 쳐내는게 낫다。"}/>
              </Box>

            </Box>
            
            {/* Feedback bar */}
            <Box
              gridColumn="span 5"
              gridRow="span 5"
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
                  Feedback
                </Typography>
                <BarChartIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
              </Box>

              <Box ml="10px" mr="10px" mb="10px">
                <HorizonLine />
              </Box>

              <Box height="240px">
                <FeedbackChart />
              </Box>
              
            </Box>
            
            {/* Inference */}
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
                  Inference
                </Typography>
                <AnnouncementIcon sx={{ fontSize: "32px", color: colors.greenAccent[500] }}/>
              </Box>

              <Box ml="10px" mr="10px" mb="10px">
                <HorizonLine />
              </Box>
              
              <Box ml="20px">
                <Typography fontSize="16px" fontWeight="700">
                  꾸준한 공부와 끊임없는 아이디어로 팀에 많은 도움을 제공해준다. 그러나 회의에서는 다소 적극적이지 못한 모습을 보이곤 한다. 회의 과정에서 타인과 적극 소통한다면 더 좋은 팀원으로 거듭날 수 있을 것으로 기대된다.
                </Typography>
              </Box>
            </Box>

          </Box>

          
          
          {/* Space */}
          <Box mt="10px">
                <Typography>&nbsp;</Typography>
          </Box>



        </Box>
      </Box>
    </Box>
  )
}

export default StaffInfo