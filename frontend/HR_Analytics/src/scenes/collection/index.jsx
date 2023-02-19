import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from 'react';
import swal from "sweetalert";
import { getText, postLabeled } from "../utils/Utils.js";
import HorizonLine from "../../components/HorizonLine";

function Collection() {
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const [text, setText] = useState("");
  const [textId, setTextId] = useState(-1);
  const initialValues = {
    labeledText: "",
    nickName: "",
    check1: false,
    check2: false,
    check3: false,
  }

  const userSchema = yup.object().shape({
    labeledText: yup.string().required("순화된 문장을 입력해주세요!!"),
    nickName: yup.string().required("닉네임을 입력해주세요!!"),
  })

  // Sumbit purified text
  const handleFormSubmit = async (data) => {
    var count = 0;
    var i;
    
    for (i = 1; i < 4; i++){
      const name = "check" + i;
      if (data[name]){
        count += 1;
      }
    }
    
    if (count !== 1){
      swal("아이고..!", "선택지 중에 하나만 선택해주시면 감사하겠습니다!!", "error")
    }else{
      swal("감사합니다!", "여러분의 작은 관심이 저희에게 큰 도움이 될 것 입니다! :)", "success")
      data["id"] = textId;
      data["text"] = text;
      
      const response = postLabeled(data);
      response.then(function(response){
        setText(response.data["text"])
        setTextId(response.data["text_id"])
      })
    }
  }

  // Get hatehul text
  if (text === ""){
    const response = getText();
    response.then(function(response){
      setText(response.data["text"]);
      setTextId(response.data["text_id"])
    })
  }

  return (
    <Box m="20px">
      <Header title="Data Collection" subtitle="Purifiy abusive and hateful data" />

      <Formik 
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "darkcyan"}}>순화 기준 <br /></Typography>
                <Typography variant="h8" sx={{ gridColumn: "span 3" }}>
                  1. 최대한 기존 문장의 단어, 구조를 유지해야 한다. (정상적인 문장에 일부 혐오 표현이 포함되어 있는 경우, 그 부분만 자르거나 변경하면 된다.) <br />
                  2. 기존 문장이 너무 난해한 경우, 해당 문장을 버린다. <br />
                  3. Tokenizer에서 토큰화를 잘 할 수 있는 정도로 순화를 하는 것을 권장한다. <br />
                </Typography>
                <Typography variant="h6" sx={{ gridColumn: "span 3", fontWeight: "bold", color: "darkcyan"}}>혐오 표현 기준 <br /></Typography>
                <Typography variant="h8" sx={{ gridColumn: "span 3" }}>
                  1. 정치에 대한 편향성은 혐오의 편향성으로 고려되지 않는다. <br />
                  2. 유명인에 대한 비방은 의견으로 볼 수 있다. (단, 과하지 않는 선에서) <br />
                </Typography>
                <Typography variant="h8" sx={{ gridColumn: "span 3", color: "#f0e68c" }}>이 외의 고려 사항은 유저가 자의적으로 판단하는 것을 권장하며, 상세 순화 기준을 확인하기를 원하면 Labeling FAQ를 참고해주시면 감사하겠습니다! :)</Typography>
              <HorizonLine />
            </Box>

            <Typography variant="h5" mt="35px" mb="30px" sx={{fontWeight: "bold", color: "greenyellow"}}> 순화해야 하는 문장 : <br /> </Typography>
            <Typography variant="h6" mb="30px"> {text} </Typography>

            <Box 
              display="grid" 
              gap="30px" 
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 3"}
              }}
            >
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="순화된 문장"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.labeledText}
                name="labeledText"
                error={!!touched.labeledText && !!errors.labeledText}
                helperText={touched.labeledText && errors.labeledText}
                sx={{ gridColumn: "span 3"}}
              />
              <Typography variant="h7" sx={{ gridColumn: "span 3", color: "greenyellow"}}>부캠 번호 혹은 닉네임 :</Typography>
              <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="닉네임"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nickName}
                name="nickName"
                error={!!touched.nickName && !!errors.nickName}
                helperText={touched.nickName && errors.nickName}
                sx={{ gridColumn: "span 3"}}
              />

              <Typography variant="h7" sx={{ gridColumn: "span 3", color: "greenyellow"}}>아래 중 한 가지만 골라주세요.</Typography>
              <FormControlLabel
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={values.check1}
                name="check1"
                control={<Checkbox color="success"/>} 
                label="1. 혐오 표현아닌 문장"
                sx={{ gridColumn: "span 1"}}
              />

              <FormControlLabel
                type="text"
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={values.check2}
                name="check2"
                control={<Checkbox color="success"/>} 
                label="2. 순화해도 혐오 및 편향성이 담기는 문장"
                sx={{ gridColumn: "span 1"}}
              />

              <FormControlLabel
                type="text"
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={values.check3}
                name="check3"
                control={<Checkbox color="success"/>} 
                label="3. 순화가 가능한 문장"
                sx={{ gridColumn: "span 1"}}
              />
              <HorizonLine />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
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

export default Collection;