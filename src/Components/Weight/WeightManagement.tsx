import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ToolBar } from '../User/ToolBar';
import { WeightGraph } from './WeightGraph';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#F5F5F5"
    },

    tabRoot: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
    },

    root: {
      marginTop: 80,
      marginLeft: 100,
      marginBottom: 80,
      textAlign: 'center',
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingTop: 30,
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
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

interface WeightManagementProps {
}

export const WeightManagement: React.FC<WeightManagementProps> = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Grid container className={classes.main}>
      <Grid item xs={3}>
        <ToolBar/>
      </Grid>
      <Grid item xs={8}>
        <Card className={classes.root}>
          <div className={classes.tabRoot}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="全体" {...a11yProps(0)} />
                <Tab label="月単位" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              体重管理
            </Typography>
            <div>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <WeightGraph/>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <WeightGraph/>
              </TabPanel>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}