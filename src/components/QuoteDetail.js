import React ,{useEffect , useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, Card } from "react-bootstrap";
import Discover_Network from "../assets/Discover_Network.png";
import American_Express from "../assets/American_Express.png";
import Master from "../assets/Master.png";
import Visa from "../Visa.png";
import '../styles/quote.css'
import { withRouter } from "react-router";
import { setPageLoader } from "../redux/Actions/authAction";
import { dimension_weight_price, updateQuote } from "../api/updateQuote";
import moment from "moment";


const QuoteDetail = (props) => {
  const quoteDetail = useSelector(state => state.auth.quoteDetail);
  const cardDetail = useSelector(state => state.auth.cardDetail)
  const [price_tax , setPrice_tax] = useState([])
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  console.log(quoteDetail, "quoteDetail1")

  const handleContinue = () => {
    if(!quoteDetail?.from_city || !quoteDetail?.from_province || !quoteDetail?.from_postal_code ||!quoteDetail?.to_city || !quoteDetail?.to_province || !quoteDetail?.to_postal_code ){
    }
    dispatch(setPageLoader(true))
    sessionStorage.setItem("last_route" , window.location.pathname)
    // const lastRoutePath = sessionStorage.getItem("lastRoutePath" )
      if (token) {
        if(sessionStorage.getItem("customer_ids")){
          updateQuote()
          if(cardDetail?.card_number){
            props.history.push('/current-order')  
          }else{
          props.history.push('/update-info');}} 
      }
      else{
        props.history.push('/login');
      }
      dispatch(setPageLoader(false))
  }

useEffect(() => {
  dimension_weight_price(setPrice_tax)
}, [])
  return (
    <div className="shipping-box">
      <Card>
        <Card.Body className="shpng-date">
         <h4>SHIPMENT DATE</h4>
          <span className="d-block text-capitalize font-weight-bold">
            {/* 8th OCT 2021 */}
            <span> {moment(quoteDetail?.pickup_date,'DD MM YYYY').format('MMM DD, YYYY')} , {quoteDetail?.pickup_time}</span>
          </span>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row className="mt-5">
            <Col md={4} className="">
              <div className="estimate-dlivry">
              <h4>ESTIMATED DELIVERY</h4>
              <span className="d-block text-capitalize font-weight-bold">
    
               <span> {moment(quoteDetail?.delivery_date,'DD MM YYYY').format('MMM DD , YYYY')}</span>
              </span>
              </div>
            </Col>
            <Col md={4}>
              <div className="paymentType_logo">
                <img src={Visa} width="30" height="25" />
                <img src={Master} width="30" height="25" />
                <img src={Discover_Network} width="30" height="25" />
                <img src={American_Express} width="30" height="25" />
              </div>
            </Col>
            <Col md={4}>
            <div className="includ-tx">
                <span className="text-capitalize gst-txt">
                  Amount
                </span>
                <span className="text-capitalize font-weight-bold price-txt">
                  $ {quoteDetail && `${(parseFloat(quoteDetail?.price)*(quoteDetail?.quantity)).toFixed(2)}`}
                </span>
              </div>
             
            <div className="includ-tx">
                <span className="text-capitalize gst-txt">
                  Tax (13%)
                </span>
                <span className="text-capitalize font-weight-bold price-txt">
                  $ {quoteDetail && `${(parseFloat(price_tax.price)*parseFloat(price_tax.tax_percentage)*quoteDetail.quantity/100).toFixed(2)}`}
                </span>
              </div>
              <hr />
              <div className="includ-tx totalprice">
                <span className="text-capitalize gst-txt">
                  Total Amount
                </span>
                <span className="text-capitalize font-weight-bold price-txt">
                  {quoteDetail && `$ ${(((parseFloat(price_tax.price)*parseFloat(price_tax.tax_percentage)/100)+parseInt(price_tax.price))*parseInt(quoteDetail.quantity)).toFixed(2)}`}
                </span>
              </div>
              <Button type="button" className="theme-blue w-100 mt-2" onClick={ handleContinue}>Continue To Booking</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default withRouter(QuoteDetail);
