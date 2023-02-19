import React, { useState } from 'react'
import { useLocation } from 'react-router';
import { Box, Typography, TextField, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import HorizonLine from "../../components/HorizonLine";
import CommentBox from "../../components/CommentBox";
import HateInfo from "../../components/HateInfo";
import * as yup from "yup";
import swal from "sweetalert";
import { Formik } from "formik";
import { getOnePoster, commentDisplay, hateCheck, postComment, getPurified } from "../utils/Utils.js"

const dummy = [{"data": [], "id": "dummy"}];

function Comment() {
  const location = useLocation();
  const nowData = location.state;
  const id = nowData.id;

  const [initial, setInitial] = useState(false);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState(false);
  const [fixedData, setFixedData] = useState(false);

  const initialValues = {
    comment: "",
  }

  const userSchema = yup.object().shape({
    comment: yup.string().required("댓글을 입력해주세요!!"),
  });

  const handleFormSubmit = async (data) => {
    var state = false;

    swal("정말로 댓글을 달겠습니까??", {
        buttons: {
            cancel: "Cancel",
            ok: {
                text: "OK",
                value: "ok",
            }
        }
    }).then(async (value) => {
        switch (value){
            case "ok":
                state = true;
                break;
        }
        if (state){
            const response = await hateCheck(data);
            const info = response.data;
            
            if(info["is_hate"] == false){
              const send = {
                "id": id["id"],
                "comment": data["comment"],
                "fixed": "",
              }

              const temp = await postComment(send);
              setLineData(false);
              window.location.reload(true);
            }else{
              // Here need send to Generation model
              const purified = {
                "sentence": data["comment"],
              } 
              const response = await getPurified(purified);
              setFixedData(response.data["purificated"])
              setLineData(info["chart_data"]);
              swal("욕설 혹은 혐오 표현을 감지했습니다.", "욕설 및 혐오 표현을 확인하고 수정해서 댓글을 다시 달아주세요!! ㅎㅎ", "error")       
            }
            return response;
        }
    })
    
  }

  if (initial == false){
    const response = getOnePoster(id);
    response.then(function(response){
      setData(response.data);
      setInitial(true);
    })
  }


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignitem="center">
        <Header title="Comment" subtitle="Write your comment" />
      </Box>

      <HorizonLine />
      <Box mb="20px">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "darkcyan"}}>Title : <br /></Typography>
        <Typography variant="h7" mt="10px">{data["post_title"]}</Typography>
      </Box>

      <Box mb="20px">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "darkcyan"}}>Post : <br /></Typography>
        <Typography variant="h7" sx={{ color: "greenyellow" }}>{data["post_text"]}</Typography>
      </Box>

      <Box mb="30px">
        <HorizonLine />
      </Box>

      <Box mb="20px">
        {lineData == false ? 
        (<HateInfo flag={true} data={dummy} text={""}/>) : 
        (<HateInfo flag={false} data={lineData} text={fixedData}/>)}
      </Box>

      <Box>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="space-between" rows={1}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    fullWidth
                    variant="filled"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comment}
                    name="comment"
                    error={!!touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                  />
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
      </Box>
      
      <Box mt="35px">
        <HorizonLine />
      </Box>

      <Box mt="20px">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "darkcyan"}}>Comments : <br /></Typography>
      </Box>
      
      <Box mt="20px">
        { initial ? commentDisplay(data["comments"]) : undefined }
      </Box>


    </Box>
  )
}

export default Comment