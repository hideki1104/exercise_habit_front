import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "fixed",
      width: "100%",
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },

    title: {
      flexGrow: 1,
      fontWeight: "bold",
    },

    title_link: {
      textDecoration: "none",
      color: "#ffffff",
    },

    headerLink: {
      textDecoration: "none",
      color: "#ffffff",
      '&:hover': {
        background: "#A9A9A9",
      },
    },
  }),
);

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={myTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.title_link}>
                Exercise Habit
              </Link>
            </Typography>
            <Link to = '/' className={classes.headerLink}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to = '/sign_up' className={classes.headerLink} style={{textDecoration: 'none', color: "white"}}>
              <Button color="inherit">SignUp</Button>
            </Link>
            <Link to = '/sign_in' className={classes.headerLink}>
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}