import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connectGet, connectDelete } from '../Api/ConnectApi';
import { PostForm } from '../Post/PostForm';
import { TrainingDetail } from './TrainingDetail';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const difficulyTypeList = [
  '初心者向け',
  '中級者向け',
  '上級者向け',
];

interface TrainingListProps {
  isAdmin: boolean
}

export const TrainingList: React.FC<TrainingListProps> = ({ isAdmin = false }) => {
  type Training = {
    id: number
    name: string
    url: string
    difficuly_type: number
    thumbnail_id: number
    description: string
    genre_id: number
  }
  type GenreData = {
    id: number
    name: string
  }
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [isGenreSeached, setIsGenreSearched] = useState<boolean>(false);
  const [trainingList, setTrainingList] = useState<Training[]>([]);
  const [genreSearchedTrainingList, setGenreSearchedTrainingList] = useState<Training[]>([]);
  const [targetTrainingData, setTargetTrainingData] = useState<Training>();
  const [genreList, setGenreList] = useState<GenreData[]>([]);

  const handleOpen   = (index:number) => {
    setIsOpen(true);
    setTargetTrainingData(trainingList[index]);
  }
  const handleClose = () => setIsOpen(false);
  const handlePostModalClose = () => setIsPostModalOpen(false);

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

  const handleGenreSearch = (e:any) => {
    const genreSearchedTrainingList = trainingList.filter(training => training.genre_id == e.target.value);
    setGenreSearchedTrainingList(genreSearchedTrainingList);
    setIsGenreSearched(true);
  }

  useEffect(() => {
    const connectGetTrainingList = async () => {
      const responseTrainingList = await connectGet(`http://localhost:3000/trainings`);
      if (!responseTrainingList.isSuccess ) {
        // エラー処理
        return;
      }
      setTrainingList(responseTrainingList.data);
    }

    const connectGetGenreList = async () => {
      const responseGenreList = await connectGet(`http://localhost:3000/genres`);
      if (!responseGenreList.isSuccess ) {
        // エラー処理
        return;
      }

      setGenreList(responseGenreList.data);
    }

    connectGetTrainingList();
    connectGetGenreList();
  }, [])

  const modalBody = (
    <TrainingDetail targetTrainingData={targetTrainingData ? targetTrainingData : null} setIsOpen={setIsOpen} setIsPostModalOpen={setIsPostModalOpen}/>
  );

  const postModalBody = (
    <PostForm/>
  );

  return (
    <>
      <FormControl className={classes.genreSearch}>
        <InputLabel>ジャンル</InputLabel>
        <Select
          onChange={(e) => handleGenreSearch(e)}
          input={<OutlinedInput label="Name" />}
        >
          {genreList.map((genre) => (
            <MenuItem
            key={genre.id}
            value={genre.id}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl><br/>
      <Grid container alignItems="center" justify="flex-start">
        {isGenreSeached ?
          <>
            {genreSearchedTrainingList.map((training, index) => (
              <Grid item xs={4}>
                <div className={classes.movieContainer} onClick={() => handleOpen(index)}>
                  <div className={classes.movie}>
                    <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
                  </div>
                  <span>{training.name}</span><br/>
                  <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
                </div>
                {isAdmin ?
                <>
                  <Button variant="contained" color="primary"><Link className={classes.edit_link} to={`/admin/training/edit/${training.id}`}>編集</Link></Button>
                  <Button variant="contained" color="secondary" onClick={() => connectDeleteTraining(index)}>削除</Button>
                </>
                :
                <></>
                }
              </Grid>
            ))}
          </>
          :
          <>
            {trainingList.map((training, index) => (
              <Grid item xs={4}>
                <div className={classes.movieContainer} onClick={() => handleOpen(index)}>
                  <div className={classes.movie}>
                    <img id="img" className={classes.yt_thumnail} alt="" src={`https://i.ytimg.com/vi/${training.url}/${training.thumbnail_id}`}></img>
                  </div>
                  <span>{training.name}</span><br/>
                  <span className={classes.difficulyType}>難易度：{difficulyTypeList[training.difficuly_type]}</span><br/>
                </div>
                {isAdmin ?
                <>
                  <Button variant="contained" color="primary"><Link className={classes.edit_link} to={`/admin/training/edit/${training.id}`}>編集</Link></Button>
                  <Button variant="contained" color="secondary" onClick={() => connectDeleteTraining(index)}>削除</Button>
                </>
                :
                <></>
                }
              </Grid>
            ))}
          </>
        }
      </Grid>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        {modalBody}
      </Modal>
      <Modal
        open={isPostModalOpen}
        onClose={handlePostModalClose}
      >
        {postModalBody}
      </Modal>
    </>
  );
}