import React from 'react';
import axios from "axios";
import swal from "sweetalert";
import MyCard from "../../components/MyCard";
import PostCard from "../../components/PostCard";
import CommentBox from "../../components/CommentBox";
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";

// HTTP connection utils
async function getText () {
    const response = await axios.get("http://118.67.143.94:30001/api/get_text");
    return response;
}

async function postLabeled (data) {
    const response = await axios.put("http://118.67.143.94:30001/api/labeling", data);
    return response;
}

async function getNeedCheckData () {
    const response = await axios.get("http://118.67.143.94:30001/api/get_need_check");
    return response
}

async function rejectLabel (data) {
    var state = false;

    swal("정말로 reject하겠습니까??", {
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
            const response = await axios.post("http://118.67.143.94:30001/api/reject", data);
            window.location.reload(true);
            return response;
        }
    })
}

async function permitLabel (data) {
    var state = false;

    swal("정말로 ok하겠습니까??", {
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
            const response = await axios.post("http://118.67.143.94:30001/api/permit", data);
            window.location.reload(true);
            return response;
        }
    })
}

async function userCount () {
    const response = await axios.get("http://118.67.143.94:30001/api/count/visit");
    return response;
}

async function topUser () {
    const response = await axios.get("http://118.67.143.94:30001/api/count/get_top_user");
    return response;
}

async function getRewardData () {
    const response = await axios.get("http://118.67.143.94:30001/api/reward_data");
    return response;
}

async function postRewardData (data) {
    const response = await axios.post("http://118.67.143.94:30001/api/post_reward_data", data);
    return response;
}

async function getDashboardData () {
    const response = await axios.get("http://118.67.143.94:30001/api/dashboard_data");
    return response;
}

async function getPosters () {
    const response = await axios.get("http://118.67.143.94:30001/api/post");
    return response;
}

async function getTestData (data) {
    const response = await axios.post("http://118.67.143.94:30003/classification", data);
    return response;
}

async function getOnePoster(data) {
    const response = await axios.post("http://118.67.143.94:30001/api/one_post", data);
    return response;
}

async function postComment(data){
    const response = await axios.post("http://118.67.143.94:30001/api/post_comment", data);
    return response;
}

async function hateCheck(data){
    const response = await axios.post("http://118.67.143.94:30003/classification", data);
    return response;
}

async function getPurified(data){
    const response = await axios.post("http://118.67.143.94:30006/purificate", data);
    return response;
}

// Function utils
function cardDisplay(dataStore){
    const cards = [];
    for(const idx in dataStore){
        cards.push(<MyCard data={dataStore[idx]} key={idx} sx={{gridColumn: "span 3"}}/>)
    }
    return cards;
}

function postDisplay(dataStore){
    const posts = [];
    for(const idx in dataStore){
        const item = dataStore[idx];
        posts.push(
            <Box
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gridRow="span 2"
            >
                <PostCard id={item["_id"]} title={item["post_title"]} text={item["post_text"]} date={item["time"]}/>
            </Box>
        )
    }
    return posts;
}

function commentDisplay(dataStore){
    const comments = [];
    const length = dataStore.length - 1;
    for(const idx in dataStore){
        var now = length - idx;
        comments.push(<CommentBox idx={now} text={dataStore[now]["comment"]} date={dataStore[now]["date"]}/>)
    }
    return comments;
}




export { getText, postLabeled, getNeedCheckData, userCount, cardDisplay, permitLabel, rejectLabel, topUser, 
    getRewardData, postRewardData, getDashboardData, getTestData, getPosters, postDisplay,
    getOnePoster, commentDisplay, hateCheck, postComment, getPurified };