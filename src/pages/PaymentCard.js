import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreditCard from "../components/CreditCard";
import AddCreditCard from "../components/AddCreditCard";
import CardList from "./CardList";

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

const PaymentCard = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box style={{ width: "100%" }}>
        <Box sx={{}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="CREDIT CARD" {...a11yProps(0)} />
            <Tab label="ADD NEW CARD" {...a11yProps(1)} />
            <Tab label="All CARDS" {...a11yProps(2)} />
            
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            <AddCreditCard />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <CreditCard />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            <CardList />
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default PaymentCard;
