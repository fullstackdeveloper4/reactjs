import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import AutoCompleteInput from "./AutoCompleteInput";
import { setQuoteDetails } from "../redux/Actions/authAction";
import { getStoreQuotesUpdateCustomerId } from "../api/quoteApi";
import { get_all_postal_codes, updateQuote } from "../api/updateQuote";
import { get_card_list } from "../api/userUpdate";

const FromTo = ({ setType, setMessage }) => {
  const dispatch = useDispatch();
  const quoteDetail = useSelector(state => state.auth.quoteDetail);
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState({});
  const [autocomplete, setAutoComplete] = useState(false)
  const [autocomplete1, setAutoComplete1] = useState(false)
  const [autocomplete2, setAutoComplete2] = useState(false)
  // const [autocomplete2 , setAutoComplete2] = useState(false)
  const [selectFiedValidations, setSelectFiedValidations] = useState()
  const [loading, setLoading] = useState(false)
  const [postal_code, setPostal_code] = useState([])
  const handleSubmit = (event) => {
    window.scrollTo(0,0)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

    } else {
      event.preventDefault();
      const quoteData = {
        from_address: state && state?.from_address,
        from_city: state && state?.from_city,
        from_province: state && state?.from_province,
        from_postal_code: state && state?.from_postal_code,
        from_country: state && state?.from_city,
        to_address: state && state?.to_address,
        to_city: state && state?.to_city,
        to_country: state && state?.to_city,
        to_province: state && state?.to_province,
        to_postal_code: state && state?.to_postal_code,
      }

      if (quoteData.from_address === undefined) {
        setAutoComplete1(true)
      } else {
        setAutoComplete1(false)
      }

      if (quoteData.to_address === undefined) {
        setAutoComplete2(true)
      }
      else {
        setAutoComplete2(false)
      }
      setState({
        ...state,
        ...quoteData,
      });


      let error1 = false;
      let error2 = false;

      if (quoteData?.from_address && quoteData?.to_address && quoteData?.to_postal_code && quoteData?.from_postal_code) {
        if(quoteData?.from_address===quoteData?.to_address){
          setType("error")
          setMessage("Please select different addresses")
          window.scrollTo(0, 500)
        }
       else{
        for (let i = 0; i < postal_code.length; i++) {
          if (postal_code[i]?.postal_code === quoteData?.from_postal_code.substring(0,3)) {
            error1 = false;
            break
          } else {
            error1 = true;
          }
        }

        for (let i = 0; i < postal_code.length; i++) {
          if (postal_code[i].postal_code === quoteData?.to_postal_code.substring(0,3)) {
            error2 = false;
            break
          } else {
            error2 = true;
          }
        }
        if (error1 === true || error2 === true) {
          setType("error")
          setMessage("Please select Greater Toranto Area address")
          window.scrollTo(0, 500)
        } else {
           dispatch(setQuoteDetails({ ...quoteDetail, ...quoteData }));
           window.scrollTo(0, 1300)
        }
      }  
      }
    }
    setValidated(true);
  };

  const handleOnChange = (e, type) => {
    const { value } = e.target;
    setState({
      ...state,
      [type]: value.toUpperCase(),
    })
  }

  let from = "from"
  function handleFormSelectAddress(data, from) {
    setState({
      ...state,
      from_address: data && data?.value,
      from_city: data && data?.City,
      from_state: data && data?.City,
      from_province: data && data?.Province,
      from_postal_code: data && data?.PostalCode,
    })
  }

  let to = "to"
  const handleSelectAddress = (data, to) => {
    setState({
      ...state,
      to_address: data && data?.value,
      to_city: data && data?.City,
      to_state: data && data?.City,
      to_province: data && data?.Province,
      to_postal_code: data && data?.PostalCode,
    })
  }


  useEffect(() => {
    const userData = quoteDetail;
    setState({
      from_address: userData && userData?.from_address,
      from_city: userData && userData?.from_city,
      from_province: userData && userData?.from_province,
      from_postal_code: userData && userData?.from_postal_code,
      from_country: userData && userData?.from_city,
      to_address: userData && userData?.to_address,
      to_city: userData && userData?.to_city,
      to_country: userData && userData?.to_city,
      to_province: userData && userData?.to_province,
      to_postal_code: userData && userData?.to_postal_code,
    })

    dispatch(setQuoteDetails({ ...quoteDetail, ...userData }))
    if (localStorage.getItem("token") !== "") {
      updateQuote()
    }
    get_all_postal_codes(setPostal_code)
    get_card_list(dispatch, setLoading)
    // eslint-disable-next-line
  }, [])

  return (
    <Row>
      <Col md={6}>
        <div className="no-background-color">
          <div className="from-div">
            <h1><span>GET A</span> QUOTE</h1>
            <p className="get-info-desc text-left">
              We love to discuss our flexible delivery solutions with you! Provide your contact information and we'll reach out to you!
            </p>
            <ListGroup className="text-left">
              <ListGroup.Item className="no-background-color border-0 px-0"><i className="fas fa-map-marker-alt mr-2 color light-blue"></i><span>ENTER ORIGIN AND DIMENSIONS</span></ListGroup.Item>
              <ListGroup.Item className="no-background-color border-0 px-0"><i className="fas fa-hand-holding-box mr-2 color light-blue"></i><span>COMPLETE YOUR SHIPMENT DETAILS</span></ListGroup.Item>
              <ListGroup.Item className="no-background-color border-0 px-0"><i className="fas fa-calculator mr-2 color light-blue"></i><span>GET AN ESTIMATED QUOTE</span></ListGroup.Item>
              <ListGroup.Item className="no-background-color border-0 px-0"><i className="far fa-hand-pointer mr-2 color light-blue"></i><span>PROCEED WITH ONLINE BOOKING</span></ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <Form className="text-left quote-formpage" noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-4">

            <Card.Subtitle className="text-left">FROM</Card.Subtitle>
            <Row className="">

              <Form.Group as={Col} >
                {/* <Form.Control
                  required
                  type="text"
                  placeholder="Address"
                  id="street-address"
                /> */}

                <AutoCompleteInput
                  type="from"
                  className="d-block form-control"
                  handleSelect={handleFormSelectAddress}
                  defaultValue={state?.from_address}
                  val={{ label: quoteDetail.from_address ? quoteDetail.from_address : "Select address", value: quoteDetail.from_address }}
                  setAutoComplete={setAutoComplete}
                  setAutoComplete1={setAutoComplete1}

                // defaultValue={{ label: userInfoData && userInfoData.from_address, value: userInfoData && userInfoData.from_address }}
                />
                {autocomplete1 && <span style={{ color: "#dc3545", fontSize: "12px" }} type="invalid">Please select address</span>}

                {/* {(state && state.from_address) ?
                  <div className="error-msg">
                    <Form.Control.Feedback type="invalid">Please Enter address!</Form.Control.Feedback>
                  </div>
                : ""} */}
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col} >
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  defaultValue={state?.from_city ? state?.from_city :"" }
                  value={state?.from_city ? state?.from_city :""}
                  onChange={(e) => handleOnChange(e, "from_city")}
                />
                <Form.Control.Feedback type="invalid">Please enter a city</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col} >
                <Form.Control
                  required
                  type="text"
                  placeholder="Province"
                  defaultValue={state?.from_province ? state?.from_province:""}
                  value={state?.from_province ?state?.from_province:""}
                  onChange={(e) => handleOnChange(e, "from_province")}
                />
                <Form.Control.Feedback type="invalid">Please enter province!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col} >
                <Form.Control
                  required
                  type="text"
                  placeholder="Postal code"
                  defaultValue={state?.from_postal_code ? state?.from_postal_code :""}
                  value={state?.from_postal_code ? state?.from_postal_code :""}
                  onChange={(e) => handleOnChange(e, "from_postal_code")}
                />
                <Form.Control.Feedback type="invalid">Please enter postal code!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </div>
          <div className="">
            <Card.Subtitle className="text-left">To</Card.Subtitle>
            <Row className="">
              <Form.Group as={Col} >
                <AutoCompleteInput
                  type="to"
                  handleSelect={handleSelectAddress}
                  defaultValue={state?.to_address}
                  setAutoComplete={setAutoComplete}
                  setAutoComplete2={setAutoComplete2}
                  val={{ label: quoteDetail?.to_address ? quoteDetail?.to_address : "Select address", value: quoteDetail.to_address }}
                // defaultValue={{ label: userInfoData && userInfoData.to_address, value: userInfoData && userInfoData.to_address }}
                />
                {autocomplete2 && <span style={{ color: "#dc3545", fontSize: "12px" }} type="invalid">Please select address</span>}
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col} >
                <Form.Control
                  required
                  type="text"
                  defaultValue={state?.to_city ? state?.to_city:""}
                  value={state?.to_city ? state?.to_city:""}
                  placeholder="City"
                  onChange={(e) => handleOnChange(e, "to_city")}
                />
                <Form.Control.Feedback type="invalid">Please enter a city</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Province"
                  defaultValue={state?.to_province ? state?.to_province:""}
                  value={state?.to_province ? state?.to_province:""}
                  onChange={(e) => handleOnChange(e, "to_province")}
                />
                <Form.Control.Feedback type="invalid">Please enter province!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="">
              <Form.Group as={Col} >
                <Form.Control
                  required
                  type="text"
                  defaultValue={state?.to_postal_code ? state?.to_postal_code:""}
                  value={state?.to_postal_code ? state?.to_postal_code :""}
                  placeholder="Postal code"
                  onChange={(e) => handleOnChange(e, "to_postal_code")}
                />
                <Form.Control.Feedback type="invalid">Please enter postal code!</Form.Control.Feedback>
              </Form.Group>
            </Row>

          </div>
          <Button type="button" className="w-100 theme-blue" onClick={handleSubmit}>DESCRIBE YOUR SHIPMENT</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default FromTo;
