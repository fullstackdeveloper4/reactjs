import React,{useEffect , useState} from "react";
import OrderSummary from "../components/OrderSummary";
import PaymentCard from "./PaymentCard";
import { Button, Card, Form, Col, Row, Alert } from "react-bootstrap";
import { useDispatch  } from 'react-redux'
import { get_card_list } from '../api/userUpdate'
import Alertify from './Alertify'
const PaymentMethod = () => {
  const [type , setType]= useState("")
  const [message , setMessage]= useState("")
  const [loading , setLoading] = useState(false)
  const dispatch =  useDispatch()
    useEffect(() => {
        get_card_list(dispatch ,setLoading,)
  }, [])  
  return (
      <div className="paymentmethod-page">
        <div className="container">
        {(type==="error" || type==="success") && <Alertify  message={message} type={type}  setType={setType} />}
          <Card>
            <Card.Body>
              <Card.Title className="titlemn">
                <span className="title-thin">{"BILLING "}</span>
                DETAILS
              </Card.Title>
              {/* <Card.Text>
                  We'd love to discuss our flexible delivery solutions with
                  you! provide your contact information and we'll reach out to
                  you!
              </Card.Text> */}
              <Row className="row pymethod-divide">
                <Col md="12">
                  <h2 style={{color: '#707070',}}>
                    ORDER SUMMARY
                  </h2>
                  <OrderSummary setMessage={setMessage} setType={setType} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
  )
};

export default PaymentMethod;
