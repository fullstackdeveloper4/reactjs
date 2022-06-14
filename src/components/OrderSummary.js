import React, { useState, useEffect } from "react";
import { Button, Card, Form, Col, Row, Alert } from "react-bootstrap";
import { order_summary, confirm_status } from "../api/Order/OrderListing.js";
import { useHistory } from "react-router";
import moment from 'moment'
import Loader from "../pages/Loader.js";
import { useSelector,useDispatch } from "react-redux";
import { setQuoteDetails } from "../redux/Actions/authAction.js";
import { dimension_weight_price } from "../api/updateQuote.js";
const OrderSummary = () => {
 
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const [price_tax , setPrice_tax] = useState([])
  const history = useHistory()
  const price = useSelector(state => state.auth.quoteDetail)
  const dispatch = useDispatch()
  const checkOrderStatus = (e) => {
    let status = {}
    if (e === "complete") {
      status = {
        order_id: data.orderid[0],
        status: "complete"
      }
      confirm_status(status, setLoader , history , "complete")
      dispatch(setQuoteDetails({}))
      
    } else {
      status = {
        order_id: data?.orderid[0],
        status: "cancel"
      }
      confirm_status(status, setLoader , history , "cancel")
      dispatch(setQuoteDetails({}))
    }
  }


  useEffect(() => {
    dimension_weight_price(setPrice_tax)
    order_summary(setData, setLoader,)
    sessionStorage.removeItem("last_route")
  }, [])
  return (
    <div>
      <div className="main_order">
        <div className="hr_top"></div>

        <div className="oder_date">
          <div className="vr">
            <p className='text_color'>Order</p>
            <p className="date">{moment.utc(data?.created_at).utcOffset("-0500").format("MMM DD , YYYY")} , {moment.utc(data?.created_at).utcOffset("-0500").format("HH:mm")}</p>
          </div>

          <div className="vr">
            <p className='text_color'>Pickup</p>
            <p className="date">{moment(data?.pickup_date,"YYYY-MM-DD").format("MMM DD , YYYY")} , {moment(data?.pickup_time,"HH:mm:ss").format("HH:mm")}</p>
          </div>

          <div>
            <p className='text_color'>Delivery</p>
            <p className="date">{moment(data?.delivery_date,"YYYY-MM-DD").format("MMM DD , YYYY")}</p>
          </div>
        </div>
        <div className="hr"></div>

        <div></div>
        <div className="oder_number">
          <div className='text_color'>Order Id</div>
          <div>:</div>
          <div className="date">{data?.orderid?.map(e => e)}</div>
        </div>
        <div className="hr"></div>

        <div className="oder">
          <div className='text_color'>No of Packages</div>
          <div>:</div>
          <div className="total">{data?.count}</div>
        </div>
        <div className="hr"></div>

        {/* <div className="oder">
        <div  className='text_color'>Delivery Charges</div>
        <div>:</div>
        <div className="total">{data?.price}/-</div>
      </div> */}
      <div className="bgtotal">
        <div className="total_oder">
          <div>Amount</div>
          <div className="total2">$ {parseFloat(data?.price).toFixed(2)}</div>
        </div>
       <div className="total_oder">
          <div>Tax (13%)</div>
          <div className="total2">$ {(parseFloat(data?.price)*parseFloat(price_tax.tax_percentage)/100).toFixed(2)}</div>
        </div>
        <div className="total_oder">
          <div>Total Amount</div>
          <div className="total2">$ {(parseFloat(data?.price)+(parseFloat(data?.price)*13/100)).toFixed(2)}</div>
        </div>
      </div>
        <Form.Group as={Row}>
          <Col sm={{ span: 6 }}>
            <button className="cancel_button" onClick={() => checkOrderStatus("cancel")} type="button">
              Cancel Order
            </button>
          </Col>
          <Col sm={{ span: 6 }}>
            <button className="pay_button" onClick={() => checkOrderStatus("complete")} type="button">
              Confirm Order
            </button>
          </Col>
        </Form.Group>
      </div>
      {
        loader && <Loader />
      }
    </div>
  );
};

export default OrderSummary;
