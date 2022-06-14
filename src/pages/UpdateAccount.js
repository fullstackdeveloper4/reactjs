import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UpdateUser from "./UpdateUser";
import UpdatePassword from "./UpdatePassword";
import PaymentInfo from "./PaymentInfo";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const UpdateAccount = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mainContainer">
      <Box sx={{ width: "50%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="UPDATE INFO" {...a11yProps(0)} />
            <Tab label="CHANGE PASSWORD" {...a11yProps(1)} />
            <Tab label="PAYMENT INFO" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UpdateUser />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdatePassword />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PaymentInfo />
        </TabPanel>
      </Box>
    </div>
  );
};

export default UpdateAccount
