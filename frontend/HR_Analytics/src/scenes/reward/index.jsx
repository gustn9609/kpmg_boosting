import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import { getRewardData, postRewardData } from "../utils/Utils.js";
import HorizonLine from "../../components/HorizonLine";


function Reward() {
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [texts, setTexts] = useState("");
  const initialValues = {
    reward1: "",
    reward2: "",
    reward3: "",
    reward4: "",
  }

  const userSchema = yup.object().shape({
    reward1: yup.string().required("1~4 사이 값을 입력해주세요"),
    reward2: yup.string().required("1~4 사이 값을 입력해주세요"),
    reward3: yup.string().required("1~4 사이 값을 입력해주세요"),
    reward4: yup.string().required("1~4 사이 값을 입력해주세요"),
  })


  const handleFormSubmit = async (data) => {
    data["id"] = texts[5];
    postRewardData(data);
    swal("감사합니다!", "진짜 많이 도움이 되고 있습니다. 조금만 더 화이팅 해요!", "success")
    
    const response = getRewardData();
    response.then(function(response){
      const data = response.data;
      var store = [];
      
      const id = data["_id"];
      const data0 = data["text"]
      const data1 = data["data1"];
      const data2 = data["data2"];
      const data3 = data["data3"];
      const data4 = data["data4"];

      store.push(data0)
      store.push(data1);
      store.push(data2);
      store.push(data3);
      store.push(data4);
      store.push(id);
      
      setTexts(store);
    });
  }

  if (texts === ""){
    const response = getRewardData();
    response.then(function(response){
      const data = response.data;
      var store = [];
      
      const id = data["_id"];
      const data0 = data["text"]
      const data1 = data["data1"];
      const data2 = data["data2"];
      const data3 = data["data3"];
      const data4 = data["data4"];

      store.push(data0)
      store.push(data1);
      store.push(data2);
      store.push(data3);
      store.push(data4);
      store.push(id);
      
      setTexts(store);
    })
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
        <Header title="Reward model data collection" subtitle="Check your preperence" />
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>(
          <form onSubmit={handleSubmit}>
            <Box
              display="grid" 
              gap="30px" 
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3"}
              }}
            >
              <HorizonLine />
              <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "darkcyan"}}>Reward 부여 방식<br /></Typography>
                <Typography variant="h8" sx={{ gridColumn: "span 3" }}>
                  1. 1~4의 값만을 입력해줘야 한다. <br />
                  2. 1~4 값은 한 차례만 등장해야 한다. <br />
                  3. 본 데이터 수집은 유저의 선호도를 반영하기 때문에 따로 기준은 정해져 있지 않다. <br />
                  4. 다만, 너무 이상한 데이터에 대해서는 1점 혹은 2점을 중복으로 부여해줘도 된다. <br />
                </Typography>
              <HorizonLine />
            </Box>
            
            <Typography variant="h5" mt="35px" mb="30px" sx={{fontWeight: "bold", color: "greenyellow"}}>혐오 표현 : </Typography>
            <Typography variant="h6" mb="30px"> {texts[0]} </Typography>
            
            <Box
              display="grid" 
              gap="30px" 
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8"}
              }}
            >
              <Typography variant="h7" sx={{ gridColumn: "span 8", color: "greenyellow"}}>순화 1 : </Typography>
              <Typography variant="h6" mb="30px" sx={{ gridColumn: "span 8"}}>{texts[1]}</Typography>
              <Typography variant="h7" sx={{ gridColumn: "span 8", color: "greenyellow"}}>순화 2 : </Typography>
              <Typography variant="h6" mb="30px" sx={{ gridColumn: "span 8"}}>{texts[2]}</Typography>
              <Typography variant="h7" sx={{ gridColumn: "span 8", color: "greenyellow"}}>순화 3 : </Typography>
              <Typography variant="h6" mb="30px" sx={{ gridColumn: "span 8"}}>{texts[3]}</Typography>
              <Typography variant="h7" sx={{ gridColumn: "span 8", color: "greenyellow"}}>순화 4 : </Typography>
              <Typography variant="h6" mb="30px" sx={{ gridColumn: "span 8"}}>{texts[4]}</Typography>
              
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="(순화 1)1~4 번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reward1}
                name="reward1"
                error={!!touched.reward1 && !!errors.reward1}
                helperText={touched.reward1 && errors.reward1}
                sx={{ gridColumn: "span 1"}}
              />
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="(순화 2)1~4 번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reward2}
                name="reward2"
                error={!!touched.reward2 && !!errors.reward2}
                helperText={touched.reward2 && errors.reward2}
                sx={{ gridColumn: "span 1"}}
              />
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="(순화 1)1~4 번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reward3}
                name="reward3"
                error={!!touched.reward3 && !!errors.reward3}
                helperText={touched.reward3 && errors.reward3}
                sx={{ gridColumn: "span 1"}}
              />
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="(순화 1)1~4 번호"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reward4}
                name="reward4"
                error={!!touched.reward4 && !!errors.reward4}
                helperText={touched.reward4 && errors.reward4}
                sx={{ gridColumn: "span 1"}}
              />
            </Box>

            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submission
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Reward