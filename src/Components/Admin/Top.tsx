import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { GenreForm } from '../Genre/GenreForm';
import { connectGet } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
    root: {
      height: 900,
      textAlign: 'center',
      marginTop: 86,
      marginbottom: 80,
      marginLeft: 50,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },
    movieContainer: {
      margin: 20,
    },
    movie: {
      height: 180,
      width: "100%",
      backgroundColor: "#F5F5F5",
    },
    TrainingDetail: {
      width: 800,
      height: 600,
    },
    difficulyType: {
      fontSize: 12,
      color: "#808080",
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

interface TopProps {
}

export const Top: React.FC<TopProps> = () => {
  type Training = {
    id: number
    name: string
    url: string
    difficulyType: number
  }
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trainingList, setTrainingList] = useState<Training[]>([]);

  const [modalStyle] = useState(getModalStyle);
  const handleOpen   = () => setIsOpen(true);
  const handleClose  = () => setIsOpen(true);
  const body = (
    <Card style={modalStyle} className={classes.TrainingDetail} onClick={handleClose}>
    </Card>
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

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={3}>
          <GenreForm/>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <Modal
              open={isOpen}
            >
              {body}
            </Modal>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              トレーニング一覧
            </Typography>
            <Grid container alignItems="center" justify="flex-start">
              {trainingList.map((training) => (
                <Grid item xs={4}>
                  <div className={classes.movieContainer} onClick={handleOpen}>
                    <div className={classes.movie}>
                      <iframe
                        id="ytplayer"
                        type="ytplayer"
                        width="480"
                        height="270"
                        src={`https://www.youtube.com/watch?v=mQv_qJWXNxI`}
                        frameBorder="0"
                      />
                    </div>
                    <span>{training.name}</span><br/>
                    <span className={classes.difficulyType}>難易度：初心者向け</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}