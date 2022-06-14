import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Box from "../assets/images-_1_.png";
import { Link } from "react-router-dom";
import { All_Order_Listing, cancel_order } from "../api/Order/OrderListing";
import Loader from "../pages/Loader";
import Alertify from "../pages/Alertify";
import moment from "moment";
import { DatePicker, Space, Select, Modal, Input } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import DownloadIcon from "@mui/icons-material/Download";

const { Option } = Select;
const OrderHistory = () => {
  const { RangePicker } = DatePicker;
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [loadmore, setLoadmore] = useState(5);
  const [order_status, setOrder_status] = useState("");
  const [cancel_status, setCancel_status] = useState(false);
  const [order_id , setOrder_id] = useState("")
  const [getRange, setGetRange] = useState({
    from: "",
    to: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const Cancel_order=(id)=>{
    sessionStorage.removeItem("last_route")
    setOrder_id(id)
    setIsModalVisible(true);  
  }

  const handleOk = () => {
    cancel_order(order_id, setLoader, setType, setMessage, setCancel_status);
    All_Order_Listing(setData, setLoader, searchId, getRange , order_status);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getOrder = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("last_route")
    All_Order_Listing(setData, setLoader, searchId, getRange, order_status);
  };

  const ids = data.map((o) => o.order_id);
  const filtered = data.filter(
    ({ order_id }, index) => !ids.includes(order_id, index + 1)
  );

  const handleChange = (e) => {
    setSearchId(e.target.value);
  };

  const loadmore_function = () => {
    sessionStorage.removeItem("last_route")
    setLoadmore(loadmore + 5);
  };

  const Range_Picker = (e) => {
    sessionStorage.removeItem("last_route")
    if (e) {
      getRange.from = moment(e[0]).format("DD-MM-YYYY");
      getRange.to = moment(e[1]).format("DD-MM-YYYY");
      setGetRange(getRange);
    } else {
      setGetRange({});
    }
  };


  const SelectChange = (chk_status) => {
    sessionStorage.removeItem("last_route")
    setOrder_status(chk_status);
    All_Order_Listing(setData, setLoader, searchId, getRange, chk_status);
  };

  useEffect(() => {
    All_Order_Listing(setData, setLoader, searchId, getRange);
    if (sessionStorage.getItem("last_route") === "/current-order") {
      setType("success");
      setMessage(
        "Your order has been confirmed, we have sent a confirmation email to your registered email"
      );
    }
  }, []);

  return (
    <div className="Orderpage-section">
      <div className="container">
        {sessionStorage.getItem("last_route") === "/current-order" ?
          (type === "error" || type === "success") && (
            <Alertify message={message} type={type} setType={setType} />
          ):
        cancel_status && (type === "error" || type === "success") && (
          <Alertify message={message} type={type} setType={setType} />
        )}
        <Card className="heading">
          <Card.Body>
            <div className="orderpage-upper">
              <Card.Title className="register-title mb-4">
                {window.location.pathname === "/order-history" ? (
                  <div>
                    <span className="title-thin">ORDER</span>{" "}
                    <span style={{ fontWeight: "400" }}> History</span>
                  </div>
                ) : (
                  <div>
                    <span className="title-thin">MY</span>{" "}
                    <span style={{ fontWeight: "400" }}> ORDER</span>
                  </div>
                )}
              </Card.Title>

              <form className="d-flex">
                <Select
                  className="orderstatus-msg"
                  defaultValue={order_status==="" ?"all_order": order_status}
                  style={{ width: 120 }}
                  onSelect={SelectChange}
                >
                  <Option value="delivered">Delivered</Option>
                  <Option value="inprocess">In Process</Option>
                  <Option value="outofdelivery">Out for delivery</Option>
                  <Option value="cancel">Cancel</Option>
                  <Option value="incomplete">Not confirmed</Option>
                  <Option value="all_order">All Orders</Option>
                </Select>
                <RangePicker
                  className="ordpageinput form-control"
                  style={{ marginRight: "5px" }}
                  onChange={Range_Picker}
                  format="MMM DD,YYYY"
                />
                <Input
                  allowClear={true}
                  className="form-control orderhere"
                  type="search"
                  placeholder="Search Order by order id"
                  aria-label="Search"
                  onChange={handleChange}
                />
                <button
                  className="oderListBtn"
                  onClick={getOrder}
                  type="submit"
                >
                  SEARCH ODER
                </button>
              </form>
            </div>

            {!loader && filtered.length >= 1 ? (
              <>
                {filtered?.slice(0, loadmore).map((e, i) => (
                  <div className="box">
                    <div className="table-responsive" key={`order${i}`}>
                      <table className="myorder-table">
                        <tbody>
                          {
                            <tr>
                              <td>
                                <div className="image">
                                  <img src={Box} width="80" height="75" />
                                </div>
                              </td>
                              <td>
                                <div className="ordr-detl">
                                  <p>
                                    <span>Order Date:</span>{" "}
                                    {moment
                                      .utc(e?.created_at)
                                      .utcOffset("-0500")
                                      .format("MMM DD , YYYY")}
                                  </p>
                                  <p>
                                    <span>Order Time:</span>{" "}
                                    {moment
                                      .utc(e?.created_at)
                                      .utcOffset("-0500")
                                      .format("HH:mm")}
                                  </p>
                                  <p>
                                    <span>Order Id:</span> {e?.order_id}
                                  </p>
                                  <p>
                                    <span>Shipper:</span> Trans8
                                  </p>
                                  <p>
                                    <span>Weight:</span>{" "}
                                    {parseInt(e?.dimension_weight) *
                                      parseInt(e?.quantity)}
                                    Kg .
                                  </p>
                                </div>
                              </td>

                              <td className="mb-left" align="right">
                                <div className="order-dte">
                                  {e.status === "complete" && (
                                    <p>
                                      {e.status === "complete" &&
                                        e.oder_delivered === "delivered"
                                        ? "Delivery date"
                                        : "Estimated Delivery date"}
                                      <br />
                                      {moment(
                                        e?.delivery_date,
                                        "YYYY-MM-DD"
                                      ).format("MMM DD , YYYY")}
                                    </p>
                                  )}
                                </div>
                                {e.status === "complete" && (
                                  <>
                                    <p className="donlod-lable">
                                      Download label for package
                                    </p>
                                    <div className="order-dte">
                                      <div
                                        className="odr-detail"
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        {/* <a onClick={() => downloadpdf(e.order_id, setPdf)} style={{ fontSize: '12px' }}> <VisibilityIcon sx={{ fontSize: 20 }} />View</a> */}
                                        &nbsp;&nbsp;&nbsp;
                                        <a
                                          href={`http://devapi.trans8.ca/emailview/${e.order_id}`}
                                          target="_blank"
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          <DownloadIcon sx={{ fontSize: 20 }} />
                                          Download
                                        </a>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </td>
                            </tr>
                          }
                          <tr>
                            <td colSpan="1"></td>
                            <td>
                              <div className="odr-detail">
                                <Link to={`/order-details/${e.order_id}`}>
                                  <EyeOutlined />
                                  View order details
                                </Link>
                                {loaders && <Loader />}
                              </div>
                            </td>
                            <td align="right">
                              {e?.cancel_button === "yes" && (
                                <div className="odr-sttus sts-green">
                                  <Button
                                    className="btn btn-danger mb-2 pl-4 pr-4"
                                    style={{ height: "40px" }}
                                    onClick={() => Cancel_order(e.order_id)}
                                  >
                                    Cancel Order
                                  </Button>


                                </div>
                              )}
                              <div className="odr-sttus sts-green">
                                {e?.status === "complete" &&
                                  e?.oder_delivered === "inprocess" && (
                                    <span style={{ color: "blue" }}>
                                      Order In Process
                                    </span>
                                  )}
                                {e?.status === "complete" &&
                                  e?.oder_delivered === "delivered" && (
                                    <span style={{ color: "green" }}>
                                      Order delivered
                                    </span>
                                  )}
                                {e?.status === "incomplete" && (
                                  <span className="odr-sttus sts-red">
                                    Order not confirmed
                                  </span>
                                )}
                                {e?.status === "cancel" && (
                                  <span className="odr-sttus sts-red">
                                    Order Cancelled
                                  </span>
                                )}
                                {e?.status === "complete" &&
                                  e?.oder_delivered === "outofdelivery" && (
                                    <span style={{ color: "orange" }}>
                                      Out for delivery
                                    </span>
                                  )}
                                {e?.status === "" && (
                                  <span>No status found</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                {loadmore < filtered.length && (
                  <Button
                    className="btn btn-info mt-3 lodmr-btn"
                    onClick={loadmore_function}
                  >
                    Load more
                  </Button>
                )}
              </>
            ) : searchId === "" ? (
              <h6 style={{ color: "#707070" }}>
                Sorry, you have booked no freight yet
              </h6>
            ) : (
              <h5 style={{ color: "#707070" }}>Sorry no order found</h5>
            )}
            {loader && <Loader />}
          </Card.Body>
        </Card>
        <Modal
        className="order-popup"
          visible={isModalVisible}
          onOk={() => handleOk()}
          onCancel={handleCancel}
          okButtonProps={{
            children: "Custom OK"
          }}
          cancelButtonProps={{
            children: "Custom cancel"
          }}
          okText="Confirm"
          cancelText="Cancel"
        >
          <h6>Do you want to cancel the order {order_id}</h6>
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistory;

// for unique check from objects
// const ids = array.map(o => o.id)
// const filtered = array.filter(({id}, index) => !ids.includes(id, index + 1))
