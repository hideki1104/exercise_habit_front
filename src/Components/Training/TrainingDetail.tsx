import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: '#F5F5F5',
    },
    root: {
      height: "100%",
      textAlign: 'center',
      marginTop: 86,
      marginbottom: 80,
      marginLeft: 50,
      paddingBottom: 80,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },
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
  }),
);

function getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const difficulyTypeList = [
  '初心者向け',
  '中級者向け',
  '上級者向け',
];

type TrainingDetail = {
  id: number
  name: string
  url: string
  difficuly_type: number
  thumbnail_id: number
  description: string
}

interface TrainingDetailProps {
  targetTrainingData: TrainingDetail|null
}

export const TrainingDetail: React.FC<TrainingDetailProps> = ({targetTrainingData}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const opts = {
    width: '800',
    height: '500',
  };

  return (
    <Card style={modalStyle} className={classes.paper}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {targetTrainingData ? targetTrainingData.name : ""}
        <span className={classes.difficulyType}>難易度：{targetTrainingData ? difficulyTypeList[targetTrainingData.difficuly_type] : ""}</span>
      </Typography>
      <Grid container>
        <Grid item xs={9}>
          <YouTube videoId={targetTrainingData ? targetTrainingData.url : ""} opts={opts} />
        </Grid>
        <Grid item xs={3}>
          <p>説明</p><br/>
          <span>{targetTrainingData ? targetTrainingData.description : ""}</span><br/>
        </Grid>
      </Grid>
    </Card>
  );
}