import React, { useState, useEffect} from "react";
import { Form, Input, Button, } from "antd";
import { Card, Col, Row } from "react-bootstrap";
import { forgotPassword } from "../api/ForgotPassword/ForgotPassword";
import Loader from "./Loader";
import Alertify from "./Alertify";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  const [type , setType]= useState("")
  const [message , setMessage]= useState("")
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    forgotPassword(values, setLoading,setType,setMessage);
    window.scrollTo(0,70)
  };

  useEffect(() => {
    window.scrollTo(0,450)
  },[])

  const onFinishFailed = (errorInfo) => {
  };
  return (
    <div>
      <div className="loginpage-section forgotpage">
        <Card className="container">
        {(type==="error" || type==="success") && <Alertify  message={message} type={type}  setType={setType} />}
          <Card.Body>
            <div className="text-center login-box">
              <div className="login-text">
                <Card.Title className="mb-4">
                  <span className="title-thin">{"FORGOT "}</span>
                  <span className="">{"PASSWORD"}</span>
                </Card.Title>
                {/* <Card.Text>
                  We'd love to discuss our flexible delivery solutions with you!
                  provide your contact information and we'll reach out to you!
                </Card.Text> */}
              </div>
              <Row>
                <Col md={12} lg={12} sm={12}>
                  <Form
                    className="mt-3"
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      labelCol={{ span: 16 }}
                      wrapperCol={{ span: 20 }}
                      label="Email:"
                      className="mb-full"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email!",
                        },
                        {
                          pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
                          message: "Please enter a valid email"
                        },
                      ]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item as={Row}>
                      <Col md={{ span: 10, offset: 2 }}>
                        <div className="doyou-account">
                          Already member?
                          <span className="cursor-pointer"> 
                          <Link to="/login" style={{color: "black" }}> Login</Link>
                          </span>
                        </div>
                      </Col>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                        htmlType="submit"
                        className="w-100 theme-blue btn btn-primary"
                      >
                        Forgot Password
                      </Button>
                    </Form.Item>
                  </Form>
                  {loading && <Loader />}
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
