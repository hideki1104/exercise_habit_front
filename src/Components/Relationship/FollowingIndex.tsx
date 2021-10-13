import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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
  }),
);

interface FollowingIndexProps {

}

export const FollowingIndex: React.FC<FollowingIndexProps> = () => {
  const classes = useStyles();

  return (
    <>
      <p>フォロー一覧</p>
    </>
  );
}