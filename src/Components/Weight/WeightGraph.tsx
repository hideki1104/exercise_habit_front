import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import { connectGet } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },

    root: {
      marginTop: 80,
      marginLeft: 100,
      height: 600,
    },

    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },

    afterRegisterButton: {

    },
  }),
);

interface WeightGraphProps {
}

export const WeightGraph: React.FC<WeightGraphProps> = () => {
  const classes = useStyles();
  const [userWeightData, setUserWeightData] = useState([]);
  useEffect(() => {
    const connectGetWeightInfo = async () => {
      const responseWeightData = await connectGet(`http://localhost:3000/weights`);
      console.log(responseWeightData);
      if (!responseWeightData.isSuccess ) {
        // エラー処理
        return;
      }

      setUserWeightData(responseWeightData.data);
    }

    connectGetWeightInfo();
  }, [])

  userWeightData.map((weight) => {
    console.log(weight['weight']);
  });

  const convertJst = (date:Date) => {
    const createdAt = new Date(date)
    createdAt.setTime(createdAt.getTime() + 9)
    return createdAt.toLocaleString('ja-JP').slice(0,-3);
  }

  const data = {
    // x 軸のラベル
    labels: userWeightData.map(weight => convertJst(weight['created_at'])),
    datasets: [
      {
        label: '体重',
        // データの値
        data: userWeightData.map(weight => weight['weight']),
        // グラフの背景色
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        // グラフの枠線の色
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        // グラフの枠線の太さ
        borderWidth: 3,
      },
    ],
  };

  return (
    <Line type="line" data={data}/>
  );
}