import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { margin } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { TableContainer } from "@mui/material";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import LoanDataComponent from "../../components/LoanDataComponent/LoanDataComponent";
import HttpService from "../../httpService.js";

const Loan = () => {
  const { id } = useParams();
  const [loanData, setLoanData] = useState([]);
  const [value, setValue] = React.useState("1");
  const [showTable, setShowTable] = useState(true);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [installments, setInstallments] = useState("");
  const [userId, setUserId] = useState("");
  const [guaranteeNIC, setGuaranteeNIC] = useState("");
  const [guaranteeName, setGuaranteeName] = useState("");
  const [loanStatus, setLoanStatus] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleAmountChange = (event, newValue) => {
    console.log(event.target.value);
    setAmount(event.target.value);
  };
  const handleTypeChange = (event, newValue) => {
    setType(newValue.props.value);
  };
  const handleDescriptionChange = (event, newValue) => {
    setDescription(event.target.value);
  };
  const handleInstallmentChange = (event, newValue) => {
    setInstallments(event.target.value);
  };
  const handleUserIdChange = (event, newValue) => {
    setUserId(event.target.value);
  };
  const handleGuaranteeNICChange = (event, newValue) => {
    setGuaranteeNIC(event.target.value);
  };
  const handleGuaranteeNameChange = (event, newValue) => {
    setGuaranteeName(event.target.value);
  };
  const handleLoanStatusChange = (event, newValue) => {
    console.log(newValue.props.value);
    setLoanStatus(newValue.props.value);
  };
  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(event.target.value);
  };

  useEffect(() => {
    getLoanDataByUserId();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleCustomerIdChange = (event, newValue) => {
  //   console.log(event.target.value);
  //   setCustomerId(event.target.value);
  // };

  const addNewLoan = () => {
    console.log(amount);
    var data = {
      amount: amount,
      type: type,
      description: description,
      installments: installments,
      userId: id,
      guaranteeNIC: guaranteeNIC,
      guaranteeName: guaranteeName,
      loanStatus: loanStatus,
      interestRate: interestRate,
    };
    HttpService.post(`/api/v1/loan`, data)
      .then((res) => {
        document.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const close = () => {
    setAmount("");
    setDescription("");
    setGuaranteeNIC("");
    setGuaranteeName("");
    setInstallments("");
    setInterestRate("");
    setLoanStatus("");
    setUserId("");
    setType("");
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const getLoanDataByUserId = () => {
    HttpService.get(`/api/v1/loan/userId/${id}`)
      .then((res) => {
        console.log(res.data);
        setLoanData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const con = () => {
    console.log(loanData);
  };
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value} centered>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Search Loan" value="1" />
              <Tab label="Add Loan" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <div align="center">
              {/* <h1>Search Loan</h1>
              <div align="center">
                <TextField
                  id="outlined-basic"
                  label="Enter Customer Id Here."
                  variant="outlined"
                  onChange={handleCustomerIdChange}
                />
              </div>
              <div align="center">
                <Box sx={{ m: 2 }}>
                  {" "}
                  <Button variant="contained" onClick={getLoanDataByUserId}>
                    Search
                  </Button>
                </Box>
              </div> */}

              <div style={{ height: 10 }} />
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, backgroundColor: "#f3e5f5" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead sx={{ backgroundColor: "#512da8" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }}>LoanId</TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Amount
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Type
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Installment
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Status
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loanData != null ? (
                      loanData.map((loanDetails) => (
                        <LoanDataComponent
                          LoanId={loanDetails.loanId}
                          Amount={loanDetails.amount}
                          Type={loanDetails.type}
                          Installments={loanDetails.installments}
                          Status={loanDetails.loanStatus}
                          Description={loanDetails.description}
                          GuaranteeNIC={loanDetails.guaranteeNIC}
                          GuaranteeName={loanDetails.guaranteeName}
                          InterestRate={loanDetails.interestRate}
                          UserId={loanDetails.userId}
                          getLoanDataByUserId={getLoanDataByUserId}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <Container maxWidth="sm" centered>
              <h1>Add New Loan</h1>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Type"
                      onChange={handleTypeChange}
                    >
                      <MenuItem value={"PERSONAL"}>PERSONAL</MenuItem>
                      <MenuItem value={"AUTO"}>AUTO</MenuItem>
                      <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
                      <MenuItem value={"MORTGAGE"}>MORTGAGE</MenuItem>
                      <MenuItem value={"CREDIT_BUILDER"}>
                        CREDIT BUILDER
                      </MenuItem>
                      <MenuItem value={"DEBT_CONSOLIDATION"}>
                        DEBT CONSOLIDATION
                      </MenuItem>
                      <MenuItem value={"PAYDAY"}>PAYDAY</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    onChange={handleDescriptionChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    type="number"
                    onChange={handleAmountChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Installments"
                    variant="outlined"
                    onChange={handleInstallmentChange}
                    type="number"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Guarantee NIC"
                    variant="outlined"
                    onChange={handleGuaranteeNICChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Guarantee Name"
                    variant="outlined"
                    onChange={handleGuaranteeNameChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Loan Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Loan Status"
                      onChange={handleLoanStatusChange}
                    >
                      <MenuItem value={"ACCEPTED"}>ACCEPTED</MenuItem>
                      <MenuItem value={"REJECTED"}>REJECTED</MenuItem>
                      <MenuItem value={"PENDING"}>PENDING</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Interest Rate"
                    variant="outlined"
                    onChange={handleInterestRateChange}
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={addNewLoan}
                    >
                      Add
                    </Button>
                    <Button variant="contained" size="large" onClick={close}>
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Container>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Loan;
