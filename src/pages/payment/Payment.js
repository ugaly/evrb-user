import React, { useState, useEffect } from 'react';
import {
    Box, Button, Card, Grid, Step, StepLabel, Stepper, 
    TableBody,
    TableCell,
    TableContainer,
    Table,
    TableRow,
    Paper  } from "@mui/material";
  import Widget from "../../components/Widget";
import AuthService from '../../services/auth/auth_service';

const Payment = (props) => {
    //const root_id = props.location && props.location.state.root_id;
    const [activeStep, setActiveStep] = useState(6);
    const [payments, setPayments] = useState({});

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    const loadPayments = () => {
        try{
          AuthService.getPaymentInfo().then((response) => {
            
            try{
              console.log(response.data);
              setPayments(response.data);
            }catch(e){
              console.log(e);
            }
          })
        }catch(e){
          console.log(e);
        }
    }

    useEffect(() => {
      loadPayments();
      
    }, []);

    return (
        <div>
            <Box className="mb-6">
        <ol class="flex items-center whitespace-nowrap">
          <li class="inline-flex items-center">
            <a class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
              Home
            </a>
            <svg class="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
            </svg>
          </li>
          <li class="inline-flex items-center">
            <a class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
              Registration
              <svg class="flex-shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"></path>
              </svg>
            </a>
          </li>
          <li class="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
          Payment
          </li>
        </ol>
      </Box>

      <Grid container spacing={3} className="mb-4">
            <Grid item spacing={3} xs={12} md={12} lg={12} xl={12}>
              <Card>
                <Stepper activeStep={activeStep - 1} alternativeLabel className="mb-8 mt-8">
                  {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'].map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Card>
            </Grid>
          </Grid>

            <Box mt={4}>
                <Widget title="Payment" upperTitle noBodyPadding >

                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: '150px' }}>Bill Description :</TableCell>
                                <TableCell>
                                    <b>{payments.description}</b>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bill Amount :</TableCell>
                                <TableCell>
                                    <b>{payments.amount} TSH</b>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Control Number :</TableCell>
                                <TableCell>
                                    <h3>{payments.controlNo}</h3>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Payment Status :</TableCell>
                                <TableCell>
                                    <b style={{ color: '#f00' }}>{payments.status}</b>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell />
                                <TableCell>
                                    <Button variant="contained" onClick={loadPayments}>Refresh</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </Widget>
            </Box>
        </div>
    )
}

export default Payment;
