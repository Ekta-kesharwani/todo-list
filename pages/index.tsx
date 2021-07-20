
import React, { useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Profile from "../features/Home/Profile"
import AddNewList from "../features/Home/Lists/AddNewList";
import DisplayList from "../features/Home/Lists/DisplayList"
import { Auth } from "aws-amplify";
import Router from 'next/router'
import withApp from "../core/hoc/withApp";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 2) {
      Auth.signOut()
      Router.push("/login")
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Lists" {...a11yProps(1)} />
          <Tab label="Logout" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <h3 className="font-weight-bold mt-2 mb-4 float-left">User's List</h3>
        </div>
        <AddNewList />
        <DisplayList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div></div>
      </TabPanel>
    </div>
  )
}
export default withApp(Home, { secured: true })
