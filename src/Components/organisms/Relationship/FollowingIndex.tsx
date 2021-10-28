import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
    follower: {
      marginLeft: "auto",
      marginRight: "auto",
      width: 200,
    },
  }),
);

type UserData = {
  id:number
  name:string
  email:string
  height:number
  sex:number
  birthday:Date
}

interface FollowingIndexProps {
  followingList:UserData[]
  handleClose:Function
}

export const FollowingIndex: React.FC<FollowingIndexProps> = ({followingList, handleClose}) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (userId:number) => {
    handleClose();
    history.push(`/user/${userId}`);
  }

  return (
    <>
      {followingList.map((followingData) => (
        <>
        <CardHeader
          className={classes.follower}
          onClick={() => handleClick(followingData.id)}
          avatar={
            <Avatar aria-label="recipe">
              R
            </Avatar>
          }
          titleTypographyProps={{variant:'h6'}}
          title={followingData.name}
          subheader={followingData.email}
        />
      </>
      ))}
    </>
  );
}