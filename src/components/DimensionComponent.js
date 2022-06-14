import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
// import ShortUniqueId from 'short-unique-id';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Row, Col, InputGroup , Alert } from 'react-bootstrap';
import { getDementionApi, getStoreQuotesApi, getWeightCategoryApi } from '../api/quoteApi';
import { setQuoteDetails } from '../redux/Actions/authAction';
import moment from 'moment';

const demoWeightList = [{id: 1, type: "kg/cm", status: "active"},{id: 2, type: "lb/in", status: "active"}];
let demoDimentionList = [{"id":1,"min_weight":"0","max_weight":"20","dimension_type":"small","length":"32","width":"24","height":"1","price":"50.00"},{"id":2,"min_weight":"21","max_weight":"40","dimension_type":"medium","length":"35","width":"20","height":"15","price":"70.00"},{"id":3,"min_weight":"41","max_weight":"60","dimension_type":"large","length":"75","width":"35","height":"35","price":"100.00"}];

const DimentionComponent = (props) => {
  const quoteDetail = useSelector(state => state.auth.quoteDetail);
  const dispatch = useDispatch();

  // const token = sessionStorage.getItem("token");
  const [validated, setValidated] = useState(false);
  const [weightCategoryList, setWeightCategoryList] = useState(demoWeightList);
  const [selectedType, setSelectedType] = useState("");
  const [dimentionList, setDimentionList] = useState(demoDimentionList);
  const [weightData, setWeightData] = useState("");
  const [quotePrice, setQuotePrice] = useState(0);
  const [numberOfItem, setNumberOfItem] = useState(1);
  const [message , setMessage] = useState("")
  const [selectedDimention, setSelectedDimention] = useState({
    dimension_type: "",
    height: "1",
    id: null,
    length: "",
    max_weight: "",
    min_weight: "",
    price: "",
    width: "",
  });
  const [formState, setFormState] = useState({
    weightCategory: "",
    weight: "",
    dimention: "",
    packageCount: 0,
    price: 0
  })
  const [itemList, setItemList] = useState([
    {
      weightCategory: "",
      weight: "",
      dimention: "",
      packageCount: 1,
      price: 0
    }
  ])

  const handleAddItem = (data) => {
    let list = []
    list = itemList.concat([data])
    setItemList(list)
  }

  const handleRemoveItem = (key) => {
    let list = itemList.filter((item, index) => index !== key)
    setItemList(list)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const priceList = itemList.map((item) =>{
        return (item.price * item.packageCount)
      })
      const totalAmout = priceList.reduce(function(a, b){ return a + b; });
      setQuotePrice(totalAmout);
      let quoteData = {
        ...quoteDetail,
        totalAmout,
        selectedType,
        selectedDimention,
        dimension_weight_types_id: selectedDimention.id,
        shipment_date: moment().format("Do MMMM YYYY"),
        delivery_date: moment().add('days', 1).format("Do MMMM YYYY"),
        weightCategory: selectedType,
        numberOfItem,
      }
      dispatch(setQuoteDetails({...quoteData}))
      setTimeout(() => {
        handleQuote();
      }, 1000)
    }
    setValidated(true);
  };

  useEffect(() => {
    const quoteDetails = quoteDetail;
    if (quoteDetails) {
      if (quoteDetails.selectedDimention) {
        setSelectedDimention(quoteDetails.selectedDimention)
        let weight_data = (quoteDetails.selectedDimention.min_weight + " - " + quoteDetails.selectedDimention.max_weight)
        setWeightData(weight_data)
        let total_Amout = quoteDetails.selectedDimention.price * quoteDetails.numberOfItem
        setQuotePrice(total_Amout);
      }
      if (quoteDetails.numberOfItem) {
        setNumberOfItem(quoteDetails.numberOfItem);
      }
      if (quoteDetails.weightCategory) {
        setSelectedType(quoteDetails.weightCategory);
      }
    }
    // dispatch(setQuoteDetails({...quoteDetail,...quoteDetails}))
    getWeightCategoryApi().then(response => {
      if (response && response.data && response.data.success) {
        setWeightCategoryList(response.data.success.data)
      }
    })

    // eslint-disable-next-line
  }, [])

  const getDementionData = (value) => {
    const selected_w_type = weightCategoryList.find(weight => weight.type === value);
    const raw = {
      weight_category_id: selected_w_type.id
    }
    getDementionApi(raw).then(response => {
      if (response && response.data && response.data.success) {
        setDimentionList(response.data.success.data)
      }
    })
  }

  const handleQuote = () => {
    const info = quoteDetail

    const quoteDetails = itemList.map((quote) => {
      // const order_uid = new ShortUniqueId({ length: 6 });
      // const tracking_uid = new ShortUniqueId({ length: 10 });
      let weightDimention= dimentionList.length && dimentionList.find((item) => item.dimension_type === quote.dimention);
      return {
        from_address: info?.from_address,
        from_province: info?.from_province,
        from_postal_code: info?.from_postal_code,
        from_country: info?.from_city,
        from_city: info?.from_city,
        to_address: info?.to_address,
        to_province: info?.to_province,
        to_postal_code: info?.to_postal_code,
        to_country: info?.to_city,
        to_city: info?.to_city,
        shipment_date: moment().format("YYYY-MM-DD"),
        dimension_weight_types_id: weightDimention?.id,
        numbers_of_count: quote?.packageCount && parseInt(quote?.packageCount),
      }
    })

    const allInfo = {
      data : quoteDetails
    }
    getStoreQuotesApi(allInfo).then(response => {
     
      if (response && response.data && response.data.success) {
        sessionStorage.setItem('customer_ids', JSON.stringify(response.data.success.last_insert_id))
        sessionStorage.setItem('lastRoutePath', window.location.pathname)
      } 
    })
    .catch(err=>{
    })
  }

  const handleChange = (value, type, id, arrayLength) => {
    if (type === "weightCategory") {
      getDementionData(value)
    }
    dispatch(setQuoteDetails({...quoteDetail, totalAmout: 0}))

    let list = (itemList.length === arrayLength) &&  itemList.map((item, index) => {
      let selectedItem = {}
      if (index === id) {
        if (type === "weight") {
          var valueStr = value.toString();
          const selected_max_weight = valueStr.split(' ')[valueStr.split(' ').length - 1];
          const selected_demention = dimentionList.length && dimentionList.find(item => item.max_weight === selected_max_weight);
          selectedItem = {
            [type]: value,
            dimention: selected_demention.dimension_type,
            packageCount: item.packageCount === 0 ? 1 : item.packageCount,
            price: selected_demention.price
          }
        }else if (type === "dimention") {
          const selected_Demention_data = dimentionList.length && dimentionList.find(item => item.dimension_type === value);
          let weight_dta = (selected_Demention_data.min_weight + " - " + selected_Demention_data.max_weight)
          selectedItem = {
            [type]: value,
            weight: weight_dta,
            price: selected_Demention_data.price
          }
        }else {
          selectedItem = {
            [type]: value,
          }
        } 
      }
      return {
        ...item,
        ...selectedItem
      }
    })
    setItemList(list)
  }

  return (
    <Form className="text-left dimension-formpage" noValidate validated={validated}>
      {itemList.length && itemList.map((elem, index) => {
        return (
          <Row className="mb-3" key={index}>
            <Form.Group className="text-left" as={Col} md="2" controlId="validationCustom01">
              <Form.Label >CATEGORY</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleChange(e.target.value, "weightCategory", index, itemList.length)}
                value={elem.weightCategory}
                required>
                <option value="">Select your option</option>
                {weightCategoryList && weightCategoryList.length && weightCategoryList.map(weight => {
                  return <option>{weight.type}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select weight category!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>WEIGHT</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleChange(e.target.value, "weight", index, itemList.length)}
                value={elem.weight}
                readOnly={elem.weightCategory ? false : true}
                required
              >
                <option value="">Select your option</option>
                {dimentionList.length && dimentionList.map((item, index) => {
                  return <option key={index}>{`${item.min_weight} - ${item.max_weight}`}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please choose any weight!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-left" as={Col} md="3" controlId="validationCustom01">
              <Form.Label >DIMENSIONS</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleChange(e.target.value, "dimention", index, itemList.length)}
                value={elem.dimention}
                readOnly={elem.weightCategory ? false : true}
                required
              >
                <option value="">Select your option</option>
                {dimentionList.length && dimentionList.map((item, index) => {
                  return <option key={index}>{item.dimension_type}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select any dimentions!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationCustomUsername">
              <Form.Label>NO. OF PACKAGES</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  min={1}
                  placeholder="No. of packages"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => handleChange(e.target.value, "packageCount", index, itemList.length)}
                  value={elem.packageCount}
                  readOnly={elem.weightCategory ? false : true}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose no. of packages!
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationCustomUsername">
              {index === 0 ?
                <Button variant="secondary" onClick={() => handleAddItem(formState)} disabled={itemList.length >= 3}>
                  ADD MORE <span>+</span>
                </Button>
                :
                <Button className="w-100" variant="secondary" style={{ marginTop: "32px" }} onClick={() => handleRemoveItem(index)}>
                  {"Delete"}
                </Button>
              }
            </Form.Group>
          </Row>
        )
      })}
      <div className="float-right">
        <div>
          <Button className="d-inline get-quote" type="button" onClick={handleSubmit}>Get a quote</Button>
        </div>
      </div>
      <Alert variant="danger">{message}</Alert>
    </Form>
  );
}

export default withRouter(DimentionComponent);
