import * as React from 'react';
import { useState, useNavigate } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";


const test = () => {
  console.log("Feragkebg");
}


function PostCard({id, title, text, date}) {

  return (
    <Card sx={{ maxWidth: 345,  maxHeight: 500}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />

      <CardActionArea>
        <Link to={"/comment"} state={{id: {id}}}>
        <CardContent >
          <Typography variant="body2" color="text.secondary" >
            {text.length <= 285 ? text : (text.substr(0, 285) + "...")}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      
    </Card>
  )
}

export default PostCard