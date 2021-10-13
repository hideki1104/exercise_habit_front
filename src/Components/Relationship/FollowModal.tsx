import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FollowingIndex } from './FollowingIndex';
import { FollowerIndex } from './FollowerIndex';

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
    tab: {
      backgroundColor: '#ffffff',
    },
  }),
);

function getModalStyle() {
  const top  = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    '& > span': {
      maxWidth: 100,
      width: '100%',
      backgroundColor: '#111111',
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} variant="fullWidth" TabIndicatorProps={{ children: <span /> }} />);

interface FollowModalProps {

}

export const FollowModal: React.FC<FollowModalProps> = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };

  return (
    <>
      <Card className={classes.paper} style={modalStyle}>
        <AppBar position="static" color="default">
          <StyledTabs
            value={selected}
            onChange={handleChange}
          >
            <Tab label="フォロー" className={classes.tab}/>
            <Tab label="フォロワー" className={classes.tab}/>
          </StyledTabs>
        </AppBar>
        <AppBar position="static" color="default">
          {selected !== 0 ? <TabPanel value={selected} index={1} dir={theme.direction}><FollowerIndex/></TabPanel> : ""}
        </AppBar>
        <TabPanel value={selected} index={0} dir={theme.direction}>
          <FollowingIndex/>
        </TabPanel>
      </Card>
    </>
  );
}