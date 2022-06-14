import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
// import ShortUniqueId from 'short-unique-id';
import { useSelector, useDispatch } from 'react-redux'
import {  Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { getDementionApi, getStoreQuotesApi, getWeightCategoryApi } from '../api/quoteApi';
import { setQuoteDetails } from '../redux/Actions/authAction';
import moment from 'moment';
import { DatePicker, Space, Form, InputNumber,Select , Button } from 'antd';
import { dimension_weight_price, storeQuotes, time_limit_for_quote } from '../api/updateQuote';
import { padding } from '@mui/system';
import box from '../assets/Group 6.png'
let {Option} = Select;

const DimensionComponent = (props) => {
  const selector= useSelector(state=> state.auth.quoteDetail)
  const [dataState , setDataState] = useState([])
  const [price_tax , setPrice_tax] = useState([])
  const [loading , setLoading] = useState(false)
  const [time , setTime] =useState(null)
  const dispatch = useDispatch()  

  const onFinish = (values) => {
    window.scrollTo(0,1650)
    // Object.assign(values , {price:price})
    let data={
      ...selector, 
      pickup_date:moment(values.date_time).format("DD-MM-YYYY"),
      pickup_time:moment(values.date_time).format("HH:mm"),
      delivery_date:moment(values.date_time).format("HH:mm")>=moment(time , "HH:mm").format("HH:mm") ? moment(values.date_time).add(1,"days").format("DD-MM-YYYY"):moment(values.date_time).format("DD-MM-YYYY"),
      quantity:values.quantity,
      weight:values.weight,
      price:parseFloat(price_tax.price)
    }
    dispatch(setQuoteDetails(data))

    let postData={
      "data":[data]
    }
    storeQuotes(postData)
  }


  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().subtract(1 ,"days");
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(),
      disabledMinutes: () => range(),
    };
  }

  useEffect(() => {
    time_limit_for_quote(setLoading , setTime)
    dimension_weight_price(setPrice_tax)
    if(selector.from_address){
    dispatch(setQuoteDetails(selector))
    let Newdata={
      "data":[selector]
    }
    storeQuotes(Newdata)}
  }, [])

  return (
    <Form 
      onFinish={onFinish}
      initialValues={{
        quantity:selector?.quantity ?selector?.quantity:1  , 
        weight:50,
        date_time:selector?.pickup_date && moment(`${selector.pickup_date} ${selector.pickup_time}`,'DD-MM-YYYY HH:mm')}}
        className="text-left dimension-formpage" 
      >
      <Row>
          <Col md="12" lg="12" sm="12" className="text-center">
            <img src={box} style={{height:"200px"}} alt="box image"/>
           </Col>
      </Row>
      <Row>
        <Col md={3} lg={3} sm={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={"Pickup date and time"}
            name="date_time"
            rules={[{ required: true, message: 'Pickup date and time is required' }]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              // defaultValue={moment(selector.pickup_date).format("YYYY-MM-DD")+" "+moment(selector.pickup_time).format("HH:mm")}
              showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
              // showDate={{defaultValue:moment(selector.pickup_date , "YYYY-MM-DD")}}
            />
          </Form.Item>
        </Col>
        <Col md={6} lg={6} sm={12}>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Weight"
            name="weight"
            rules={[{ required: true, message: 'Weight is required' }]}
            >
            <Select >
                <Option value={50}>Max size 50 KG (110.23 pound) - max size ( length : 12ft , width : 3ft , height : 5ft)</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={3} lg={3} sm={12}>
          <Form.Item
          labelCol={{ span: 24 }}
            label="Select quantity"
            name="quantity"
          >
            <InputNumber min={1}  placeholder="select quantity"/>
          </Form.Item>
        </Col>
        
      </Row>
      
      <div className="float-right">
          <Form.Item>
            <Button htmlType="submit" className="d-inline theme-blue get-quoteidimension" >Get a quote</Button>
            {/* <Button className="d-inline theme-blue get-quoteidimension" >Get a quote</Button> */}
          </Form.Item>
      </div>
      
    </Form>
  );
}
export default withRouter(DimensionComponent);
