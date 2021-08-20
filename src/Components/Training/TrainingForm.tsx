import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connectPost } from '../Api/ConnectApi';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import { connectGet } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 60,
      backgroundColor: '#F5F5F5',
    },
    root: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 80,
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
    trainingForm: {
      width: 300,
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
      marginTop: 40,
    },
    selectForm: {
      width: 300,
      marginTop: 30,
    },
    selectFormLabelName: {
      paddingLeft: 15,
    },
    url: {
      fontSize: 14,
      marginTop: 30,
    }
  }),
);

const trainingTypes = [
  '1.脂肪燃焼',
  '2.筋肉増強',
  '3.健康増進',
  '4.気分転換',
];

const difficulyTypes = [
  '1.初心者向け',
  '2.中級者向け',
  '3.上級者向け',
];

function getStyles(name:string, personName:any, theme:Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface TrainingFormProps {

}

export const TrainingForm: React.FC<TrainingFormProps> = () => {
  const [genreList, setGenreList]                                = useState<GenreData[]>([]);
  const [errorMessage, setErrorMessege]                          = useState<string>("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TrainingData>();
  const classes                                                  = useStyles();
  const theme                                                    = useTheme();
  const history                                                  = useHistory();

  type TrainingData = {
    trainingName: string
    url: string
    trainingType: number
    difficulyType: number
    genreId: number
  }

  type GenreData = {
    id: number
    name: string
  }

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

  const handleOnSubmit: SubmitHandler<TrainingData> = async (requestData: TrainingData) => {
    const responseData = await connectPost("http://localhost:3000/trainings", requestData);
    // エラーの場合
    if (!responseData.isSuccess) {
      // エラー処理
      setErrorMessege("トレーニングの登録に失敗しました。");
      return;
    }
    history.push("/admin/top");
  }

  return (
    <div className={classes.main}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Card className={classes.root}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              トレーニング登録
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <span className={classes.errorMessage}>{errorMessage}</span><br/>
                <TextField className={classes.genreForm} label="トレーニング名" variant="outlined" type="text" {...register("trainingName", { required: true })}/><br/>
                <span className={classes.errorMessage}>
                  {errors.trainingName && errors.trainingName.type === "required" && "トレーニング名を入力してください"}
                </span><br/>
                <span className={classes.url}>https://www.youtube.com/watch?v=</span><br/>

                <TextField className={classes.trainingForm} id="url" label="URL(下11桁)" variant="outlined" type="text" {...register("url", { required: true })}/><br/>
                <span className={classes.errorMessage}>
                  {errors.url && errors.url.type === "required" && "URLを入力してください"}
                </span><br/>

                <FormControl className={classes.selectForm}>
                  <InputLabel className={classes.selectFormLabelName}>ジャンル</InputLabel>
                  <Select
                    {...register("genreId")}
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
                <span className={classes.errorMessage}>
                  {errors.genreId && errors.genreId.type === "required" && "ジャンルを選択してください"}
                </span><br/>

                <FormControl className={classes.selectForm}>
                  <InputLabel className={classes.selectFormLabelName}>トレーニングタイプ</InputLabel>
                  <Select
                    {...register("trainingType", { required: true })}
                    input={<OutlinedInput label="Name" />}
                  >
                    {trainingTypes.map((trainingType, index) => (
                      <MenuItem
                        key={trainingType}
                        value={index}
                      >
                        {trainingType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl><br/>

                <span className={classes.errorMessage}>
                  {errors.trainingType && errors.trainingType.type === "required" && "トレーニングタイプを選択してください"}
                </span><br/>
                <FormControl className={classes.selectForm}>
                  <InputLabel className={classes.selectFormLabelName}>難易度</InputLabel>
                  <Select
                    {...register("difficulyType", { required: true })}
                    input={<OutlinedInput label="Name" />}
                  >
                    {difficulyTypes.map((difficulyType, index) => (
                      <MenuItem
                        key={difficulyType}
                        value={index}
                      >
                        {difficulyType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl><br/>

                <span className={classes.errorMessage}>
                  {errors.difficulyType && errors.difficulyType.type === "required" && "難易度を選択してください"}
                </span><br/>
                <Button className={classes.registrationButton} variant="contained" type="submit">登録</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}