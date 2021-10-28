import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={myTheme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}