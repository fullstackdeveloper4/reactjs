import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row, Alert } from 'react-bootstrap';
import { registerCustomerAPI } from "../api/authApi";
import { withRouter } from "react-router-dom";
import { checkValidEmail, isNumber, isString } from "../common/utils";

const UpdateUser = (props) => {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address:"",
    city:"",
    province:"",
    postal:"",
    country: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address:"",
    city:"",
    province:"",
    postal:"",
    country: "",
  });

  const onChange = (e, type) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [type]: value,
    })
  }

  const validate = () => {
    const { first_name, last_name, phone_number,email,address,city,province,postal, country} = formState;
    setError({
      ...error,
      first_name: !first_name ? "First name is required!" : (!isString(first_name) ? "First name should be text only!": "" ),
      last_name: !last_name ? "Last name is required!" : (!isString(first_name) ? "Last name should be text only!": "" ),
      phone_number: !phone_number ? "Phone number is required!" : (!isNumber(phone_number) ? "Phone number should be number!" : (phone_number.toString().length === 10 ? "": "phone number must be 10 digits!")),
      email: !email ? "Email is required!" : (!checkValidEmail(email) ? "email is invalid!" : ""),
      address: !address ? "Address is required!" : "",
      city: !city ? "City is required!" : "",
      province: !province ? "Province is required!" : "",
      postal: !postal ? "Postal is required!" : "",
      country: !country ? "Country is required!" : "",
    })
    if ((first_name && last_name && phone_number && email && address && city && province && postal && country) && 
      (!error.first_name && !error.last_name &&  !error.phone_number && !error.email && !error.address && !error.city && !error.province && !error.postal && !error.country)){
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
          setTimeout(() => {
            props.history.push('/');
          }, 1000)
        }
      }).catch(err => {
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
      <div className="shadow p-3 mb-5 bg-white rounded-top">
        <Card className="text-center border-0">
          <Card.Body>
            <Card.Title className="register-title"><span className="title-thin">{"UPDATE  "}</span><span className="">ACCOUNT INFO</span></Card.Title>
            <Card.Text>
              <div className="register-subtitle">
                We'd love to discuss our flexible delivery solutions with you! provide your contact information and we'll reach out to you!
              </div>
            </Card.Text>
            <div className="register-form">
              <Form >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column className="text-left text-dark">
                  {/* <span className="">ACCOUNT INFO</span> */}
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    First Name
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["first_name"] ? "error-border" : ""} type="text" placeholder="First Name" defaultValue={formState && formState['first_name']} onChange={(e) => onChange(e, "first_name")} />
                    {error && error["first_name"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["first_name"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Last Name
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["last_name"] ? "error-border" : ""} type="text" placeholder="Last Name" defaultValue={formState && formState['last_name']} onChange={(e) => onChange(e, "last_name")} />
                    {error && error["last_name"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["last_name"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Phone
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["phone_number"] ? "error-border" : ""} type="text" placeholder="Phone" defaultValue={formState && formState['phone_number']} onChange={(e) => onChange(e, "phone_number")} />
                    {error && error["phone_number"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["phone_number"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Email
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["email"] ? "error-border" : ""} type="email" placeholder="Email" defaultValue={formState && formState['email']} onChange={(e) => onChange(e, "email")} />
                    {error && error["email"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["email"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Address
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["address"] ? "error-border" : ""} type="text" placeholder="Enter address" defaultValue={formState && formState['address']} onChange={(e) => onChange(e, "address")} />
                    {error && error["address"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["address"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    City
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["city"] ? "error-border" : ""} type="text" placeholder="Enter city" defaultValue={formState && formState['city']} onChange={(e) => onChange(e, "city")} />
                    {error && error["city"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["city"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Province
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control className={error && error["province"] ? "error-border" : ""} type="text" placeholder="Province" defaultValue={formState && formState['province']} onChange={(e) => onChange(e, "province")} />
                    {error && error["province"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["province"]}
                    </Alert> : ""}
                  </Col>
                  <Col sm={3}>
                    <Form.Control className={error && error["postal"] ? "error-border" : ""} type="text" placeholder="Postal" defaultValue={formState && formState['postal']} onChange={(e) => onChange(e, "postal")} />
                    {error && error["postal"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["postal"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3} className="text-left text-dark">
                    Country
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["country"] ? "error-border" : ""} type="text" placeholder="Country" defaultValue={formState && formState['country']} onChange={(e) => onChange(e, "country")} />
                    {error && error["country"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["country"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Col sm={{ span: 6, offset: 3 }}>
                <Button type="button" variant="info" className="w-100 light-blue-bg" onClick={handleSubmit}> Update Information</Button>
                </Col>
              </Form.Group>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
  )
}

export default withRouter(UpdateUser);
