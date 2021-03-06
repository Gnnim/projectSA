import React, { ChangeEvent,
  useEffect,
  useState, 
  Fragment, 
  SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker, KeyboardDatePicker } from '@material-ui/pickers';


import { MedRecOfficersInterface } from "../models/IMedRecOfficers";
import { HealthInsurancesInterface } from "../models/IHealthInsurances";
import { NametitlesInterface } from "../models/INameTitles";
import { MedicalRecordInterface } from "../models/IMedicalRecords";




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    
    },
    container: { marginTop: theme.spacing(2) },
    combobox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },

    textbox: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '50ch',
      },
    },
  
    
  }),
);

export default function MedicalRecordCreate() {

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());

  const [medicalrecord, setMedicalRecord] = useState<Partial<MedicalRecordInterface>>(
    {}
  );

  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
    const name = event.target.name as keyof typeof medicalrecord;
    setMedicalRecord({...medicalrecord, [name]: event.target.value,});
  }; 

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleDateChange1 = (date: Date | null) => {
    console.log(date);
    setSelectedDate1(date);
  };

  const MedicalRecordOfficer: MedRecOfficersInterface = (JSON.parse(localStorage.getItem("MedicalRecordOfficer")|| ""));

  const [nametitles, setNameTitles] = useState<NametitlesInterface[]>([]);
  const getNameTitle = async() => {
    const apiUrl = "http://localhost:8080/api/ListNameTitle";
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          setNameTitles(res.data)
        } else {
          console.log("else")
        }
      });
  }

  const [healthinsurances, setHealthInsurances] = useState<HealthInsurancesInterface[]>([]);
  const getHealthInsurance = async() => {
    const apiUrl = "http://localhost:8080/api/ListHealthInsurance";
    const requestOptions = {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
    }

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if(res.data) {
          setHealthInsurances(res.data)
        } else {
          console.log("else")
        }
      });
  }


 useEffect(() => {
   getNameTitle();
   getHealthInsurance();
  
 }, []);


const [ErrorMessage, setErrorMessage] = React.useState<String>();

