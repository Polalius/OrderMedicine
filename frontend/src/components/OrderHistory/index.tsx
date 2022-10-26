import { Container } from '@mui/system'
import React, { useEffect,useState } from 'react'
import { OrdersInterface } from '../../modules/IOrders';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper, Box, Typography, Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import { Link as RouterLink} from "react-router-dom";
export const OrderHistory = () => {
  const [order, setOrder] = React.useState<OrdersInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getOrder = async () => {
    fetch(`${apiUrl}/medicine/medicineorder`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
        } else {
          console.log("else");
        }
      });
   };
  
  useEffect(() => {
    getOrder();
  },[]);
      
  return (
    <div>
      <Container maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              textAlign='center'
            >
              รายการสั่งซื้อยา
            </Typography>
          </Box>
        </Box>
        <Grid container>
          <Grid item xs={11} >
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
            >หน้าหลัก</Button>
          </Grid>
            <Grid item xs={1} >
            <Button
              component={RouterLink}
              to="/order"
              variant="contained"
              color="primary"
            >
              สั่งซื้อยา
            </Button>
          </Grid>
        </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="10%">
                OrderID
              </TableCell>
              <TableCell align="center" width="10%">
                Medicine
              </TableCell>
              <TableCell align="center" width="10%">
                Amount
              </TableCell>
              <TableCell align="center" width="10%">
                Company
              </TableCell>
              <TableCell align="center" width="10%">
                OrderTime
              </TableCell>
              <TableCell align="center" width="10%">
                IntendantName
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {order.map((item: OrdersInterface) => (
              <TableRow>
              <TableCell align="center">{item.ID}</TableCell>
              <TableCell align="center">{item.Medicine.Name}</TableCell>
              <TableCell align="center">{item.OrderAmount}</TableCell>
              <TableCell align="center">{item.MedicineCompany.Company_Name}</TableCell>
              <TableCell align="center">{format((new Date(item.OrderTime)),'dd MMMM yyyy hh:mm a')}</TableCell>
              <TableCell align="center">{item.Employee.Name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  )
}