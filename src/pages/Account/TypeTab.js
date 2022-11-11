import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import HttpService from "../../httpService.js";
import UserContext from "../../Utils/UserContext.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">FIT19</Link> {new Date().getFullYear()}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#f0f0f0",
    WebkitTextFillColor: "black",
  },
});

export default function Account() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  const [accType, setAccType] = React.useState("");
  const [accountTypeDetails, setAccountTypeDetails] = React.useState(null);
  const [isActive, setIsActive] = React.useState("");
  const [newIsActive, setNewIsActive] = React.useState("");
  const [deleteAccTypeId, setDeleteAccTypeId] = React.useState("");
  const [accTypeName, setAccTypeName] = React.useState("");

  const handleAccTypeChange = (event) => {
    setAccType(event.target.value);
  };

  const handleAccTypeNameChange = (event) => {
    setAccTypeName(event.target.value);
  };

  const handleDeleteAccTypeIdChange = (event) => {
    setDeleteAccTypeId(event.target.value);
  };

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    setIsActive(event.target.value);
  };

  const handleNewIsActiveChange = (event) => {
    setNewIsActive(event.target.value);
  };

  const createAccountType = () => {
    // const key = localStorage.getItem('userID');
    // const url = link + key;

    //JSON.stringify(data)
    HttpService.post(`api/v1/accTypes`, {
      type: accTypeName,
      isActive: newIsActive,
    })
      .then((res) => {
        console.log(res.data);
        // setAccountDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAccType = () => {
    HttpService.get(`/api/v1/accTypes/getAccTypeByType/${accType}`)
      .then((res) => {
        console.log(res.data);
        setAccountTypeDetails(res.data);
        setIsActive(res.data.active);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAccType = () => {
    HttpService.put(`/api/v1/accTypes/${accountTypeDetails.accTypeId}`, {
      type: accType,
      isActive: isActive,
    })
      .then((res) => {
        console.log(res.data);
        setAccountTypeDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAccount = () => {
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    HttpService.delete(`api/v1/accTypes/${deleteAccTypeId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        // marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user.userId && user.role == "MANAGER" ? (
        <>
          <Typography
            component="h5"
            variant="caption"
            sx={{
              color: "#404040",
              fontSize: 50,
            }}
          >
            Accounts Types Page
          </Typography>
          <Typography
            component="h5"
            variant="subtitle1"
            sx={{
              //   fontSize: 20,
              color: "#6F6F6F",
              marginBottom: "20px",
            }}
          >
            In this page you can search, update, create and delete account type.
          </Typography>

          {/* Search Accounts Card */}
          <Card
            variant="elevation"
            sx={{
              overflow: "visible",
              "& .MuiCardHeader-subheader	": {
                color: "white",
              },
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <CardHeader
              sx={{
                background:
                  "linear-gradient(to right bottom, #4caf50, #2e7d32)",
                marginLeft: "-20px",
                marginRight: "-20px",
                borderRadius: "5px",
                color: "white",
                // width: "108%",
              }}
              title={"Search Account Type"}
              subheader={
                "You can search and update account types with this section"
              }
            />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={9}>
                  <TextField
                    required={true}
                    fullWidth
                    id="accId"
                    label="Account Type Name"
                    value={accType}
                    name="accTypeId"
                    onChange={handleAccTypeChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#4caf50" }}
                    onClick={getAccType}
                  >
                    Search
                  </Button>
                </Grid>
                {accountTypeDetails != null && (
                  <>
                    <Grid item xs={12}>
                      <CustomTextField
                        required={true}
                        fullWidth
                        id="email"
                        label="TypeID"
                        name="email"
                        value={accountTypeDetails.accTypeId}
                        autoComplete="email"
                        // contentEditable={false}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomTextField
                        required={true}
                        fullWidth
                        name="password"
                        label="Account Type"
                        id="password"
                        value={accountTypeDetails.type}
                        autoComplete="new-password"
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">
                          Status
                        </InputLabel>
                        <Select
                          defaultValue={accountTypeDetails.active}
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={isActive}
                          label="status"
                          onChange={handleChange}
                        >
                          <MenuItem value={true}>Active</MenuItem>
                          <MenuItem value={false}>Deactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#4caf50" }}
                        onClick={updateAccType}
                      >
                        Update
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Create Accounts */}
          <Card
            variant="elevation"
            sx={{
              overflow: "visible",
              "& .MuiCardHeader-subheader	": {
                color: "white",
              },
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <CardHeader
              sx={{
                background:
                  "linear-gradient(to right bottom, #ff9800, #ed6c02)",
                marginLeft: "-20px",
                marginRight: "-20px",
                borderRadius: "5px",
                // width: "108%",
                color: "white",
              }}
              title={"Create Accounts"}
              subheader={"You can create accounts with this section"}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    required={true}
                    fullWidth
                    id="email"
                    label="Type"
                    name="email"
                    value={accTypeName}
                    onChange={handleAccTypeNameChange}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Status
                    </InputLabel>
                    <Select
                      // defaultValue={accountDetails.active}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="status"
                      value={newIsActive}
                      onChange={handleNewIsActiveChange}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Deactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={createAccountType}
                sx={{ mt: 3, mb: 2, backgroundColor: "#ff9800" }}
              >
                Create
              </Button>
            </CardContent>
          </Card>

          {/* Delete Accounts Card */}
          <Card
            variant="elevation"
            sx={{
              overflow: "visible",
              "& .MuiCardHeader-subheader	": {
                color: "white",
              },
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <CardHeader
              sx={{
                background:
                  "linear-gradient(to right bottom, #ef5350, #d32f2f)",
                marginLeft: "-20px",
                marginRight: "-20px",
                borderRadius: "5px",
                color: "white",
              }}
              title={"Delete Accounts"}
              subheader={"You can search and delete accounts with this section"}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth
                    id="email"
                    label="Account ID"
                    value={deleteAccTypeId}
                    onChange={handleDeleteAccTypeIdChange}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                onClick={deleteAccount}
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#ef5350" }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
        <Typography
            component="h5"
            variant="caption"
            sx={{
              color: "#404040",
              fontSize: 50,
            }}
          >
            Not Allowed
          </Typography>
          <Typography
            component="h5"
            variant="subtitle1"
            sx={{
              //   fontSize: 20,
              color: "#6F6F6F",
              marginBottom: "20px",
            }}
          >
            Only managers can access this.
          </Typography>
        </>
      )}
    </Box>
  );
}