const submit = () => {
  let data = {
    Hospital_Number: medicalrecord.Hospital_Number ?? "",
    Personal_ID: medicalrecord.Personal_ID ?? "",

    NameTitleID: medicalrecord.NameTitleID,

    Patient_Name: medicalrecord.Patient_Name ?? "",
    Patient_Age: typeof medicalrecord.Patient_Age === "string" ? parseInt(medicalrecord.Patient_Age) : NaN,
    Patient_dob: selectedDate1,
    Patient_Tel: medicalrecord.Patient_Tel ?? "",

    HealthInsuranceID: medicalrecord.HealthInsuranceID,
    
    MedRecOfficerID: MedicalRecordOfficer.ID,
    Register_Date: selectedDate,
  };

   if (!data.Patient_Name || !data.Personal_ID || !data.Hospital_Number ){
    console.log("????????????????????????????????????????????????")
    setErrorMessage("????????????????????????????????????????????????")
    setError(true)
    return
  }

  else if(Number(data.Patient_Age) < 0 || !data.Patient_Age ){
   console.log("??????????????????????????????????????????")
   setErrorMessage("??????????????????????????????????????????")
   setError(true)
   return
 }
 
 else {
  const apiUrl = "http://localhost:8080/api/CreateMedicalRecord";
    const requestOptionsPost = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          if (res.error == "UNIQUE constraint failed: medical_records.hospital_number") {
            setErrorMessage("??????????????????????????????????????????")
        } else if (res.error == "UNIQUE constraint failed: medical_records.personal_id") {
            setErrorMessage("????????????????????????????????????????????????????????????????????????????????????")
        } else {
            setErrorMessage("???????????????????????????????????????????????????????????????")
        }

        setError(true)

        }
    });
  }
}

  return (


    <Container className={classes.container} maxWidth="md">
    <Paper className={classes.paper}>
        <Box display="flex">
            <Box flexGrow={1}>

            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ??????????????????????????????????????????????????????
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {ErrorMessage}
        </Alert>
      </Snackbar>
      <br/><br/> 

                <Typography
                    component="h2"

                    variant="h6"

                    color="primary"

                    gutterBottom
                >
                    ????????????????????????????????????????????????????????????????????????
                </Typography>

            </Box>
        </Box>
        <Divider />

                <Grid container spacing={5}>

                   

                    <Grid item xs={6}>
                        <p>???????????? HN</p>
                        <TextField 
                        id="Hospital_Number" 
                        type="string"
                        inputProps={{name:"Hospital_Number"}}
                        variant="outlined" 
                        value={medicalrecord.Hospital_Number ||""}
                        onChange={handleChange}                      
                        fullWidth
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <p>???????????????????????????????????????????????????????????????????????????</p>
                        <TextField 
                        id="Personal_ID" 
                        type="string"
                        inputProps={{name:"Personal_ID"}}
                        variant="outlined" 
                        value={medicalrecord.Personal_ID ||""}
                        onChange={handleChange}                      
                        fullWidth/>
                        
                    </Grid>

                    <Grid item xs={6}>
                        <p>????????????????????????</p>
                        <Select variant="outlined"                         
                            value={medicalrecord.NameTitleID}
                            inputProps={{name: "NameTitleID"}}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0} disabled >??????????????????????????????????????????????????????</MenuItem>
                            {nametitles.map((item: NametitlesInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.Title}</MenuItem>))}
                        </Select>
                    </Grid>


                    <Grid item xs={6}>
                        <p>???????????? - ????????????</p>
                        <TextField 
                        id="Patient_Name" 
                        type="string"
                        inputProps={{name:"Patient_Name"}}
                        variant="outlined" 
                        value={medicalrecord.Patient_Name ||""}
                        onChange={handleChange}                      
                        fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <p>????????????</p>
                        <TextField 
                        id="Patient_Age" 
                        type="string"
                        inputProps={{name:"Patient_Age"}}
                        variant="outlined" 
                        value={medicalrecord.Patient_Age ||""}
                        onChange={handleChange}                      
                        fullWidth/>
                    </Grid>


                    <Grid item xs={6}> 
                      <FormControl style={{float: "right",width:400,marginRight:27 }} variant="outlined">
                        <p>?????????????????????</p>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                name="Patient_dob"
                                value={selectedDate1}
                                onChange={handleDateChange1}
                 
                                format="yyyy-MM-dd"
                                fullWidth
                            />
                          </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>




                    <Grid item xs={6}>
                        <p>???????????????????????????????????????</p>
                        <TextField 
                        id="Patient_Tel" 
                        type="string"
                        inputProps={{name:"Patient_Tel"}}
                        variant="outlined" 
                        value={medicalrecord.Patient_Tel ||""}
                        onChange={handleChange}                      
                        fullWidth/>
                    </Grid>


                    <Grid item xs={6}>
                        <p>???????????????????????????????????????</p>
                        <Select variant="outlined"                         
                            value={medicalrecord.HealthInsuranceID}
                            inputProps={{name: "HealthInsuranceID"}}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0} disabled >?????????????????????????????????????????????????????????????????????</MenuItem>
                            {healthinsurances.map((item: HealthInsurancesInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.HealthInsurance_Name}</MenuItem>))}
                        </Select>
                    </Grid>



                    <Grid item xs={6}>
                        <p>?????????????????????????????????????????????????????????????????????</p>
                        <Select variant="outlined"                         
                            disabled
                            defaultValue={0}
                            fullWidth
                        >
                            <MenuItem value={0} >{MedicalRecordOfficer.MedRecOfficer_Name}</MenuItem>
                        </Select>
                    </Grid>


                    <Grid item xs={6}> 
                      <FormControl style={{float: "right",width:400,marginRight:27 }} variant="outlined">
                        <p>?????????????????????????????????????????????</p>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDateTimePicker
                                name="Register_Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date("2018-01-01T00:00")}
                                format="yyyy/MM/dd hh:mm a"
                                fullWidth
                              />
                          </MuiPickersUtilsProvider>
                      </FormControl>
                    </Grid>
                    

                    <Grid item xs={6}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                component={RouterLink}
                                to="/list"
                                >????????????</Button>
                    </Grid>


                    <Grid item xs={6}>
                      <Button
                        style={{ float: "right" }}
                        variant="contained"
                        onClick={submit}
                        color="primary"
              
                      >
                        ??????????????????
                      </Button>
                    </Grid>

        
                </Grid>   
        
        </Paper>
    </Container>
  )
}