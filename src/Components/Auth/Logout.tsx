import React from 'react'
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { connectDelete } from '../Api/ConnectApi';

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
  handleLogout:Function
}

export const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  const history = useHistory();
  const classes = useStyles();

  const connectLogout = async() => {
    const responseData = await connectDelete("http://localhost:3000/api/v1/user/auth/sign_out");
    console.log(responseData);
    if (responseData.isSuccess) {
      handleLogout();
      history.push("/");
    }
  }

    return (
      <button className={classes.logoutButton} onClick={connectLogout}>LOGOUT</button>
    );
}