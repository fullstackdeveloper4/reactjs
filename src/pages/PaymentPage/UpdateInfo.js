import React, { useState } from "react";
import { Row, Col, InputNumber } from "antd";
import '../../App.css'
import Loader from "../Loader";
import { Form, Input, Button, Select } from "antd";
import { update_Info } from "../../api/userUpdate";
import { useSelector, useDispatch } from "react-redux";
import Alertify from "../../pages/Alertify";
import { autoCityPick, getAddressAutoComplete } from "../../api/updateQuote";

const { Option } = Select;

const UpdateInfo = ({ setMessage, setType }) => {
  const [loading, setLoading] = useState(false);
  const selector = useSelector(state => state?.auth?.userDetail)
  const dispatch = useDispatch()
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [address, setAddress] = useState("")

  const onFinish = (values) => {
    update_Info(values, setLoading, dispatch, setType, setMessage)
  };

  function onSelect(val, key) {
    autoCityPick(key.value, setCity);
    setAddress(key.children)
  }

  function onSearch(val) {
    getAddressAutoComplete(val, setCountry);
  }
  return (
    <div>
      <Row>
        <Col md={24} lg={24} sm={24}>
          <Form
            className="mt-3"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 12 }}
            WrapperCol={{ span: 4 }}
            fields={
              [
                {
                  name: "first_name",
                  value: selector?.first_name
                },
                {
                  name: "last_name",
                  value: selector?.last_name
                },
                {
                  name: "phone_number",
                  value: selector?.phone_number?.toString()
                },
                {
                  name: "email",
                  value: selector?.email
                },
                {
                  name: "address",
                  value: address ? address : selector?.address
                },
                {
                  name: "city",
                  value: city?.City ? city.City : selector?.city
                },
                {
                  name: "province",
                  value: city?.Province ? city.Province : selector?.province
                },
                {
                  name: "postal_code",
                  value: city?.PostalCode ? city.PostalCode : selector?.postal_code
                },
                {
                  name: "country",
                  value: city.CountryName ? city.CountryName : selector?.country
                },
              ]
            }
          >
            <Form.Item
              label="First name"
              name="first_name"
              className="mb-full"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z ]*$/),
                  message: "Please enter a valid Name"
                },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              label="Last name"
              className="mb-full"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
                {
                  pattern: new RegExp(/^[a-zA-Z ]*$/),
                  message: "Please enter a valid last Name"
                },
              ]}
            >
              <Input placeholder="Last name" />
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
                  message: "Phone number length must be 10-11 digit"
                },
                {
                  pattern: new RegExp('^([-]?[1-9][0-9]*|0)$'),
                  message: "Please enter a valid phone number"
                },
              ]}
            >
              <Input placeholder="Your phone"  />

            </Form.Item>
            <Form.Item
              label="Email"
              className="mb-full"
              name="email"
            >
              <Input placeholder="Your email" readOnly />
            </Form.Item>
            <Form.Item
              label="Address"
              className="mb-full address-feld"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Your address"
                optionFilterProp="children"
                className="addressplace"
                onSelect={onSelect}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {country.length > 1 &&
                  country.map((e, i) => (
                    <Option key={`country${i}`} value={e?.Id}>
                      {e?.Text}
                    </Option>
                  ))}
              </Select>
              {/* <Input placeholder="Your address" /> */}
            </Form.Item>
            <Form.Item
              label="City"
              className="mb-full"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Input placeholder="Your city" />
            </Form.Item>
            <Form.Item
              label="Province"
              className="mb-full province-field"
              name="province"
              rules={[
                {
                  required: true,
                  message: "Please enter your province!",
                },
              ]}
            >
              <Input placeholder="Your province" />
            </Form.Item>
            <Form.Item
              className="mb-full postal-field"
              name="postal_code"
              rules={[
                {
                  required: true,
                  message: "Please input your postal Code",
                },
              ]}
            >
              <Input placeholder="Your Postal Code" />
            </Form.Item>
            <Form.Item
              label="Country"
              className="mb-full left-100"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please select your country!",
                },
              ]}
            >
              <Input placeholder="Select your country" />
            </Form.Item>
            <Form.Item
            className="mb-full left-100"
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button htmlType="submit" className="w-100 light-blue-bg left-100">
                Update Information
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
export default UpdateInfo;


