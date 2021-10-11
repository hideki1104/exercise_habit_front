import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { ToolBar } from '../User/ToolBar';
import { WeightGraph } from './WeightGraph';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { connectGet } from '../Api/ConnectApi';

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
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },

    tab: {
      backgroundColor: '#ffffff',
    },

    weightRegistrationButton: {
      textAlign: 'right',
    }
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

interface MonthlyTabs {
  value: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
}

const MonthlyTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
})((props: MonthlyTabs) => <Tabs {...props} variant="scrollable" scrollButtons="auto"/>);

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

interface WeightManagementProps {
}

export const WeightManagement: React.FC<WeightManagementProps> = () => {
  const classes                                   = useStyles();
  const [selected, setSelected]                   = useState(0);
  const [selectedMonth, setSelectedMonth]         = useState('202107')
  const [selectedMonthText, setSelectedMonthText] = useState("")
  const theme                                     = useTheme();
  const [userWeightData, setUserWeightData]       = useState([]);
  const [monthlyWeightData, setMonthlyWeightData] = useState([]);
  const nowDate                                   = new Date();
  const nowYear                                   = nowDate.getFullYear();
  const nowMonth                                  = `0${nowDate.getMonth()}`.slice(-2);

  useEffect(() => {
    const connectGetWeightInfo = async () => {
      const responseWeightData = await connectGet(`http://localhost:3000/weights`);
      if (!responseWeightData.isSuccess ) {
        // エラー処理
        return;
      }

      setUserWeightData(responseWeightData.data);
    }

    connectGetWeightInfo();
  }, [])

  const connectGetMonthlyWeightData = async (month:string) => {
    const responseWeightData = await connectGet(`http://localhost:3000/weights/${month}/edit`);

    if (!responseWeightData.isSuccess ) {
      // エラー処理
      return;
    }
    const nowMonth  = month.slice(4);
    const monthText = `${nowYear}年${nowMonth}月`
    setSelectedMonthText(monthText);

    setMonthlyWeightData(responseWeightData.data);
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelected(newValue);
  };

  const handleMonthChange = (event: React.ChangeEvent<{}>, nowMonth: string) => {
    setSelectedMonth(nowMonth);
    connectGetMonthlyWeightData(nowMonth);
  }

  const formatMonthlyArray = () => {
    let monthlyArray = [];
    for (let m = 1; m <= 12; m++) {
      const month = `0${m}`.slice(-2);
      monthlyArray.push(`${nowYear}${month}`);
    }
    return monthlyArray;
  }

  const monthlyTab: JSX.Element = (
    <>
      <MonthlyTabs
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {formatMonthlyArray().map((month, index) => {
          const newMonth  = month.slice(4);
          const monthText = `${nowYear}年${newMonth}月`
          return (
            <Tab label={monthText} className={classes.tab} value={month} {...a11yProps(index)}/>
          )
        })}
      </MonthlyTabs>
    </>
  )

  return (
    <div className={classes.tabRoot}>
      <AppBar position="static" color="default">
        <StyledTabs
          value={selected}
          onChange={handleChange}
        >
          <Tab label="全体表示" className={classes.tab}/>
          <Tab label="月表示" className={classes.tab} onClick={() => connectGetMonthlyWeightData(selectedMonth)}/>
        </StyledTabs>
      </AppBar>
      <AppBar position="static" color="default">
        {selected !== 0 ? monthlyTab : ""}
      </AppBar>
      <div className={classes.weightRegistrationButton}>
        <Link to='/weight_management/new'><Button>体重登録へ {'＞＞'}</Button></Link>
      </div>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        体重管理
      </Typography>
      <div>
        <TabPanel value={selected} index={0} dir={theme.direction}>
          <p>全体</p>
          <WeightGraph userWeightData={userWeightData} selectedMonthText={null}/>
        </TabPanel>
        <p>{selectedMonthText}</p>
        <TabPanel value={selected} index={1}>
          <TabPanel value={selectedMonth} index={selectedMonth} dir={theme.direction}>
            <WeightGraph userWeightData={monthlyWeightData} selectedMonthText={selectedMonthText}/>
          </TabPanel>
        </TabPanel>
      </div>
    </div>
  );
}