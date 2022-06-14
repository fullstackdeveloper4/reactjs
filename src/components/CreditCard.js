import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row, Alert } from "react-bootstrap";
import { getStorePaymentApi } from "../api/authApi";
import { withRouter } from "react-router-dom";
import Loader from "../pages/Loader";
import moment from "moment";
import { DatePicker } from "antd";
const CreditCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    card_number: "",
    name_on_card: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    card_type: "debite",
  });

  const [error, setError] = useState({
    card_number: "",
    name_on_card: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
  });

  const onChange = (e, type) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [type]: value,
    });
  };

  const validate = () => {
    const { card_number, name_on_card, cvv, expiry_month, expiry_year } =
      formState;
    setError({
      ...error,
      card_number: !card_number ? "Card number is required!" : "",
      name_on_card: !name_on_card ? "Name on card is required!" : "",
      expiry_month: !expiry_month ? "Expiry month year is required!" : "",
      expiry_year: !expiry_year ? "Expiry year is required!" : "",
      cvv: !cvv ? "Cvv is required!" : "",
    });

    if (
      card_number &&
      name_on_card &&
      cvv &&
      expiry_month &&
      expiry_year &&
      !error.card_number &&
      !error.name_on_card &&
      !error.expiry_month &&
      !error.expiry_year &&
      !error.cvv
    ) {
      return true;
    } else {
      return false;
    }
  };

  const get_date = (e) => {
    formState.expiry_month = moment(e).format("MM");
    formState.expiry_year = moment(e).format("YYYY");
    setFormState(formState);
  };

  const handleSubmit = (e) => {
    const formData = {
      card_number: formState.card_number,
      name_on_card: formState.name_on_card,
      expiry_month: formState.expiry_month,
      expiry_year: formState.expiry_year,
      card_cvv_number: formState.cvv,
      card_type: formState.card_type,
    };
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      getStorePaymentApi(formData)
        .then((response) => {
          if (response && response.data) {
            setLoading(false);
            setTimeout(() => {
              props.history.push("/");
            }, 1000);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
   
        <div className="border-0">
          <div className="credit-card-form">
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Col sm={12}>
                  <Form.Label className="text-left text-dark">
                    Card Number
                  </Form.Label>
                  <Form.Control
                    className={
                      error && error["card_number"] ? "error-border" : ""
                    }
                    type="number"
                    placeholder="123456789456"
                    defaultValue={formState && formState["card_number"]}
                    onChange={(e) => onChange(e, "card_number")}
                  />
                  {error && error["card_number"] ? (
                    <Alert className="mt-2 p-0" variant={"danger"}>
                      {error["card_number"]}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Col sm={12}>
                  <Form.Label className="text-left text-dark">
                    Name on card
                  </Form.Label>
                  <Form.Control
                    className={
                      error && error["name_on_card"] ? "error-border" : ""
                    }
                    type="text"
                    placeholder="Enter card holder name"
                    defaultValue={formState && formState["name_on_card"]}
                    onChange={(e) => onChange(e, "name_on_card")}
                  />
                  {error && error["name_on_card"] ? (
                    <Alert className="mt-2 p-0" variant={"danger"}>
                      {error["name_on_card"]}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Col sm={12}>
                  <Form.Label className="text-left text-dark ml-0">
                    Expiry / CVV
                  </Form.Label>
                </Col>
                <Col sm={6}>
                  <DatePicker
                    picker="month"
                    className="form-control"
                    onChange={get_date}
                    defaultValue={moment("12-2024", "MM-YYYY")}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    className={error && error["cvv"] ? "error-border" : ""}
                    type="number"
                    placeholder="ccv"
                    defaultValue={formState && formState["cvv"]}
                    onChange={(e) => onChange(e, "cvv")}
                  />
                  {error && error["cvv"] ? (
                    <Alert className="mt-2 p-0" variant={"danger"}>
                      {error["cvv"]}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 12 }}>
                  <Button
                    type="button"
                    variant="info"
                    className="w-100 light-blue-bg"
                    onClick={handleSubmit}
                  >
                    Add Card
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
        {
          loading && <Loader/>
        }
    </div>
  );
};

export default withRouter(CreditCard);
