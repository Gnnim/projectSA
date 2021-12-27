import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuBookIcon from  "@material-ui/icons/MenuBook";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";

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
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    
    color:{
        background: 'linear-gradient(45deg, #F38D98 30%, #E0BBE4 90%)',
    },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  const ListMedRec = () => {
    window.location.href = "/list";
  }

  const Register = () => {
    window.location.href = "/create";
  }

  const Home = () => {
    window.location.href = "/";
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.color}> 
        <Toolbar>
 
          <Typography variant="h6" className={classes.title}>
            
            Medical Record
          </Typography>

          
          <Button onClick={Home} color="inherit" style={{ width: 100 }} className={classes.small} ><HomeIcon />หน้าแรก</Button>

          <Button onClick={ListMedRec} color="inherit" style={{ width: 120 }} className={classes.small}  ><AssignmentIcon  /> เวชระเบียน</Button>
          <Button onClick={Register} color="inherit" style={{ width: 150 }} className={classes.small} ><MenuBookIcon  /> ลงทะเบียนผู้ป่วย</Button>
          <Button onClick={SignOut} color="primary" style={{ width: 100 }} className={classes.small} >Logout</Button>
          
          
        </Toolbar>
      </AppBar>
    </div>
  );
}