import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../PaymentPage/UpdateInfo.css";
import { Card } from "antd";
import UpdateInfo from "../PaymentPage/UpdateInfo"
import ChangePassword from "../PaymentPage/ChangePassword"
import PaymentInfo from "../PaymentPage/PaymentInfo"

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const PaymentPannel = () => {
  return (
    <div>
      <Container className="container-height mt-5 mb-4">
        <Row>
          <Col></Col>
          <Col md={8} lg={8} sm={12}>
            <Card bordered={true} className="card-style text-center">
              <span className="top-head">
                <span className="bold"> UPDATE</span> ACCOUNT INFO
              </span>
              <br />
              <span>
                We'd love to discuss our flexible delivery solutions with you!
                provide your <br />
                contact information and we'll reach out to you! .
              </span>

              <div className=" mt-4">
                <Tabs defaultActiveKey="1" centered>
                  <TabPane tab="UPDATE INFO" key="1">
                  <UpdateInfo/>
                  </TabPane>
                  <TabPane tab="CHANGE PASSWORD" key="2">
                    <ChangePassword/>
                  </TabPane>
                  <TabPane tab="PAYMENT INFO" key="3">
                    <PaymentInfo/>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
export default PaymentPannel;
