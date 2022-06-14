import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import card1Img from "../assets/das-icon1.png";
import card2Img from "../assets/das-icon2.png";
import card3Img from "../assets/das-icon3.png";
import Loader from "../pages/Loader";

import { get_card_list } from "../api/userUpdate";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  dashboardStats,
  Graph_data,
  OrderHistoryStats,
} from "../api/dashboardApi/dashboardApi";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DatePicker, Select } from "antd";

const { Option } = Select;
function MainDashboard() {
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  const [loader, setLoader] = useState(false);
  const [history, setHisory] = useState([]);
  const [loadmore, setLoadmore] = useState(10);
  const [graphData, setGraphData] = useState([]);
  const [filtered_data , setFiltered_data] = useState(null)
  const [order_status , setOrder_status] = useState("")
  const [month, setMonth] = useState({
    datawise: "month",
    month: null
  });
  const [year, setYear] = useState({
    datawise: "year",
    month: moment(new Date())
  })
  const [getRange, setGetRange] = useState({
    from: "",
    to: "",
  })
  const dispatch = useDispatch();

  const handleChange = (e, value) => {
    const monthCopy = { ...month }
    const yearCopy = { ...year }
    if (value === "month") {
      monthCopy.datawise = "month"
      monthCopy.month = e
      setMonth(monthCopy);
      yearCopy.month = undefined
      setYear(yearCopy)

    }
    if (value === "year") {
      yearCopy.datawise = "year"
      yearCopy.month = e
      setYear(yearCopy);
      monthCopy.month = undefined
      setMonth(monthCopy)
    }
  };



  const searchFilter = () => {
    //  const resultDate=month.month ? month:year
    let resultDate
    if (month.month) {
      resultDate = { ...month }
      resultDate.month = resultDate.month.format("01-MM-YYYY");

    } else {
      resultDate = { ...year };
      resultDate.month = resultDate.month.format("01-01-YYYY");
    }
    //  resultDate.month=
    Graph_data(setGraphData, setLoading, resultDate);
  };

  const getRangeData = () => {
    OrderHistoryStats(setHisory, setLoading, getRange , order_status);
  }

  const Range_Picker = (e) => {
    if (e) {
      getRange.from = moment(e[0])?.format("DD-MM-YYYY")
      getRange.to = moment(e[1])?.format("DD-MM-YYYY")
      setGetRange(getRange)
    }
    else {
      setGetRange({})
    }
  }

   let filtered_copy=[...history]

  const SelectChange=(chk_status)=>{
    setOrder_status(chk_status)
    OrderHistoryStats(setHisory, setLoading, getRange , chk_status);
  }

  useEffect(() => {
    if (!sessionStorage.getItem("card_det")) {
      get_card_list(dispatch, setLoading);
    }
    dashboardStats(setStats, setLoading);
    OrderHistoryStats(setHisory, setLoading, getRange);
    // Graph_data(setGraphData, setLoading, month);
    
  }, []);

  useEffect(() => {
    searchFilter()
  }, [])
  return (
    <div>
      <div className="without-banner">
        <div className="allpagpading dashboarfpage-section">
          <div className="container">
            <h1>Dashboard</h1>
            <Row className="dashbor-sec">
              <Col md={4} lg={4} sm={12} className="mb-2">
                <Card className="card-prop card-color1">
                  <Card.Img variant="top" src={card1Img}></Card.Img>
                  <Card.Title>Completed Orders</Card.Title>
                  <p className="totl-dd">{stats.completeorder}</p>
                </Card>
              </Col>
              <Col md={4} lg={4} sm={12} className="mb-2">
                <Card className="card-prop card-color2">
                  <Card.Img variant="top" src={card2Img} />
                  <Card.Title>In process Orders</Card.Title>
                  <p className="totl-dd">{stats.inprocessorder}</p>
                </Card>
              </Col>
              <Col md={4} lg={4} sm={12} className="mb-2">
                <Card className="card-prop card-color3">
                  <Card.Img variant="top" src={card3Img} />
                  <Card.Title>Total orders</Card.Title>
                  <p className="totl-dd">{stats.total}</p>
                </Card>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <h2 className="dshbord-txt">
                  These Chart shows {graphData[0]?.year} Order Statistics
                </h2>
              </Col>
            </Row>
            <hr />

            <div className="uppersdatselect">
              <div className="inputcutm">

                <DatePicker
                  picker="month"
                  format="MM-YYYY"
                  value={month.month}
                  onChange={(e, month) => handleChange(e, "month")}
                  placeholder="Select Month-Year"
                />

              </div>
              <div className="inputcutm">
                <DatePicker
                  picker="year"
                  format="YYYY"
                  value={year.month}
                  onChange={(e, year) => handleChange(e, "year")}
                />
              </div>
              <div className="inputcutmbtn">
                <Button className="oderListBtn" onClick={searchFilter}>
                  Search
                </Button>
              </div>
            </div>

            <Row className="dasgraph-section">
              <Col md={8} lg={8} sm={12} className="mb-2">
                <Card className="graph-card-prop">
                  <Card.Title>Sales statistics</Card.Title>
                  <div className="chartheight">
                    <LineChart
                      className="pl-3 pr-3 pt-3 pb-3"
                      graphData={graphData}
                    />
                  </div>
                </Card>
              </Col>
              <Col md={4} lg={4} sm={12} className="mb-2">
                <Card className="graph-card-prop">
                  <Card.Title>Sales Statistics</Card.Title>
                  <div className="chartheight">
                    <PieChart graphData={graphData} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row className="dastable-section">
              <Col md={12} lg={12} sm={12}>
                <Card className="table-card">
                  <div className="histry-date" style={{ display: "flex", justifyContent: "" }}>
                    <h4 className="dshbord-txt  mr-auto mb-0" >All Order History page</h4>
                    <Select className="orderstatus-msg" defaultValue="all_order" onSelect={SelectChange}>
                      <Option value="delivered">Delivered</Option>
                      <Option value="inprocess">In Process</Option>
                      <Option value="outofdelivery">Out for delivery</Option>
                      <Option value="cancel">Cancel</Option>
                      <Option value="incomplete" >Not confirmed</Option>
                      <Option value="all_order">All Orders</Option>
                    </Select>
                    <RangePicker
                      className="histrdate-div"
                      style={{ marginRight: "" }}
                      format="MMM DD,YYYY"
                      onChange={Range_Picker}
                    />
                    <button className="oderListBtn" onClick={getRangeData}>
                      SEARCH ODER
                    </button>
                  </div>
                  <div><h5>Total Orders = {history?.length}</h5></div>
                  <div className="table-responsive">
                    {history?.length > 0 ? (
                      <Table className="history-table">
                        <thead>
                          <tr>
                            <th>Sr no</th>
                            <th>Order Number</th>
                            <th>Shipper</th>
                            <th>Weight</th>
                            <th>Delivery Date</th>
                            <th className="text-center">Status</th>
                            <th>View</th>
                                              </tr>
                        </thead>
                        <tbody>
                          {history?.slice(0, loadmore).map((e, i) => (
                            <tr key={`order${i}`}>
                              <td>{i + 1}</td>
                              <td>{e?.order_id}</td>
                              <td>Trans8</td>
                              <td>{e?.dimension_weight}kg</td>
                              <td>
                                {moment(e?.delivery_date, "YYYY-MM-DD").format(
                                  "MMM DD , YYYY"
                                )}
                              </td>
                              <td className="text-center">
                                <span
                                  className={
                                    e?.oder_delivered === `not-delivered`
                                      ? `blue`
                                      : `green`
                                  }
                                >
                                  {e?.status === "complete" &&
                                    e?.oder_delivered === "inprocess" &&
                                    <span style={{ color: "blue" }}>Order In Process</span>}
                                  {e?.status === "complete" &&
                                    e?.oder_delivered === "delivered" &&
                                    <span style={{ color: "green" }}>Order delivered</span>}
                                  {e?.status === "incomplete" &&
                                    <span className="odr-sttus sts-red">Order not confirmed</span>}
                                  {e?.status === "cancel" && <span className="odr-sttus sts-red">Order Cancelled</span>}
                                  {e?.status === "complete" && e?.oder_delivered === "outofdelivery" && <span style={{ color: "orange" }}>Out for delivery</span>}
                                  {e?.status === "" && <span>No status found</span>}
                                </span>
                              </td>
                              <td>
                                <Link to={`/order-details/${e?.order_id}`}>
                                  <EyeOutlined /> View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <div className="text-center">
                        <p>Sorry, you have booked no freight yet</p>
                      </div>
                    )}

                  </div>
                  <div className="btn-outer">
                    {history?.length > loadmore && (
                      <Button
                        className="btn btn-info tablelod-btn"
                        onClick={() => setLoadmore(loadmore + 10)}
                      >
                        Load more
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default MainDashboard;
