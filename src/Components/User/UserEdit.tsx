import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UserEditForm } from './UserEditForm';
import { connectGet, connectPatch } from '../Api/ConnectApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
  }),
);

interface UserEditProps {

}

export const UserEdit: React.FC<UserEditProps> = () => {
  const classes = useStyles();
  const userDataText: any = localStorage.getItem("userData");
  const userData: any = JSON.parse(userDataText);
  const [userInfoData, setUserInfoData] = useState<UserData>({} as UserData);
  const [userWeightData, setUserWeightData] = useState<any>("");

  useEffect(() => {
    const connectGetUserInfo = async () => {
      const responseUserData = await connectGet(`http://localhost:3000/users/${userData.data.id}`);
      if (!responseUserData.isSuccess ) {
        // エラー処理
        return;
      }
      setUserInfoData(responseUserData.data);
    }

    const connectGetWeightInfo = async () => {
      const responseWeightData = await connectGet(`http://localhost:3000/weights/${userWeightData.id}`);
      if (!responseWeightData.isSuccess ) {
        // エラー処理
        return;
      }
      setUserWeightData(responseWeightData.data[0]);
    }

    connectGetUserInfo();
    connectGetWeightInfo();
  }, [])

  type UserData = {
    id:number
    name:string
    image:string
    email:string
    height:number
    sex:number
    birthday:Date
    introduction:string
  }

  const connectUpdateUserInfo = async (updateData:UserData, weight:number|null) => {
    if (Object.keys(updateData).length) {
      await connectPatch(`http://localhost:3000/users/${userData.data.id}`, updateData);
    }

    if (weight) {
      await connectPatch(`http://localhost:3000/weights/${userWeightData.id}`, {'weight':weight});
    }
  }

  return (
    <>
      <UserEditForm connectUpdateUserInfo={connectUpdateUserInfo} userInfoData={userInfoData} userWeightData={userWeightData}/>
    </>
  )
}