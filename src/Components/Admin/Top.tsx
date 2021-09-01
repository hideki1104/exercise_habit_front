import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { GenreForm } from '../Genre/GenreForm';
import { connectGet } from '../Api/ConnectApi';
import { connectDelete } from '../Api/ConnectApi';
import { TrainingDetail } from '../Training/TrainingDetail';

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

interface TopProps {
}

export const Top: React.FC<TopProps> = () => {
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
  }

  const opts = {
    width: '800',
    height: '500',
  };

  const body = (
    <TrainingDetail targetTrainingData={targetTrainingData ? targetTrainingData : null} />
  );

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

  const setGenreSearch = (searchGenreId: number) => {
    trainingList.filter(training => training.genre_id == searchGenreId)
  }

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <GenreForm setGenreSearch={setGenreSearch}/>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <Modal
              open={isOpen}
              onClose={handleClose}
            >
              {body}
            </Modal>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              トレーニング一覧
            </Typography>
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
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}