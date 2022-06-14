import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from "react-bootstrap";
import { order_detail } from '../api/Order/OrderListing';
import Box from "../assets/images-_1_.png";
import Loader from "../pages/Loader";

const ViewOrderDetails = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        order_detail(props.match.params.id, setData, setLoading)
        sessionStorage.removeItem("last_route")
    // eslint-disable-next-line\
    }, [])
    return (
        <div>
            <div className="ordersummry">
                <div className="container">
                    <Card className="heading">
                        <Card.Body>
                            <Card.Title className="register-title">
                                <span className="title-thin">ORDER</span> DETAIL
                            </Card.Title>
                            {/* <Card.Text>
                                It is a long established fact that a reader will be distracted
                                by the readable content of a page when looking.
                            </Card.Text> */}
                            <div>
                                <Row className="mt-5">
                                    <Col md={12}>
                                        <div className="ordr-id">
                                            <h2>Order Id: #{props.match.params.id}</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <div className="billedsec text-left">
                                            <h4>Address From:</h4>
                                            <p>{data[0]?.from_address}<br />
                                                {data[0]?.from_province} , {data[0]?.from_postal_code},{data[0]?.from_country}<br />
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="billedsec text-right">
                                            <h4>Address To:</h4>
                                            <p>{data[0]?.to_address}<br />
                                                {data[0]?.to_province} , {data[0]?.to_postal_code},{data[0]?.to_country}<br />
                                            </p>
                                        </div>
                                    
                                    </Col>
                                </Row>
                                <Row className="mt-3 mb-4">

                                    <Col md={6}>
                                        {data[0]?.customer_card_details[0]?.card_number &&
                                            <div className="billedsec text-left">
                                                <h4>Payment Method:</h4>
                                                <p>{"Visa ending **** **** **** " + data[0]?.customer_card_details[0]?.card_number.split("").map((e, i, v) => v[12 + i]).join(" ")}<br />
                                                    {data[0]?.customer[0] && data[0]?.customer[0]?.email}</p>
                                            </div>}
                                    </Col>
                                    <Col md={6}>
                                        <div className="billedsec text-right">
                                            <h4>Order Date & Time</h4>
                                            <p>{data[0] && moment.utc(data[0]?.created_at).utcOffset("-0500").format("MMM DD , YYYY")} , {data[0] && moment.utc(data[0]?.created_at).utcOffset("-0500").format("HH:mm")}</p>
                                        </div>
                                        <div className="billedsec text-right">
                                            <h4>Pickup date & Time</h4>
                                            <p>{data[0] && moment(data[0]?.pickup_date , "YYYY-MM-DD").format('MMM DD , YYYY')} , {data[0] && moment(data[0]?.pickup_time , "HH:mm:ss").format("HH:mm") }</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* for qr label */}
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className="table-responsive">
                                        <table className="smry-table">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">Sr No.</th>
                                                    <th className="text-left">Product</th>
                                                    <th className="text-left">Tracking Id</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((e, i) =>
                                                    <tr ky={i}>
                                                        <td align="left">{i + 1}</td>
                                                        <td align="left">
                                                            <div className="frst">
                                                                <div className="image">
                                                                    <img src={Box} width="50" alt="" />
                                                                </div>
                                                                <div className="pdctname">
                                                                    <h5>Trans8</h5>
                                                                    <p>Weight:  {e?.dimension_weight}KG</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td align="left">
                                                            <div className="qntty">
                                                                <p>{e.tracking_number}</p>
                                                            </div>
                                                        </td>
                                                        <td align="center">
                                                            <div className="qntty">
                                                                <p>{"1"}</p>
                                                            </div>
                                                        </td>
                                                        <td align="right">
                                                            <div className="prce">
                                                                <p>$ {(parseFloat(e?.total_amount_without_tax)).toFixed(2)}</p>
                                                            </div>
                                                        </td>
                                                    </tr>)}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="4" align="right">
                                                        <b>Amount</b>
                                                    </td>
                                                    <td colSpan="4" align="right">
                                                        <b>$ {(parseFloat(data[0]?.total_amount_without_tax)*(data.length)).toFixed(2)}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" align="right">
                                                        <b>Tax (13%)</b>
                                                    </td>
                                                    <td colSpan="4" align="right">
                                                        <b>$ {(parseFloat(data[0]?.tax_amount)*(data.length)).toFixed(2)}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" align="right">
                                                        <b>Total Amount</b>
                                                    </td>
                                                    <td colSpan="4" align="right">
                                                        <b> $ {(parseFloat(data[0]?.total_amount_with_tax)*(data.length)).toFixed(2)}</b>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        </div>
                                    </Col>
                                </Row>
                                {loading && <Loader />}
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ViewOrderDetails
