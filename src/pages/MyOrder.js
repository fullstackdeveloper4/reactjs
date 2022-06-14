import React, { useState, useEffect } from "react";
import { Card , Button } from "react-bootstrap";
import Box from "../assets/images-_1_.png";
import { Link } from "react-router-dom";
import { active_order_Listing } from "../api/Order/OrderListing";
import Loader from "../pages/Loader";
import moment from "moment";

import { EyeOutlined } from '@ant-design/icons';

const MyOrder = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaders, setLoaders] = useState(false);
  const [searchId , setSearchId] = useState("")
  const [loadmore , setLoadmore] = useState(5)
  
  const getOrder=(e)=>{
    e.preventDefault()
    active_order_Listing(setData, setLoader , searchId)
    
  }

  const ids = data.map(o => o.order_id)
  const filtered = data.filter(({order_id}, index) => !ids.includes(order_id, index + 1))

  // let uniqueData= data.filter((e ,index ,data)=>{
  //   return e.order_id===data[index].order_id
  // })

  const handleChange=(e)=>{
    setSearchId(e.target.value)
  }

  const loadmore_function=()=>{
    setLoadmore(loadmore+5)
  }

  useEffect(() => {
    active_order_Listing(setData, setLoader , searchId)
  }, []);

  return (
    <div className="Orderpage-section">
    <div className="container">
      <Card className="heading">
        <Card.Body>
          <div className="orderpage-upper">
            <Card.Title className="register-title">
              {window.location.pathname==="/order-history" ?<div><span className="title-thin">ORDER</span> HISTORY</div>: <div><span className="title-thin">MY</span> ORDER</div>}
            </Card.Title>
            {/* <Card.Text>
              It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
            </Card.Text> */}

            <form class="d-flex">
              <input
                class="form-control"
                type="search"
                placeholder="Search your oder here"
                aria-label="Search"
                onChange={handleChange}
              />
              <button className="oderListBtn" onClick={getOrder} type="submit">
                SEARCH ODER
              </button>
            </form>
          </div>
          {!loader &&
          filtered.length>=1 ?
          <>
          {
            filtered?.slice(0,loadmore).map((e, i) => (
               
              <div className="box">
                <div className="table-responsive" key={`order${i}`}>
                  <table>
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
                                <span>Order Number:</span> {e?.order_id}
                              </p>
                              <p>
                                <span>Shipper:</span> Trans8
                              </p>
                              <p>
                                <span>Weight:</span> {e?.dimension_weight}Kg .
                              </p>
                            </div>
                          </td>
                          <td align="right">
                            <div className="order-dte">
                              <p>
                                Delivered on <br />
                                {moment(e?.delivery_date,'YYYY-MM-DD').format('MMM DD , YYYY')}
                              </p>
                            </div>
                          </td>
                        </tr>
                      }
                      <tr>
                        <td colSpan="1"></td>
                        <td>
                          <div className="odr-detail">
                            <Link to={`/order-details/${e.order_id}`} >
                            <EyeOutlined />
                              View order Details
                            </Link>
                            {loaders && <Loader />}
                          </div>
                        </td>
                        <td align="right">
                          <div className="odr-sttus sts-green">
                             {e?.status==="active" && e?.oder_delivered==="not-delivered" && "Order not delivered"}
                             {e?.status==="active" && e?.oder_delivered==="delivered" && "Order delivered"}
                             {e?.status==="inactive" && "Order not confirmed"}
                             {e?.status==="cancel" && "Order Cancelled"}                                
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>   
            ))}
            {loadmore<filtered.length && <Button className="btn btn-info mt-3 lodmr-btn" onClick={loadmore_function}>Load more</Button>} 
            </>
            :(searchId==="" ? <h6 style={{color: '#707070'}}>Sorry, you have booked no freight yet</h6>: <h6 style={{color: '#707070'}}>Sorry no order found</h6>)}
          {loader && <Loader />}
        </Card.Body>
      </Card>
    </div>
  </div>
  );
};

export default MyOrder;

// for unique check from objects
// const ids = array.map(o => o.id)
// const filtered = array.filter(({id}, index) => !ids.includes(id, index + 1))