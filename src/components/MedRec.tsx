import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MedicalRecordInterface } from "../models/IMedicalRecords";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      minWidth: 1500,
    },
    table: {
      minWidth: 1000,
    },
    button: {
      
      margin: theme.spacing(2),
      background: '#48D1CC',
      color: '#ffffff',
  },
    tableSpace: {
      marginTop: 20,
    },
  })
);




function MedicalRecord() {
  const classes = useStyles();

  
  const [medicalrecord, setMedicalRecord] = useState<MedicalRecordInterface[]>([]);
  const apiUrl = "http://localhost:8080/api/MedicalRecord";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const getMedicalRecord = async () => {
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setMedicalRecord(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getMedicalRecord();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              gutterBottom
            >
              เวชระเบียนผู้ป่วย
            </Typography>
          </Box>
          <Box>
            <Button className={classes.button}
              component={RouterLink}
              to="/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" width="5%">
                  หมายเลขผู้ป่วย
                </TableCell>
                <TableCell align="center" width="10%">
                  เลขประจำตัวประชาชน
                </TableCell>
                <TableCell align="center" width="10%">
                  คำนำหน้า
                </TableCell>
                <TableCell align="center" width="12%">
                  ชื่อ - สกุล
                </TableCell>
                <TableCell align="center" width="10%">
                  อายุ
                </TableCell>
                <TableCell align="center" width="10%">
                  วันเกิด
                </TableCell>
                <TableCell align="center" width="12%">
                  หมายเลขโทรศัพท์
                </TableCell>
                <TableCell align="center" width="12%">
                  สิทธิการรักษา
                </TableCell>
                <TableCell align="center" width="12%">
                  ผู้ลงทะเบียน
                </TableCell>
                <TableCell align="center" width="12%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalrecord.map((item: MedicalRecordInterface) => (
                <TableRow key={item.ID}>
                  
                  <TableCell align="center">{item.Hospital_Number}</TableCell>
                  <TableCell align="center">{item.Personal_ID}</TableCell>
                  <TableCell align="center">{item.NameTitle.Title}</TableCell>
                  <TableCell align="center">{item.Patient_Name}</TableCell>
                  <TableCell align="center">{item.Patient_Age}</TableCell>
                  <TableCell align="center">{format((new Date(item.Patient_dob)), 'dd MMMM yyyy')}</TableCell>
                  <TableCell align="center">{item.Patient_Tel}</TableCell>
                  <TableCell align="center">{item.HealthInsurance.HealthInsurance_Name}</TableCell>
                  <TableCell align="center">{item.MedRecOfficer.MedRecOfficer_Name}</TableCell>
                  <TableCell align="center">{format((new Date(item.Register_Date)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }

export default MedicalRecord;