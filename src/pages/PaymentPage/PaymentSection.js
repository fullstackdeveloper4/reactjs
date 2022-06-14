import React, { useEffect, useState } from "react";
import { Row, Col, DatePicker, InputNumber } from "antd";
import "../PaymentPage/UpdateInfo.css";
import { Form, Input, Button } from "antd";
import Credit from "../../assets/Credit-Card-Logos.png";
import "./PaymentInfo.css";
import moment from "moment";
import { useHistory } from "react-router";
import { update_card, update_card_debit_credit } from "../../api/updateQuote";
import Loader from "../../pages/Loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CardType } from "./CardType";



const PaymentSection = (props) => {
  const {selector}=props
  const [loading, setLoading] = useState(false);
  const [cardcheck, setCardcheck] = useState("")
  const quoteDetail = useSelector(state => state.auth?.quoteDetail)
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = (values) => {
    Object.assign(values, { expiry_month: moment(values.expiry).format("MM") });
    Object.assign(values, {
      expiry_year: moment(values.expiry).format("YYYY"),
    });

    Object.assign(values, { card_type: "credit" });
    let val = values;
    delete val.expiry;
    if (!selector?.card_number) {
      // for adding new card  
      update_card(val, setLoading, dispatch, history, selector, quoteDetail, props.setType, props.setMessage);
    } else {
      //for updating card
      Object.assign(val, { id: selector.id })
      update_card_debit_credit(val, setLoading, dispatch, history, selector, props.setType, props.setMessage)
    }
  };

  let card_err =""
  const card_checking=(e)=>{
    if(CardType(e.target.value)===undefined){
      card_err="Invalid card"
    }
    else{
      card_err=CardType(e.target.value)
    }
  }
  useEffect(() => {
  
  }, [])
  return (
    <div>
      <div>
        <div className="img pyment_logos">
          <img src={Credit} height="25" />
        </div>
        <Row>
          <Col md={24} lg={24} sm={24}>
            <Form
              className="mt-3"
              name="basic"
              initialValues={{
               card_number: selector?.card_number,
               name_on_card:selector?.name_on_card,
               expiry:selector?.expiry_year && (moment(`${selector?.expiry_year}-${selector?.expiry_month}`, 'YYYY-MM'))
              }}
              onFinish={onFinish}
              onValuesChange={(changedValues, allValues)=>{
                if(changedValues.card_number)
                setCardcheck(CardType(changedValues.card_number) === undefined ? "Invalid card" : CardType(changedValues.card_number))
              }}
              autoComplete="off"
            >
              <Form.Item
                name="card_number"
                className="mb-full crdnumber-all"
                label="Card Number"
                messageVariables={{ another: cardcheck }}
      
                onChange={card_checking}
                // onChange={(e)=>setCardcheck(CardType(e.target.value) === undefined ? "Invalid card" : CardType(e.target.value))}
                rules={[
                  {
                    required: true,
                    message: "Card number is required"
                  },
                 
                  {
                    min: 15,
                    max:19,
                    message: "Card number have at least 15 digit and maximum 19 ."
                  },
                  {
                    validator(card_err) {
                      if (cardcheck === "Invalid card") {
                         return Promise.reject('Please enter a valid card');
                      }else{
                         return Promise.resolve();
                      }
                    },
                  }
                ]}
              >
                <Input placeholder="123412312341231" type="number" suffix={cardcheck} />
              </Form.Item>
              {/* {cardcheck} */}
              <Form.Item
                name="name_on_card"
                className="mb-full"
                label="Name on card"
                rules={[
                  {
                    required: true,
                    message: "Name on card is required"
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z ]*$/),
                    message: "Please enter a valid Name"
                  },
                ]}
              >
                <Input placeholder="John Doe" type="text" />
              </Form.Item>
              <Form.Item
                name="expiry"
                className="mb-full expirydate-field"
                label="Expiry/CVV"
                rules={[
                  {
                    required: true,
                    message: "Please select expiry date",
                  },

                ]}
              >
                <DatePicker
                  picker="month"
                  defaultValue={moment("2022-12", "YYYY-MM")}
                  disabledDate={(current) => {
                    return moment().add(-1, 'days') >= current ||
                      moment().add(1, 'month') >= current;
                  }}
                //  onFocus={rideDateGA}
                />
              </Form.Item>
              <Form.Item
                name="card_cvv_number"
                className="updateinfo-cvv mb-full"
                rules={[
                  {
                    required: true,
                    message: "Please enter CVV number ",
                  },
                  {
                    pattern: '^([-]?[1-9][0-9]*|0)$',
                    message: "Please enter a valid CVV number"
                  },
                  {
                    max: 3,
                    min: 3,
                    message: "CVV must have 3 digit Number"
                  }
                ]}
              >
                <Input.Password  placeholder="CVV"/>
              </Form.Item>
              <Form.Item
              className="butn-fullwidt"
                wrapperCol={{
                  offset: 6,
                  span: 16,
                }}
              >
                <Button htmlType="submit" className="w-100 light-blue-bg">
                  {selector?.card_number ? "Update" : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      {
        loading && <Loader />
      }
    </div>
  );
};
export default PaymentSection;
