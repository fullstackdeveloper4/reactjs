import React, { useState } from "react";
import "../../pages/PaymentPage/UpdateInfo.css";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { changePassword } from "../../api/userUpdate";
import Loader from "../../pages/Loader"
import { useHistory } from "react-router";



const ChangePassword = ({ setMessage, setType }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const onFinish = (values) => {
    changePassword(values, setLoading, history, setType, setMessage)
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <div>
      <Row>
        <Col md={24} lg={24} sm={24} className="registrpage-section">

          <Form
            className="mt-3 "
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 8 }} wrapperCol={{ span: 20 }}
              label="Current Password:"
              className="mb-full"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: "Please enter your old password!",
                },
                {
                  min: 6,
                  message: "Password must contain at least 6 digits"
                }
              ]}
            >
              <Input.Password placeholder="Current password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Please enter new your password",
                },
                {
                  min: 6,
                  message: "Password length must be greater than 6"
                }
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter new password"/>
            </Form.Item>
            <Form.Item
              name="confirm_password"
              label="Confirm Password"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("New password and confirm password doesn't match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password"/>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button htmlType="submit" className="w-100 light-blue-bg">
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Col>

      </Row>
      {
        loading && <Loader />
      }
    </div>
  );
};
export default ChangePassword;
