import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import HorizonLine from "../../components/HorizonLine";
import React from 'react'

function FAQ() {
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently asked questions for labeling" />

      <Box 
        display="grid" 
        gap="30px" 
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: "span 3"}
        }}
      >
        <HorizonLine />
        <Typography variant="h5" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "greenyellow"}}>목표 : 왜 순화하려고 하는가?</Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          혐오 표현을 사용하지 않고, 보다 건전하게 의견을 나눌 수 있으면 좋을 것 같다는 생각을 자주했다.
        </Typography>

        <HorizonLine />
        <Typography variant="h5" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "greenyellow"}}>분류</Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          &nbsp;&nbsp;욕설 데이터는 이미 보유하고 있지만, 욕설 데이터에 대응되는 데이터를 수집하는 것은 어려운 문제였다. 데이터 부족을 조금이나마 완화하고자 데이터 수집을 하기로 결정했다.<br /><br />
          &nbsp;&nbsp;우리는 욕설 데이터를 아래와 같은 3가지 형태로 분리하고자 한다. <br />
          - 1. 애초에 혐오 표현이 아닌 데이터 <br />
          - 2. 주장 없이 일방적인 혐오 표현만을 담고 있는 데이터 or 순화해도 편향성 등을 드러내는 데이터 <br />
          - 3. 순화 가능한 데이터 <br />
        </Typography>

        <HorizonLine />
        <Typography variant="h5" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "greenyellow"}}>순화 기준</Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold"}}>1. 최대한 기존 문장의 단어, 구조를 유지해야 한다. (정상적인 문장에 일부 혐오 표현이 포함되어 있는 경우, 그 부분만 자르거나 변경하면 된다.) <br /></Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          예시 1)<br />
          Hate Data : “방송국 놈들 지석진 가지고 장난치는 꼬라지 보기 싫네”<br />
          Clean Data : “방송국 분들 지석진 한테 장난치는 거 보기 안 좋네”<br />
          예시 2)<br />
          Hate Data : “속으로 버닝썬,김학의 등등 잊고 자기한테 이목집중한 국민들 보면서 역시 개돼지들 이러고 있는거 같은데?”<br />
          Clean Data : “속으로 버닝썬,김학의 등등 잊고 자기한테 이목집중한 국민들 보면서 만족하고 있는거 같은데?”<br />
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold"}}>2. 기존 문장이 너무 난해한 경우, 해당 문장을 버린다. <br /></Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          예시 1)<br />
          주사파, 사노맹, 대깨문, 달X, 호남인들이 발광하네 → 버림<br />
          예시 2)<br />
          규민이 양아치새끼 → 버림<br />
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold"}}>3. Tokenizer에서 토큰화를 잘 할 수 있는 정도로 순화를 하는 것을 권장한다. <br /></Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          예시 1)<br />
          Hate Data : "국방을 강화하겠다는 건 좋은 의미인거 같다 발갱이보다는 낫다."<br />
          Clean Data : "국방을 강화하겠다는 건 좋은 의미인 것 같다 종북 좌파보다는 낫다"<br />
          예시 2)<br />
          Hate Data : "누구맘대로 일본배상을 대신해!!!!저써글놈이 나라를통째로 배가를 놈이네 피해자 희생자분들이 아직도살아계신데 정신 속창아리없는놈아닌가 그렇게좋으면 니마누라도 일본군한테 데려다줘라."<br />
          Clean Data : " 누구 맘대로 일본 배상을 대신해!! 저놈이 나라 전체를 분열시키네. 피해자 희생자 분들이 아직 살아계신데 염치없는 짓 아닌가."<br />
          예시 3)<br />
          Hate Data : "드디어 정신세 세계가 돌아가는 구나.....남을 흩띁는 대가가 나타났다......저런 인간이 여당 대통령 후보로 나왔다니 끔찍하다.....언제까지 일본과 과거일로 싸울레......임진왜란 침공한거 보상 받을려고 할까 두렵다…"<br />
          Clean Data : "드디어 정신이 돌아가는구나… 남을 헐뜯는 대가가 나타났다… 저런 인간이 여당 대통령 후보라니… 언제까지 일본과 과거 일로 싸울래? 임진왜란 보상 받으려고 할까 두렵다…"<br />
          예시 4)<br />
          Hate Data : "뭐라노 억까하고 고소미 먹을까봐 제대로 말도 못하네 ㅋㅋ."<br />
          Clean Data : "뭐래 ㅋㅋㅋㅋ 억지로 까놓고 고소 당할까봐 제대로 말도 못하네 ㅋㅋ"<br />
        </Typography>

        <HorizonLine />
        <Typography variant="h5" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "greenyellow"}}>혐오 표현 기준</Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold"}}>1. 정치에 대한 편향성은 혐오의 편향성으로 고려되지 않는다.</Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          (주의: 정당이나 정치인을 맹목적으로 비하하는 용어가 포함된 문장은 혐오 표현이다.) <br />
          예시 1)<br />
          "환경 보호 정책이 도대체 왜 시행됐는지 모르겠다."<br />
          예시 2)<br />
          "국힘은 왜 저렇게 정치하는지 모르겠다."
        </Typography>
        <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold"}}>2. 유명인에 대한 비방은 의견으로 볼 수 있다. (단, 과하지 않는 선에서)</Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          (주의: 인신 공격은 혐오 표현이다. 특정 연예인을 단순 싫다는 것을 혐오 표현이라고 보기는 어렵다.)<br />
          예시 1)<br />
          "김태년은 언제봐도 마음에 들지 않는다. 너는 극좌정치인도 못 되고 그냥 욕심 많은 탐관오리 같다" (혐오 표현)<br />
          예시 2)<br />
          "정우성이는 백신광고비만 받으면 끝이냐? 난민의 대부 아니냐? 난민 좀 챙겨요 양심 없는 배우님!" (Not 혐오 표현)
        </Typography>
        
        <HorizonLine />
        <Typography variant="h5" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "greenyellow"}}> 추가 사항 </Typography>
        <Typography variant="h7" sx={{ gridColumn: "span 3"}}>
          1. 앞서 설명한 것을 제외한 부분은 전적으로 유저의 판단에 맡깁니다.<br />
          2. "습니다" 말투보다는 "했다" 말투를 지향합니다.<br />
          3. 순화된 문장에는 욕설이 절대 포함되서는 안 됩니다.<br />
          4. 제출된 이후에 "순화해야 하는 문장"은 자동으로 변경되기에 추가로 해주시면 감사하겠습니다!<br />
          5. 웹 페이지, 순화 관련 등 추가 문의 사항이 있는 경우 "Team" page의 "박승현"의 연락처로 연락 부탁드립니다. :)
        </Typography>
      </Box>
      
      
    </Box>

  )
}

export default FAQ