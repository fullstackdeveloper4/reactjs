import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row, Alert } from 'react-bootstrap';
import { registerCustomerAPI } from "../api/authApi";
import { withRouter } from "react-router-dom";
import { isNumber, isString } from "../common/utils";

const UpdatePassword = (props) => {
  const [formState, setFormState] = useState({
    c_password: "",
    n_password: "",
    r_password: "",
  });

  const [error, setError] = useState({
    c_password: "",
    n_password: "",
    r_password: "",
  });

  const onChange = (e, type) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [type]: value,
    })
  }

  const validate = () => {
    const { c_password, n_password, r_password } = formState;
    setError({
      ...error,
     
      c_password: !c_password ? "Password is required!" : "",
      n_password: !n_password ? "Password is required!" : "",
      r_password: !r_password ? "Please confirm your password!" : (r_password !== r_password ? "Password does not match!" : ""),
    })
    if ((c_password && n_password && r_password) && 
      (!error.c_password && !error.n_password && !error.r_password)){
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
    <div className="shadow p-3 mb-5 bg-white rounded">
        <Card className="text-center border-0">
          <Card.Body>
            <Card.Title className="register-title"><span className="title-thin">{"UPDATE "}</span><span className="">ACCOUNT INFO</span></Card.Title>
            {/* <Card.Text>
              <div className="register-subtitle">
                We'd love to discuss our flexible delivery solutions with you! provide your contact information and we'll reach out to you!
              </div>
            </Card.Text> */}
            <div className="register-form">
              <Form >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column className="text-left">
                    {/* <span className="title-text">REGISTRATION INFORMATION</span> */}
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                    Current Password
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["c_password"] ? "error-border" : ""} type="text" placeholder="Enter your old password" defaultValue={formState && formState['c_password']} onChange={(e) => onChange(e, "c_password")} />
                    {error && error["c_password"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["c_password"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                   New Password
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["n_password"] ? "error-border" : ""} type="text" placeholder="Enter new password" defaultValue={formState && formState['n_password']} onChange={(e) => onChange(e, "n_password")} />
                    {error && error["n_password"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["n_password"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} className="text-left text-dark">
                    Retype Password
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control className={error && error["r_password"] ? "error-border" : ""} type="text" placeholder="Re-type new password" defaultValue={formState && formState['r_password']} onChange={(e) => onChange(e, "r_password")} />
                    {error && error["r_password"] ? <Alert className="mt-2 p-0" variant={'danger'}>
                      {error["r_password"]}
                    </Alert> : ""}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ span: 6, offset: 4 }}>
                    <Button type="button" variant="info" className="w-100 light-blue-bg" onClick={handleSubmit}> Update Password</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
  )
}

export default withRouter(UpdatePassword);
