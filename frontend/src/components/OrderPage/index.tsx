import {Paper, Snackbar, TextField,Box, Typography, Divider, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import { OrdersInterface } from '../../modules/IOrders';
import { CompanyInterface } from '../../modules/ICompany';
import { MedicineInterface } from '../../modules/IMedicine';
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import { EmployeeInterface } from '../../modules/IEmployees';
import { Link as RouterLink} from "react-router-dom";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const OrderPage = () => {
  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  const [company, setCompany] = useState<CompanyInterface[]>([]);
  const [medicine, setMedicine] = useState<MedicineInterface[]>([]);
  const [order, setOrder] = useState<Partial<OrdersInterface>>({OrderTime: new  Date()});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose: any = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange: any = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof order;
    setOrder({
      ...order,
      [name]: event.target.value,
    });
    console.log(order)
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof OrderPage;
    const { value } = event.target;
    setOrder({ ...order, [id]: value });
  };

  const getEmployee = async () => {
    fetch(`${apiUrl}/medicine/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEmployee(res.data);
        } else {
          console.log("else");
        }
      });
   };

  const getCompany = async () => {
    fetch(`${apiUrl}/medicine/company`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCompany(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getMedicine = async () => {
    fetch(`${apiUrl}/medicine/medicine`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMedicine(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getEmployee();
    getMedicine();
    getCompany();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      EmployeeID: convertType(order.EmployeeID),
      MedicineCompanyID: convertType(order.MedicineCompanyID),
      MedicineID: convertType(order.MedicineID),
      OrderTime: order.OrderTime,
      OrderAmount: convertType(order.OrderAmount),
    };
    console.log(data)
   
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
   
    fetch(`${apiUrl}/medicine/medicineorder`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
    }
   
  return (
    <div>
    <Container maxWidth="md"  >
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>

      <Paper>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography 
              component="h2" 
              variant="h5"
              color="primary"
              gutterBottom
              textAlign='center'
            >
              จัดซื้อยา
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container>
          <Grid item xs={10} >
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
            >หน้าหลัก</Button>
          </Grid>
            <Grid item xs={2} >
            <Button
              component={RouterLink}
              to="/orderhistory"
              variant="contained"
              color="primary"
            >รายการสั่งซื้อยา</Button>
          </Grid>
        </Grid>
        <Grid container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center" >
          
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 370 }}>
              <InputLabel>Medicine</InputLabel>
              <Select
                native
                value={order.MedicineID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineID",
                }}
              >
                <option aria-label='None' value=""></option>
                {medicine.map((item: MedicineInterface)=>(
                <option key={item.ID} value={item.ID}>{item.Name}</option>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 370 }}>
              <TextField
               id="OrderAmount"
               label="OrderAmount"
               variant="outlined"
               type="number"
               size="medium"
               value={order.OrderAmount}
               onChange={handleInputChange}
               InputLabelProps={{
                 shrink: true,
               }}
             />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 370 }}>
              <InputLabel id="demo-simple-select-label">Medicine Company</InputLabel>
              <Select
                native
                value={order.MedicineCompanyID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineCompanyID",
                }}
              >
                <option aria-label='None' value=""></option>
                {company.map((item: CompanyInterface)=>(
                <option key={item.ID} value={item.ID}>{item.Company_Name}</option>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <FormControl sx={{ m: 1, width: 370 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date&Time Order"
                value={order.OrderTime}
                onChange={(newValue) =>{
                  const id = "OrderTime" as keyof typeof order
                  setOrder( { ...order, [id]: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 370 }}>
              <InputLabel>Intendant</InputLabel>
              <Select
                native
                value={order.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label='None' value=""></option>
                {employee.map((item: EmployeeInterface)=>(
                <option key={item.ID} value={item.ID}>{item.Name}</option>))}
              
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <Button variant="contained" style={{ float: "right" }} onClick={submit}>สั่งซื้อยา</Button>
          </Grid>
        
        </Grid>
    </Paper>
    </Container>
    </div>
  )
}