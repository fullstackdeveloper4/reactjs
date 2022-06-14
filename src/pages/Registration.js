import React, { useEffect, useState } from "react";
import { Card, Col, Row, Alert } from "react-bootstrap";
import { Form, Input, Button } from "antd";
import { registerCustomerAPI } from "../api/authApi";
import { withRouter } from "react-router-dom";
import { checkValidEmail, isNumber, isString } from "../common/utils";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import Loader from "./Loader";
import Alertify from "./Alertify";
import { Link } from "react-router-dom";
import { user_registration } from "../api/registration";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const ROOT_CSS = css({
  height: "-400px",
  width: "100%",
});



const Registration = (props) => {
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const quoteDetail = useSelector(state => state.auth.quoteDetail)
  // const history= useHistory()
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    c_password: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    c_password: "",
  });

  const onFinish = (values) => {
    user_registration(values, setType, setMessage, history, setLoading, quoteDetail)
  };

  const onFinishFailed = (errorInfo) => {
  };

  const onChange = (e, type) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [type]: value,
    });
  };

  const validate = () => {
    const { first_name, last_name, email, phone_number, password, c_password } =
      formState;
    setError({
      ...error,
      first_name: !first_name
        ? "First name is required!"
        : !isString(first_name)
          ? "First name should be text only!"
          : "",
      last_name: !last_name
        ? "Last name is required!"
        : !isString(first_name)
          ? "Last name should be text only!"
          : "",
      email: !email
        ? "Email is required!"
        : !checkValidEmail(email)
          ? "Email is invalid!"
          : "",
      phone_number: !phone_number
        ? "Phone number is required!"
        : !isNumber(phone_number)
          ? "Phone number should be number!"
          : phone_number.toString().length === 10
            ? ""
            : "Phone number must be 10 digits!",
      password: !password ? "Password is required!" : "",
      c_password: !c_password
        ? "Please confirm your password!"
        : password !== c_password
          ? "Password does not match!"
          : "",
    });
    if (
      first_name &&
      last_name &&
      email &&
      phone_number &&
      password &&
      c_password &&
      !error.first_name &&
      !error.last_name &&
      !error.email &&
      !error.phone_number &&
      !error.password &&
      !error.c_password
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      registerCustomerAPI(formState)
        .then((response) => {
          if (response && response.data) {
            sessionStorage.setItem("token", response.data.data.token);
            setType("success")
            setMessage("Customer register successfully")
            // toast.success("Customer register successfully", {
            //   theme: "colored",
            // });
            setLoading(false);
            setTimeout(() => {
              props.history.push("/");
            }, 1000);
          }
        })
        .catch((err) => {
          setLoading(false);
          setType("error")
          setMessage(err.response.data.message)
          // toast.error(err.response.data.message, {
          //   theme: "colored",
          // });
        });
    }
  };

  const gotoLogin = () => {
    props.history.push("/login");
  };

  useEffect(() => {
    const usertoken = sessionStorage.getItem("token");
    if (usertoken) {
      props.history.push("/");
    }
  }, []);

  return (
    <div>

      <ScrollToBottom className={ROOT_CSS}>
        <div className="loginpage-section registrpage-section">
          <Card className="container">
            {(type === "error" || type === "success") && <Alertify message={message} type={type} setType={setType} />}
            <Card.Body>
              <div className="text-center login-box mb-5">
                <div className="login-text">
                  <Card.Title className="mb-4">
                    <span className="title-thin">{"USER "}</span>
                    <span className="">REGISTRATION</span>
                  </Card.Title>
                  {/* <Card.Text>
                    We'd love to discuss our flexible delivery solutions with
                    you! provide your contact information and we'll reach out
                    to you!
                  </Card.Text> */}
                </div>
                <Form
                  className="mt-3"
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="First name"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z ]*$/),
                        message: "Please enter a valid Name"
                      },

                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z ]*$/),
                        message: "Please enter a valid last Name"
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
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
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    className="mb-full"
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number!",
                      },
                      {
                        min: 10,
                        max: 11,
                        message: "Phone number at least have 10 and maximum 11 digit"
                      }
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                      {
                        min: 6,
                        message: "Password length must be greater than 6"
                      }
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>


                  <Form.Item
                    name="c_password"
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

                          return Promise.reject(new Error("Password and confirm password doesn't match"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item as={Row}>
                    <Col md={{ span: 10, offset: 2 }}>
                      <div className="doyou-account">
                        Already member?
                        <span className="cursor-pointer">
                          <Link to="/login" style={{ color: "black" }}> Login</Link>
                        </span>
                      </div>
                    </Col>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      span: 24,
                    }}
                  >
                    <Button type="primary" htmlType="submit" className="w-100 theme-blue btn btn-primary">
                      Registration
                    </Button>
                  </Form.Item>
                </Form>
            
              </div>
            </Card.Body>
          </Card>
        </div>
      </ScrollToBottom>
      {
        loading && <Loader />
      }
    </div>
  );
};

export default withRouter(Registration);
