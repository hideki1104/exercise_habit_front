import React from 'react';
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
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
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
              Exercise Habit
            </Typography>
            <Button color="inherit">SignUp</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">GuestLogin</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}