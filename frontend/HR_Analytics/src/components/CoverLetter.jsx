import React from 'react'
import { tokens } from "../theme";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HorizonLine from "./HorizonLine";

function CoverLetter({icon, title}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      gridColumn="span 7"
      gridRow="span 2"
    >
      <Box
        mt="25px"
        p="0 20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h5" fontWeight="500" color={colors.greenAccent[500]}>
            자기소개서
          </Typography>
        </Box>
        <Box>
          <IconButton>
            <EmojiEventsIcon
              sx={{ fontSize: "32px", color: colors.greenAccent[500] }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box ml="10px" mr="10px">
        <HorizonLine />
      </Box>
      
      {/* First Paragraph */}
      <Box mt="10px">
        <Typography fontSize="15px" fontWeight="700" ml="10px" color="#ffe3a3">
          1) 자신이 해당 직무에 지원한 동기를 작성해주세요.
        </Typography>
        <Typography ml="10px" mt="10px" color="#87ceeb">
          [웹기획에 관심을 같기 시작한 …]
        </Typography>
        <Typography ml="10px">
          저는 대학시절부터 봉사활동, 학생회 활동을 통하여 사업을 기획하고 추진하며 다른 동료와 후 배들과 팀웍을 이루는데 소질이 있습니다. 매사에 적극적이며 추진력이 있다는 말을 않이 들 었습니다. 웹 기획에 관심을 가지고 수많은 사이트의 웹서핑, 좋은 사이트 분석을 통하여 사용자 중심의 구성과 서비스가 무엇인지, 그들이 지향하는 커뮤니티 방식이 무엇인지 할 수 있었습니다.학원에서 6개월 동안 웹기획에 필요한 툴을 배우고, 레이블링이나 카피를 쓰는 경험을 쌓기 위하여 카피라이터 일도 해보았습니다. 또한 방송국에서 구성작가로 일하면서 대중적인 글쓰기 방식과 사람들에게 감동을 줄 수 있 는 컨텐츠 구성방식을 터득할 수 있었습니다.
        </Typography>
      </Box>

      <Box ml="10px" mr="10px" mb="10px">
        <HorizonLine />
      </Box>

      {/* Second Paragraph */}
      <Box mt="10px">
        <Typography fontSize="15px" fontWeight="700" ml="10px" color="#ffe3a3">
          2) 기술적으로 어려운 문제를 해결한 경험을 상세히 작성해 주세요. (1)
        </Typography>
        <Typography ml="10px" mt="10px" color="#87ceeb">
          [10초에서 3초로 단축 …]
        </Typography>
        <Typography ml="10px">
          빅데이터를 사용하여 사용자 취향에 기반한 레시피 추천 플랫폼을 제작한 경험이 있습니다. 저는 Django에서 컨텐츠 기반 필터링을 사용하여 연관레시피를 추천해주는 기능 구현을 담당하였습니다. Python을 사용하여 크롤링을 통해 5000여 개의 레시피 데이터를 가져왔으며, 7만여 개의 리뷰 데이터를 가공하였습니다.
컨텐츠 기반 필터링을 사용하여 비슷한 재료로 만들 수 있는 레시피를 추천하는 기능을 구현하는 데에 성공하였지만, 문제가 발생하였습니다. 해당 데이터를 받아오는데 10초가량 걸리면서 서비스를 이용하는 데 불편함이 있다는 것이었습니다. 원인을 파악하기 위해 코드를 한줄씩 실행시키며 테스트를 진행하였습니다. 그 결과, 데이터를 받아오는데 오래 걸리는 원인은 query에 있었습니다. 리뷰 데이터가 7만여개 다보니 성능을 저하시키는 주 원인이었고 , 5개의 테이블이 한꺼번에 조인되면서 query의 성능이 급격히 저하 되었습니다. 따라서 리뷰 테이블과 레시피-해시태그-재료-재료이름 4개의 테이블을 조인하여 따로 불러왔으며 필요한 컬럼으로만 구성하였습니다. 데이터를 받아오는 데에 10초가 걸리던 API가 3초로 줄어들게 되었습니다. 시간은 단축되었지만, 초반 DB 설계 시 반복적인 조인을 줄이기 위해 반정규화를 진행하였다면 시간이 좀 더 절약됐을 것 같다는 아쉬움이 남았습니다.
        </Typography>
      </Box>

      <Box ml="10px" mr="10px" mb="10px">
        <HorizonLine />
      </Box>

      {/* Third Paragraph */}
      <Box mt="10px">
        <Typography fontSize="15px" fontWeight="700" ml="10px" color="#ffe3a3">
          3) 기술적으로 어려운 문제를 해결한 경험을 상세히 작성해 주세요. (2)
        </Typography>
        <Typography ml="10px" mt="10px" color="#87ceeb">
          [엔티티와 DTO를 구분해야 하는 이유 …]
        </Typography>
        <Typography ml="10px">
          끊임없는 도전정신과 끈기로 여행 플랫폼 제작 프로젝트의 백엔드 개발을 맡아 SSAFY 공통프로젝트 대회에서 우수상 수상에 기여한 경험이 있습니다. SpringBoot를 기반으로 한 백엔드를 맡게 되었고, 한 번도 배워보지 않은 JPA를 적용해보기로 하였습니다. 물론 MyBatis를 쓰는 것이 익숙하였지만 JPA가 성능, 생산성, 유지보수 면에서 우수하다고 알려져 있어 JPA를 적용해 새로운 기술을 익히고자 하였습니다.
          하지만 JPA가 익숙하지 않아 개발 도중 문제가 발생하였습니다. 엔티티에 다른 테이블들을 매핑시키고 나니 무한 루프를 돌아 에러가 발생하였습니다. 또한, 응답에서는 불필요한 데이터까지 제공되어 응답 데이터의 양이 많아지는 현상이 발생하였습니다. 이러한 문제점은 엔티티와 DTO를 따로 생성해 주지 않아서 발생하는 것임을 뒤늦게 알게 되었습니다.
        </Typography>
      </Box>

    </Box>
    
  )
}

export default CoverLetter