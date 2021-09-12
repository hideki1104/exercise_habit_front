import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectPost } from '../Api/ConnectApi';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import YouTube from 'react-youtube';
import { useForm, SubmitHandler } from "react-hook-form";

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
    setCount: {
      width: 100,
      height: 50,
      marginBottom: 30,
    }
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
  const { register, handleSubmit, formState: { errors } } = useForm();

  const opts = {
    width: '800',
    height: '500',
  };

  type HistoryData = {
    training_id: number
    set_count: number
  }

  const handleOnSubmit: SubmitHandler<HistoryData> = async (requestHistoryData:HistoryData) => {
    requestHistoryData.training_id = targetTrainingData ? targetTrainingData.id : 0;
    const responseData = await connectPost("http://localhost:3000/histories", requestHistoryData);
  }

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
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormControl>
              <InputLabel>セット数</InputLabel>
              <Select
                className={classes.setCount}
                input={<OutlinedInput label="Name" />}
                {...register("set_count")}
              >
                {[1,2,3,4,5,6,7,8,9,10].map((i) => (
                  <MenuItem
                    value={i}
                    key={i}
                  >
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl><br/>
            <Button variant="contained" type="submit" color="primary">トレーニング登録</Button>
          </form>
        </Grid>
      </Grid>
    </Card>
  );
}