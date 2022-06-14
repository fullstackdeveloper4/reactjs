import { Row, Col, } from "react-bootstrap";
import { Card,Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import UpdateInfo from "./PaymentPage/UpdateInfo.js";
import ChangePassword from "./PaymentPage/ChangePassword";
import PaymentSection from "./PaymentPage/PaymentSection";
import '../App.css';
import Alertify from "./Alertify.js";
import { get_card_list } from "../api/userUpdate.js";
const { TabPane } = Tabs;

const PaymentOptions = (props) => {
  const [value, setValue] = useState(0);
  const [type , setType]= useState("")
  const [loading , setLoading] = useState(false)
  const [message , setMessage]= useState("")
  const selector = useSelector(state => state.auth?.cardDetail)
  const dispatch=useDispatch()
  const [title , setTitle]= useState(!sessionStorage.getItem("card_det") ? 
  <div><h2><span className="title-thin"> PAYMENT</span><span style={{fontWeight: '400'}}> INFO</span></h2></div> : 
  <div><h2><span className="title-thin"> UPDATE</span><span style={{fontWeight: '400'}}> USER PROFILE</span></h2></div>)
  // const [title , setTitle]= useState(!sessionStorage.getItem("card_det") ? "PAYMENT INFO" : "UPDATE USER DETAIL")
  
  const  card_detail = useSelector(state => state.auth.cardDetail)
  // const selector = useSelector(state => state?.auth?.userDetail)
  function callback(key) {
    if(key==="1"){
      setTitle(
        <div><h2><span className="title-thin"> UPDATE</span><span style={{fontWeight: '400'}}> USER PROFILE</span></h2></div>
      )
    }
    if(key==="2"){
      setTitle(
        <div><h2><span className="title-thin"> UPDATE</span><span style={{fontWeight: '400'}}> PASSWORD</span></h2></div>

      )
    }
    if(key==="3"){
      setTitle(
        <div><h2><span className="title-thin"> PAYMENT</span><span style={{fontWeight: '400'}}> INFO</span></h2></div>
      )
      // setTitle('PAYMENT INFO')
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() =>{
    window.scrollTo(0,450);
    get_card_list(dispatch, setLoading, selector);
  },[])
  

  return (
    // <Main>
    <div className="upadatepage-section">
      <div className="container">
      {(type==="error" || type==="success") && <Alertify  message={message} type={type}  setType={setType}  />}
        <Row>
          <Col md={12} lg={12} sm={12}>
            <Card bordered={true} className="card-style text-center">
              <h2>
                <span className="title-thin">{title}</span>
              </h2>
              <br />
              {/* <p>
                We'd love to discuss our flexible delivery solutions with you!
                provide your <br />
                contact information and we'll reach out to you! .
              </p> */}
              <div className=" mt-4">
                <Tabs defaultActiveKey={(!sessionStorage.getItem("card_det") || sessionStorage.getItem("card_det")==="undefined" ||sessionStorage.getItem("card_det")==="" )  ? "3" :"1"} size="large" centered onChange={callback}>
                  <TabPane tab="PROFILE INFO" key="1">
                    <UpdateInfo setMessage={setMessage} setType={setType} />
                  </TabPane>
                  <TabPane tab="CHANGE PASSWORD" key="2">
                    <ChangePassword  setMessage={setMessage} setType={setType} />
                  </TabPane>
                  <TabPane tab="PAYMENT INFO" key="3">
                    <PaymentSection  setMessage={setMessage} selector={selector} setType={setType} />
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
    // </Main>
  );
};

export default PaymentOptions
