import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connectPost } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "left",
    },
    textForm: {
      width: 500
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

type TrainingDetail = {
  id: number
  name: string
  url: string
  difficuly_type: number
  thumbnail_id: number
  description: string
}

interface PostFormProps {
  targetTrainingData: TrainingDetail|null
}

export const PostForm: React.FC<PostFormProps> = ({targetTrainingData}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const history = useHistory();
  type PostData = {
    training_id: number
    text: string
  }
  const handleOnSubmit: SubmitHandler<PostData> = async (requestData: PostData) => {
    const result:boolean = window.confirm("投稿を行いますか？");
    if (!result) {
      return;
    }
    requestData.training_id = targetTrainingData ? targetTrainingData.id : 0;
    const responseData = await connectPost("http://localhost:3000/posts", requestData);

    if (!responseData.isSuccess) {
      return;
    }
    history.push("/posts");
  }

  return (
    <>
      <Card style={modalStyle} className={classes.paper}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            id="description"
            className={classes.textForm}
            label="トレーニングはどうでしたか？"
            multiline
            rows={6}
            variant="outlined"
            {...register("text")}
          />
          <Button variant="contained" type="submit" color="primary">投稿</Button>
        </form>
      </Card>
    </>
  );
}