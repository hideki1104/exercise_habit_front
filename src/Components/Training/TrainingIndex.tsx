import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectGet, connectDelete } from '../Api/ConnectApi';
import { TrainingDetail } from '../Training/TrainingDetail';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
  }),
);

const difficulyTypeList = [
  '初心者向け',
  '中級者向け',
  '上級者向け',
];

interface TrainingIndexProps {
}

export const TrainingIndex: React.FC<TrainingIndexProps> = () => {
  type Training = {
    id: number
    name: string
    url: string
    difficuly_type: number
    thumbnail_id: number
    description: string
    genre_id: number
  }
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trainingList, setTrainingList] = useState<Training[]>([]);
  const [targetTrainingData, setTargetTrainingData] = useState<Training>();

  const handleOpen   = (index:number) => {
    setIsOpen(true);
    setTargetTrainingData(trainingList[index]);
  }
  const handleClose = () => setIsOpen(false);

  const connectDeleteTraining = async (index: number) => {
    const result:boolean = window.confirm("トレーニングを削除しますか？");
    if (!result) {
      return;
    }
    const trainigId = trainingList[index].id;
    const responseTraining = await connectDelete(`http://localhost:3000/trainings/${trainigId}`);
    if (!responseTraining.isSuccess) {
      return
    }
    const newTrainingList = [...trainingList];
    newTrainingList.splice(index, 1);
    setTrainingList(newTrainingList);
  }

  const opts = {
    width: '800',
    height: '500',
  };

  useEffect(() => {
    const connectGetTrainingList = async () => {
      const responseTrainingList = await connectGet(`http://localhost:3000/trainings`);
      if (!responseTrainingList.isSuccess ) {
        // エラー処理
        return;
      }
      setTrainingList(responseTrainingList.data);
    }
    connectGetTrainingList();
  }, [])

  const modalBody = (
    <TrainingDetail targetTrainingData={targetTrainingData ? targetTrainingData : null} />
  );

  return (
    <>
      <Grid container alignItems="center" justify="flex-start">
        {trainingList.map((training, index) => (
          <Grid item xs={4}>
            <div className={classes.movieContainer} onClick={() => handleOpen(index)}>
              <div className={classes.movie}>
                <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
              </div>
              <span>{training.name}</span><br/>
              <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
            </div>
            <Button variant="contained" color="primary"><Link className={classes.edit_link} to={`/admin/training/edit/${training.id}`}>編集</Link></Button>
            <Button variant="contained" color="secondary" onClick={() => connectDeleteTraining(index)}>削除</Button>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>
    </>
  );
}