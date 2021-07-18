import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';

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

type UserWeightData = {
  id:number
  weight:number
  user_id:number
  created_at:Date
  updated_at:Date
}

interface WeightGraphProps {
  userWeightData:UserWeightData[]
  selectedMonthText:string|null
}

export const WeightGraph: React.FC<WeightGraphProps> = ({ userWeightData, selectedMonthText }) => {
  const classes = useStyles();

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
          '#4682B4',
        ],
        // グラフの枠線の色
        borderColor: [
          '#4682B4',
        ],
        // グラフの枠線の太さ
        borderWidth: 3,
      },
    ],
  };

  return (
    <>
      {userWeightData.length ? <Line type="line" data={data}/> : <p>{selectedMonthText}の体重記録がありません</p>}
    </>
  );
}