import React, { useEffect, useState } from "react";
import { Card, Col, Row, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAutoCompleteAddressAPI } from "../api/authApi";
import Loader from "./Loader";
import Alertify from "./Alertify";
import { checkValidEmail } from "../common/utils";
import { setPageLoader, setQuoteDetails } from "../redux/Actions/authAction";
import { updateQuote } from "../api/updateQuote";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { user_login } from "../api/registration";
import { useHistory } from "react-router";


const Login = (props) => {
  const dispatch = useDispatch();
  const usertoken = sessionStorage.getItem("token");
  const quoteDetail = useSelector((state) => state.auth.quoteDetail);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [logVal , setLogVal] = useState(
    {
      email: "",
      password: "",
    }
  )
  const history = useHistory()

  const onFinish = (values) => {
    user_login(values, setLoading, setType, setMessage, quoteDetail, history)
  };

  const onFieldsChange=(values)=>{
    // setLogVal(values)
  }

  const onValuesChange=(values , val)=>{
    if(localStorage.getItem("user")){
      localStorage.setItem("user", JSON.stringify(val));
    }
    setLogVal(val)
  }
  const onFinishFailed = (errorInfo) => {
  };

  // const onChange = (e, type) => {
  //   const { value } = e.target;
  //   setFormState({
  //     ...formState,
  //     [type]: value,
  //   });
  // };

  // const validate = () => {
  //   const { email, password } = formState;
  //   setError({
  //     ...error,
  //     email: !email
  //       ? "Email is required!"
  //       : !checkValidEmail(email)
  //         ? "Email is invalid!"
  //         : "",
  //     password: !password ? "Password is required!" : "",
  //   });
  //   if (email && password && !error.email && !error.password) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const handleSubmit = () => {
  //   const customerIdList =
  //     JSON.parse(sessionStorage.getItem("customer_ids")) || [];
  //   const customerIds = customerIdList.length
  //     ? customerIdList.map((it) => {
  //       return { id: it };
  //     })
  //     : [];
  //   if (validate()) {
  //     setLoading(true);
  //     dispatch(setPageLoader(true));
  //     loginCustomerAPI(formState)
  //       .then((response) => {
  //         if (response && response.data) {
  //           sessionStorage.setItem("token", response.data.data.token);
  //           dispatch(setPageLoader(false));
  //           // dispatch(setQuoteDetails({}));
  //           setLoading(false);
  //           if (quoteDetail.from_address) {
  //             props.history.push("/quotes");
  //           } else {
  //             props.history.push("/dashboard");
  //           }

  //           setType("success")
  //           window.scrollTo(0, 500)
  //           setMessage(response.data.message)
  //           window.scrollTo(0, 500)
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setType("error")
  //         window.scrollTo(0, 480)
  //         if (err?.response?.data) {
  //           setMessage(err.response.data.message)
  //         }
  //         else {
  //           setMessage("No Internet Connection")
  //         }
  //         window.scrollTo(0, 480)
  //         // toast.error(err.response.data.message, {
  //         //   theme: "colored",
  //         // });
  //       });
  //   }
  // };

  useEffect(() => {
    window.scrollTo(0, 445)
  }, [])

  const gotoPasswords = () => {
    props.history.push("/forgot-password");

  };

  const gotoSignUP = () => {
    props.history.push("/registration");
    window.scrollTo(0, 500)
  };

  const handleCheck = (e) => {
    const data = {
      email: formState.email,
      password: formState.password,
    };
    if (e.target.checked) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

  const checkChange = (e) => {
     if(e.target.checked===false){
       localStorage.removeItem("user")
     }
     else{
      localStorage.setItem("user", JSON.stringify(logVal))
     }
  }

  const getMap = () => {
    getAutoCompleteAddressAPI();
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      formState.email = JSON.parse(localStorage.getItem("user"))?.email
      formState.password = JSON.parse(localStorage.getItem("user"))?.password
      setFormState(formState)
    }
  }, [])
  // shadow bg-white rounded-top
  return (
    <div>
      <div className="loginpage-section registrpage-section">
        <Card className="container">
          {(type === "error" || type === "success") && <Alertify message={message} type={type} setType={setType} />}

          <Card.Body>
            <div className="text-center login-box">
              <div className="login-text">
                <Card.Title className="mb-4">
                  <span className="title-thin">{"USER "}</span>
                  <span className="">{"LOGIN"}</span>
                </Card.Title>
                {/* <Card.Text>
                  We'd love to discuss our flexible delivery solutions with
                  you! provide your contact information and we'll reach out to
                  you!
                </Card.Text> */}
              </div>
              <Form
                name="basic"
                labelCol={{ span: 6, }}
                wrapperCol={{ span: 24, }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                  email: JSON.parse(localStorage.getItem("user"))?.email,
                  password: JSON.parse(localStorage.getItem("user"))?.password
                }}
                onFieldsChange={onFieldsChange}
                onValuesChange={onValuesChange}
              >
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
                >
                  <Input.Password />
                </Form.Item>
                <Row className="forgotpagelink">
                  <Col>
                    <Form.Item
                      valuePropName="checked"
                      wrapperCol={{
                        offset: 0,
                        span: 16,
                      }}
                    >
                      <Checkbox defaultChecked={JSON.parse(localStorage.getItem("user")) ? true : false} onChange={checkChange} style={{ fontSize: "1vw", fontWeight: "400" }}>Remember me</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col className="">
                    <Form.Item
                      wrapperCol={{
                        offset: 0,
                        span: 16,
                      }}
                    >
                      <Link to="/forgot-password" style={{ color: "black", fontSize: "1vw", fontWeight: "400" }}>Forgot Password</Link>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item as={Row}>
                    <Col md={{ span: 12 }}>
                      <div className="doyou-account">
                      Don't have an account ?
                        <span className="cursor-pointer">
                          <Link to="/registration" style={{ color: "black" }}> Register</Link>
                        </span>
                      </div>
                    </Col>
                  </Form.Item>

                <Form.Item
                 wrapperCol={{
                  span: 24,
                }}
                >
                  <Button htmlType="submit" className="w-100 theme-blue btn btn-primary">
                    LOGIN
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
      {
        loading && <Loader />
      }
    </div>
  );
};

export default withRouter(Login);
