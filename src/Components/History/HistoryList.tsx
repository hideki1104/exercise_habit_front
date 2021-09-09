import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieContainer: {
      margin: 20,
      '&:hover': {
        opacity: 0.6,
      }
    },
    movie: {
      height: 180,
      width: "100%",
      backgroundColor: "#F5F5F5",
    },
    difficulyType: {
      fontSize: 12,
      color: "#808080",
    },
    yt_thumnail: {
      height: 180,
      width: "100%",
    },
    paper: {
      position: 'absolute',
      width: 1100,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
    edit_link: {
      textDecoration: "none",
      color: "#ffffff",
    },
    genreSearch: {
      width: 200,
    }
  }),
);

interface HistoryListProps {
}

export const HistoryList: React.FC<HistoryListProps> = () => {

  return (
    <>
    </>
  );
}