import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row, Alert } from 'react-bootstrap';
import { registerCustomerAPI } from "../api/authApi";
import { withRouter } from "react-router-dom";


const PaymentInfo = (props) => {
  const [formState, setFormState] = useState({
    card_number: "",
    name_on_card: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState({
    card_number: "",
    name_on_card: "",
    expiry: "",
    cvv: "",
  });

  const onChange = (e, type) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [type]: value,
    })
  }

  const validate = () => {
    const { card_number, name_on_card, expiry,cvv } = formState;
    setError({
      ...error,
      card_number: !card_number ? "Card_number is required!" : "",
      name_on_card: !name_on_card ? "Name_on_card is required!" : "",
      expiry: !expiry ? "Expiry is required!" : "",
      cvv: !cvv ? "Cvv is required!" : "",
    })
    if ((card_number && name_on_card && expiry,cvv) && 
      (!error.card_number && !error.name_on_card && !error.expiry && !error.cvv)){
      return true
    } else {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      registerCustomerAPI(formState).then(response => {
        if (response && response.data) {
          sessionStorage.setItem('token', response.data.data.token);
          toast.success(response.data.data.message, {
            theme: "colored"
          });
          setTimeout(() => {
            props.history.push('/');
          }, 1000)
        }
      }).catch(err => {
        toast.error(err.response.data.message, {
          theme: "colored"
        });
      });
    }
  }

  useEffect(() => {
    const usertoken = sessionStorage.getItem("token");
    if (usertoken) {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
        <Card className="text-center border-0">
          <Card.Body>
            <Card.Title className="register-title"><span className="title-thin">{"PAYMENT "}</span>
            <span className=""> INFO</span></Card.Title>
            {/* <Card.Text>
              <div className="register-subtitle">
                We'd love to discuss our flexible delivery solutions with you! provide your contact information and we'll reach out to you!
              </div>
            </Card.Text> */}
            <div className="register-form">
            {/* <div className="logo">
              <img src={Visa} width="30" height="25" />
              <img src={Master} width="30" height="25" />
              <img src={Discover_Network} width="30" height="25" />
              <img src={American_Express} width="30" height="25" />
            </div> */}
            
              <Form >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column className="text-left">
                    {/* <span className="title-text">REGISTRATION INFORMATION</span> */}
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                    Card Number
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["card_number"] ? "error-border" : ""} type="text" placeholder="123456789456"  defaultValue={formState && formState['card_number']} onChange={(e) => onChange(e, "card_number")} />
                    {error && error["card_number"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["card_number"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                    Name on card
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["name_on_card"] ? "error-border" : ""} type="text" placeholder="JOHN DOE" defaultValue={formState && formState['name_on_card']} onChange={(e) => onChange(e, "name_on_card")} />
                    {error && error["name_on_card"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["name_on_card"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                    Expiry/CVV
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control className={error && error["expiry"] ? "error-border" : ""} type="text" placeholder="01/21" defaultValue={formState && formState['expiry']} onChange={(e) => onChange(e, "expiry")} />
                    {error && error["expiry"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["expiry"]}
                    </Alert> : ""}
                  </Col>
                  <Col sm={3}>
                    <Form.Control className={error && error["cvv"] ? "error-border" : ""} type="text" placeholder="..." defaultValue={formState && formState['cvv']} onChange={(e) => onChange(e, "cvv")} />
                    {error && error["cvv"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["cvv"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Col sm={{ span: 6, offset: 4 }}>
                    <Button type="button" variant="info" className="w-100 light-blue-bg" onClick={handleSubmit}>Submit</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
  )
}

export default withRouter(PaymentInfo);
