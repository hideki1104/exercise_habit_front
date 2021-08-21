import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connectPost } from '../Api/ConnectApi';
import { connectGet } from '../Api/ConnectApi';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
    root: {
      textAlign: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
    },
    genreForm: {
      width: 300,
      marginTop: 30,
    },
    errorMessage: {
      height: 10,
      color: "red",
      fontSize: 12,
    },
    registrationButton: {
      fontSize: 16,
      width: 200,
      height: 50,
      marginTop: 30,
    },
    itemList: {
      listStyleType: "none",
      backgroundColor: '#F5F5F5',
      borderRadius: "5%",
    },
    item: {
      fontSize: 16,
      textAlign: "left",
    },
  }),
);

interface GenreFormProps {
}

export const GenreForm: React.FC<GenreFormProps> = () => {
  type GenreData = {
    id: number
    name: string
  }

  const [errorMessage, setErrorMessege]                          = useState<string>("");
  const history                                                  = useHistory();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<GenreData>();
  const classes                                                  = useStyles();
  const [genreList, setGenreList]                                = useState<GenreData[]>([]);

  useEffect(() => {
    const connectGetGenreList = async () => {
      const responseGenreList = await connectGet(`http://localhost:3000/genres`);
      if (!responseGenreList.isSuccess ) {
        // エラー処理
        return;
      }
      setGenreList(responseGenreList.data);
    }
    connectGetGenreList();
  }, [])

  const handleOnSubmit: SubmitHandler<GenreData> = async (requestData: GenreData) => {
    const responseData = await connectPost("http://localhost:3000/genres", requestData);
    // エラーの場合
    if (!responseData.isSuccess) {
      // エラー処理
      setErrorMessege("ジャンルの登録に失敗しました。");
      return;
    }
    history.push("/admin/top");
  }

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        ジャンル登録
      </Typography>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <span className={classes.errorMessage}>{errorMessage}</span><br/>
          <TextField className={classes.genreForm} id="genre" label="ジャンル名" variant="outlined" type="text" {...register("name", { required: true})}/><br/>
          <span className={classes.errorMessage}>
            {errors.name && errors.name.type === "required" && "ジャンル名を入力してください"}
          </span><br/>
          <Button className={classes.registrationButton} id="login_button" variant="contained" type="submit">登録</Button>
        </form>
      </CardContent>
      <CardContent>
        <ul className={classes.itemList}>
          {genreList.map((genre) => (
            <p className={classes.item}>{genre.name}</p>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}