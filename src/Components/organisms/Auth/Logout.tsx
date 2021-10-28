import React from 'react'
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { connectDelete } from '../Api/ConnectApi';
import * as constDefine from '../Const';

const useStyles = makeStyles(() =>
  createStyles({
    logoutButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      color: "#fff",
      padding: 10,
      '&:hover': {
        background: "#A9A9A9",
      },
    }
  })
)

interface LogoutProps {
  handleLogout: Function
  isAdmin: boolean
}

export const Logout: React.FC<LogoutProps> = ({ handleLogout, isAdmin }) => {
  const history = useHistory();
  const classes = useStyles();

  const connectLogout = async() => {
    const url: string = isAdmin ? `${constDefine.BASE_URL()}/api/v1/admin/auth/sign_out` : `${constDefine.BASE_URL()}/api/v1/user/auth/sign_out`;
    const responseData = await connectDelete(url);
    if (responseData.isSuccess) {
      handleLogout();
      isAdmin ? history.push("/admin/sign_in") : history.push("/");
    }
  }

    return (
      <button className={classes.logoutButton} onClick={connectLogout}>LOGOUT</button>
    );
}