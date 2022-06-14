import React, { useState ,useEffect} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Card, Col, Row } from "react-bootstrap";
import {  resetPassword } from "../api/ForgotPassword/ForgotPassword";
import Loader from "./Loader";
import Alertify from "./Alertify";
const ResetPasswordPage = (props) => {
  const [type , setType]= useState("")
  const [message , setMessage]= useState("")
  const [loading, setLoading] = useState(false);
  let location=window.location.pathname
  let url_token=location.split("/")[2]
  // let url_email=location.split("/")[3]/
  console.log(location)
  const onFinish = (values) => {
    // Object.assign(values , {customid:url_email})
    Object.assign(values , {customid:url_token})
    resetPassword(values, setLoading , props.history,setType, setMessage);
    console.log(values, "api hit");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    window.scrollTo(0,445)
  },[])
  return (
    <div>
      <div className="loginpage-section forgotpage resetpass-page">
        <Card className="container">
        {(type==="error" || type==="success") && <Alertify  message={message} type={type}  setType={setType} />}
          <Card.Body>
            <div className="text-center login-box">
              <div className="login-text">
                <Card.Title className="mb-4">
                  <span className="title-thin">{"RESET "}</span>
                  <span style={{fontWeight: '500'}}>{"PASSWORD"}</span>
                  
                  
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
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      labelCol={{ span: 16 }}
                      wrapperCol={{ span: 20 }}
                      label="New Password:"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                        {
                        min:6,
                        message:"Password length must be greater than 6"
                        }
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder="Enter your new password" />
                    </Form.Item>
                    <Form.Item
                    name="password_confirmation"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("New password and confirm password doesn't match"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password  placeholder="Enter your confirm password"/>
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
                        Submit
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

export default ResetPasswordPage;
