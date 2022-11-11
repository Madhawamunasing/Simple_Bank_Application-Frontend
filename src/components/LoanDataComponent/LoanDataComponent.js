import React, { useEffect } from "react";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { TableCell, TableRow } from "@mui/material";
import axios from "axios";
// import { styled } from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import HttpService from "../../httpService.js";

const LoanDataComponent = ({
  LoanId,
  Amount,
  Type,
  Installments,
  Status,
  Description,
  GuaranteeNIC,
  GuaranteeName,
  InterestRate,
  UserId,
  getLoanDataByUserId
}) => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState();
  const [description, setDescription] = useState("");
  const [installments, setInstallments] = useState("");
  const [guaranteeNIC, setGuaranteeNIC] = useState("");
  const [guaranteeName, setGuaranteeName] = useState("");
  const [loanStatus, setLoanStatus] = useState("");
  const [interestRate, setInterestRate] = useState("");

  useEffect(() => {
    setType(Type);
    setLoanStatus(Status);
    setAmount(Amount);
    setDescription(Description);
    setGuaranteeNIC(GuaranteeNIC);
    setGuaranteeName(GuaranteeName);
    setInstallments(Installments);
    setInterestRate(InterestRate);
  }, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateSubmit = () => {
    HttpService.put(`/api/v1/loan/update/${LoanId}`, {
      amount: amount,
      type: type,
      description: description,
      installments: installments,
      guaranteeNIC: guaranteeNIC,
      guaranteeName: guaranteeName,
      loanStatus: loanStatus,
      interestRate: interestRate,
    })
      .then((res) => {
        setOpen(false);
        document.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const deteleLoan = () => {
    HttpService.delete(`/api/v1/loan/delete/${LoanId}`)
      .then((res) => {
        console.log(res.data);
        document.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <TableRow
        key={LoanId}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {LoanId}
        </TableCell>

        <TableCell align="center">{Amount}</TableCell>
        <TableCell align="center">{Type}</TableCell>
        <TableCell align="center">{Installments}</TableCell>
        <TableCell align="center">{Status}</TableCell>
        <TableCell align="center">
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="outlined" size="medium" onClick={handleClickOpen}>
              Update
            </Button>
            <Button variant="outlined" size="medium" onClick={deteleLoan}>
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Stack spacing={2}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Loan ID"
              fullWidth
              variant="outlined"
              value={LoanId}
              inputProps={{ readOnly: true }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleTypeChange}
              >
                <MenuItem value={"PERSONAL"}>PERSONAL</MenuItem>
                <MenuItem value={"AUTO"}>AUTO</MenuItem>
                <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
                <MenuItem value={"MORTGAGE"}>MORTGAGE</MenuItem>
                <MenuItem value={"CREDIT_BUILDER"}>CREDIT BUILDER</MenuItem>
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
              value={description}
              onChange={handleDescriptionChange}
            />
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <TextField
              id="outlined-basic"
              label="Installments"
              variant="outlined"
              value={installments}
              onChange={handleInstallmentChange}
            />
            <TextField
              id="outlined-basic"
              label="Guarantee NIC"
              variant="outlined"
              value={guaranteeNIC}
              onChange={handleGuaranteeNICChange}
            />
            <TextField
              id="outlined-basic"
              label="Guarantee Name"
              variant="outlined"
              value={guaranteeName}
              onChange={handleGuaranteeNameChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Loan Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={Status}
                value={loanStatus}
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
              value={interestRate}
              onChange={handleInterestRateChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoanDataComponent;
