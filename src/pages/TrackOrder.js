import React, { useState, useEffect } from "react";

import Box1 from "../assets/images-_1_.png";
import Loader from "../pages/Loader";
import moment from 'moment'
import {  Card } from 'react-bootstrap'
import { track_status } from '../api/updateQuote';

import { Steps } from 'antd';

const { Step } = Steps;
const steps = [
    {
        label: "Scheduled for pickup",
    },
    {
        label: "Shipment Arrived at trans8 Yard"
    },
    {
        label: "Out for Delivery",
    },
    {
        label: "Delivered",
    },
];

export default function TrackOrder() {
    const [loader, setLoader] = useState(false)
    const [data, setData] = React.useState(null)
    const [val, setVal] = React.useState("")
    const [currentStep, setCurrentStep] = useState(0)
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault();
        track_status(val, setData, setLoader, setType, setMessage)
    }

    let stepDescription =
        data?.customer_order_tracks?.map((e, i, v) => (
            <div>
                <div class="trcktable">
                    <div className="table-responsive">
                        <div className="rsponv">
                            <h4>{moment(e?.date, "YYYY-MM-DD").format("dddd")},{moment(e?.date, "YYYY-MM-DD").format("MMM DD, YYYY")}</h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{moment.utc(e?.created_at).format("HH:mm")}</td>
                                        {/* <td>{data.from_address}</td> */}
                                        <td>Depart at  {e?.warehouse_address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>))


    useEffect(() => {
        console.log("Data", data)
        data && setCurrentStep(data?.customer_order_tracks?.length || 0);
        window.scrollTo(0, 450)
    }, [data])


    return (
        <div>
            <div className="trackingpage">
                <div className="container">
                    {/* {(type==="error" || type==="success") && <Alertify  message={message} type={type}  setType={setType} />} */}
                    <Card className="card-style">
                        <Card.Body>
                            <div className="track-uper">
                                <Card.Title className="mb-4">
                                    <span className="title-thin">TRACK YOUR</span><span style={{ fontWeight: '400' }}> ORDER</span>
                                </Card.Title>
                                {/* <Card.Text>We'd love to discuss our flexible delivery solutions with you! provide your<br /> contact information and we'll reach out to you!
                                </Card.Text> */}
                                <form class="d-flex">
                                    <input
                                        class="form-control"
                                        type="search"
                                        placeholder="Search Order by Order Id / Tracking Id"
                                        aria-label="Search"
                                        onChange={(e) => setVal(prev => prev = e.target.value)}
                                    />
                                    <button className="trkListBtn" onClick={handleSubmit} type="submit">
                                        TRACK ORDER
                                    </button>
                                </form>
                            </div>

                            {data?.from_address &&
                                <div>
                                    <div className="delivertime-section">
                                        <img src={Box1} width="110" />

                                        <p>
                                            Delivery , {moment(data?.delivery_date).format("dddd")} <br />
                                            {moment(data?.delivery_date, "YYYY-MM-DD").format("MMM DD, YYYY")}
                                        </p>
                                    </div>
                                    <div className="shipm-hist">
                                        <h2>Shipment History</h2>
                                        <div class="d-flex">
                                            <span>
                                                <b>from</b>
                                                <p>
                                                    {data?.from_address}
                                                    <br />
                                                    {data?.from_city} , {data?.from_postal_code}
                                                </p>
                                            </span>
                                            <span>
                                                <b>To</b>
                                                <p>
                                                    {data?.to_address}
                                                    <br />
                                                    {data?.to_city},{data?.to_postal_code}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                    {data?.customer_order_tracks.length > 0 ? <Steps direction="vertical" current={currentStep}>
                                        {data?.customer_order_tracks.length > 0 && data?.customer_order_tracks?.map((e, i, v) => 
                                        <Step title={
                                            e.order_status==="pickup" ? "Scheduled for pickup":
                                            e.order_status==="arrived at trans8 yard" ?"Shipment Arrived at trans8 Yard":
                                            e.order_status==="out for delivery" ?"Out for Delivery":
                                            e.order_status==="delivered" &&"Delivered"
                                            } description={stepDescription[i]} />)}
                                    </Steps> : <h6 style={{ color: '#707070' }}>We will ship your order soon and share the tracking status with you.</h6>}
                                </div>
                            }
                            {!data?.from_address && (val !== "" && <h6 style={{ color: '#707070' }}>Sorry, tracking status not found</h6>)}
                            {/* {!data?.from_address && (val !== "" && "Sorry no tracking status found .")} */}
                            {loader && <Loader />}
                        </Card.Body>
                    </Card>

                </div>
            </div>

        </div>

    );
}
