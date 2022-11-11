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
import AccountTab from "./AccountTab.js";
import TypeTab from "./TypeTab.js";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme();

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root.Mui-disabled": {
    backgroundColor: "#f0f0f0",
    WebkitTextFillColor: "black",
  },
});

export default function Account() {
  const navigate = useNavigate();

  const [tabValue, setTabValue] = React.useState("1");

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabValueChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Account" value="1" />
                <Tab label="Account Types" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AccountTab />
            </TabPanel>

            {/* Second Tab View */}

            <TabPanel value="2">
              <TypeTab />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
