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

  const [accTypes, setAccTypes] = React.useState([
    {
      accTypeId: "635f994f867a0d13721882e8",
      active: true,
      type: "Savings",
    },
  ]);
  const [newAccTypes, setNewAccTypes] = React.useState([]);
  const [accountDetails, setAccountDetails] = React.useState(null);
  const [isActive, setIsActive] = React.useState(true);
  const [accId, setAccId] = React.useState("");
  const [deleteAccId, setDeleteAccId] = React.useState("");
  const [values, setValues] = React.useState({
    amount: "",
    customerId: "",
    status: "",
  });

  const [tabValue, setTabValue] = React.useState("1");

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleValueChange = (prop) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    setIsActive(event.target.value);
  };

  const handleDeleteAccIdChange = (event) => {
    setDeleteAccId(event.target.value);
  };

  const handleAccTypeChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    setNewAccTypes(event.target.value);
  };

  const handleAccIdChange = (event) => {
    setAccId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const getAccTypes = () => {
    console.log("dhfkdjgfh");
    const link = "api/v1/accTypes";
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    HttpService.get(link)
      .then((res) => {
        console.log(res.data);
        setAccTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAccount = () => {
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    HttpService.delete(`api/v1/accounts/${deleteAccId}`)
      .then((res) => {
        console.log(res.data);
        setAccountDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAccountDetails = () => {
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    console.log(accountDetails);

    var data = {
      amount: accountDetails.amount,
      accTypeId: accountDetails.accType.accTypeId,
      customerId: accountDetails.customerId,
      created: accountDetails.created,
      active: isActive,
    };
    console.log(data);
    //JSON.stringify(data)
    HttpService.put(`api/v1/accounts/${accountDetails.accId}`, {
      amount: accountDetails.amount,
      accTypeId: accountDetails.accType.accTypeId,
      customerId: accountDetails.customerId,
      created: accountDetails.created,
      active: isActive,
    })
      .then((res) => {
        console.log(res.data);
        setAccountDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAccount = () => {
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    console.log(accountDetails);

    var data = {
      amount: values.amount,
      accTypeId: newAccTypes,
      customerId: values.customerId,
      created: new Date().toISOString(),
      active: isActive,
    };
    console.log(data);
    //JSON.stringify(data)
    HttpService.post(`api/v1/accounts`, {
      amount: values.amount,
      accTypeId: newAccTypes,
      customerId: values.customerId,
      created: new Date().toISOString(),
      active: values.isActive,
    })
      .then((res) => {
        console.log(res.data);
        // setAccountDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //accId = 635f9fcd4da5e56eb68cce9b
  const getAccountByAccId = () => {
    const link = `api/v1/accounts/getAccountByAccId/${accId}`;
    // const key = localStorage.getItem('userID');
    // const url = link + key;
    HttpService.get(link)
      .then((res) => {
        console.log(res.data);
        // setAccountDetails(res.data);
        setIsActive(res.data.active);
        HttpService.get(
          `api/v1/accTypes/getAccTypeByAccTypeId/${res.data.accTypeId}`
        )
          .then((res2) => {
            console.log(res2.data);
            res.data.accType = res2.data;
            console.log(res.data);
            setAccountDetails(res.data);
            // setIsActive(res.data.active);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    console.log("I Only run once (When the component gets mounted)");
    getAccTypes();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJJc3VydUBnbWFpbC5jb20iLCJleHAiOjE2NjcyNTE2ODksImlhdCI6MTY2NzIzMzY4OX0.JfNFuxs_Msq_UbTv_3SLcLFDy2KO5cN5JO-O4-iPEBVVit4jzDRUm1TZe5eBu7Lq1m98sbrm9EtQ3KSFT3mmow"
    );
  }, []);

  return (
    <Box
      sx={{
        // marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        component="h5"
        variant="caption"
        sx={{
          color: "#404040",
          fontSize: 50,
        }}
      >
        Accounts Page
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
        In this page you can search, update, create and delete accounts.
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
            background: "linear-gradient(to right bottom, #4caf50, #2e7d32)",
            marginLeft: "-20px",
            marginRight: "-20px",
            borderRadius: "5px",
            color: "white",
          }}
          title={"Search Accounts"}
          subheader={"You can search and update accounts with this section"}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField
                required={true}
                fullWidth
                id="accId"
                label="Account ID"
                value={accId}
                name="accId"
                onChange={handleAccIdChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#4caf50" }}
                onClick={getAccountByAccId}
              >
                Search
              </Button>
            </Grid>
            {accountDetails != null && (
              <>
                <Grid item xs={12}>
                  <CustomTextField
                    required={true}
                    fullWidth
                    id="email"
                    label="Amount"
                    name="email"
                    value={accountDetails.amount}
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
                    value={accountDetails.accType.type}
                    autoComplete="new-password"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    required={true}
                    fullWidth
                    name="password"
                    label="Created"
                    id="password"
                    value={accountDetails.created.slice(0, 10)}
                    autoComplete="new-password"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    required={true}
                    fullWidth
                    name="re-password"
                    label="CustomerId"
                    value={accountDetails.customerId}
                    id="re-password"
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
                      disabled={user.userId && user.role != "MANAGER"}
                      defaultValue={accountDetails.active}
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
                {user.userId && user.role == "MANAGER" && (
                  <>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#4caf50" }}
                        onClick={updateAccountDetails}
                      >
                        Update
                      </Button>
                    </Grid>
                  </>
                )}
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
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <CardHeader
          sx={{
            background: "linear-gradient(to right bottom, #ff9800, #ed6c02)",
            marginLeft: "-20px",
            marginRight: "-20px",
            borderRadius: "5px",
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
                label="Amount"
                name="email"
                value={values.amount}
                onChange={handleValueChange("amount")}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Acc Type
                </InputLabel>
                <Select
                  // defaultValue={accountDetails.active}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="accType"
                  value={newAccTypes}
                  onChange={handleAccTypeChange}
                  // MenuProps={MenuProps}
                >
                  {accTypes.map((element) => (
                    <MenuItem key={element.accTypeId} value={element.accTypeId}>
                      {element.type}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Deactive</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required={true}
                fullWidth
                name="re-password"
                label="CustomerId"
                value={values.customerId}
                onChange={handleValueChange("customerId")}
                id="re-password"
                autoComplete="new-password"
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
                  value={values.status}
                  onChange={handleValueChange("status")}
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
            onClick={createAccount}
            sx={{ mt: 3, mb: 2, backgroundColor: "#ff9800" }}
          >
            Create
          </Button>
        </CardContent>
      </Card>

      {/* Delete Accounts Card */}
      {user.userId && user.role == "MANAGER" && (
        <>
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
                    value={deleteAccId}
                    id="email"
                    label="Account ID"
                    name="email"
                    onChange={handleDeleteAccIdChange}
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#ef5350" }}
                onClick={deleteAccount}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
