import React , {useEffect,useState} from "react";
import { Form, Col, Row, Card, } from "react-bootstrap";
import Land from "../assets/Group7071.png";
import Medical from "../assets/Group7061.png";
import Financial from "../assets/Group7051.png";
import B2B from "../assets/Group704.png";
import Globe from "../assets/global.png";
import { updateQuote } from "../api/updateQuote";


const DashboardPage = () => {
  const[formData, setFormData]  = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
  })

  useEffect(() =>{
    window.scrollTo(0,0)
    // updateQuote()
  },[])
   
  const handleSubmit = () =>{

  }

  return (
    <div>
      <div className="content-section">
        <div className="sevice_section">
          <div className="container">
            <Row>
              <Col><p style={{fontSize: '40px',color:"#054B8B",fontfamily:'Raleway'}}>SERVICE <span style={{fontWeight: '700',fontfamily:'Raleway'}}>PERFECTED</span></p></Col>
            </Row>
        
            <Row >
              <Col sm={6} md={6} lg={3}>
                <img src={Land} height="200" />
                <h5 style={{ fontSize: "18px" ,fontfamily:'Raleway'}}>E-COMMERCE</h5>
                <h6 style={{ fontSize: "14px", color: "#101010a1",fontfamily:'Raleway' }}>Fast and affordable delivery<br/> to your products </h6>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <img src={Medical} height="200" />
                <h5 style={{ fontSize: "18px" }}>MEDICAL</h5>
                <h6 style={{ fontSize: "14px", color: "#101010a1",fontfamily:'Raleway' }}>Life-saving deliveries day<br/> or night, and on demand</h6>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <img src={Financial} height="200" />
                <h5 style={{ fontSize: "18px" ,fontfamily:'Raleway'}}>FINACIAL</h5>
                <h6 style={{ fontSize: "14px", color: "#101010a1" }}>Secure and reliable delivery<br/> of your financial materials</h6>
              </Col>
              <Col sm={6} md={6} lg={3}>
                <img src={B2B} height="200" />
                <h5 style={{ fontSize: "18px" ,fontfamily:'Raleway'}}>B2B</h5>
                <h6 style={{ fontSize: "14px", color: "#101010a1",fontfamily:'Raleway' }}>Fleet replacement solutions<br/> to help your business shine</h6>
              </Col>
            </Row>
          </div>
        </div>
        <div className="help-section">
          <div className="container">
              <Card.Title className="register-title text-center">
                <span className="title-thin  text-white">{"HOW CAN"} </span>
                <span className=" text-white">WE HELP?</span>
              </Card.Title>
            
              <Card.Text>
                <div className="register-subtitle">
                  It is a long established fact that a reader will be distracted by
                  the readable content of a page when looking at its layout looking
                  at its layout.
                </div>
              </Card.Text>
          <Row>
            <Col sm={12}>
              <Form>
                <Row >
                  <Col className="mb-3" sm={12} md={6} lg={6}>
                    <Form.Control placeholder="First name" 
                      value={formData.first_name}

                    />
                  </Col>
                  <Col className="mb-3" sm={12} md={6} lg={6}>
                    <Form.Control placeholder="Last name" 
                      value={formData.last_name}
                    />
                  </Col>
                </Row>
                <Row >
                  <Col className="mb-3" sm={12} md={6} lg={6}>
                    <Form.Control placeholder="Phone" 
                      value={formData.phone_number}
                    />
                  </Col>
                  <Col className="mb-3" sm={12} md={6} lg={6}>
                    <Form.Control placeholder="Email" 
                      value={formData.email}
                    />
                  </Col>
                </Row>
                <Row >
                  <Col className="mb-3" sm={12} >
                    <Form.Control placeholder="I am intrested in" 
                      value={formData.first_name}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3" sm={12}>
                    <Form.Group
                      className="mt-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control as="textarea" placeholder="Message" rows={6} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="">
                  <Card.Title className="register-title text-center mt-3">
                    <button className="button_text" onClick={handleSubmit} >Contact Me</button>
                  </Card.Title>
                  </Col>
                </Row>

              </Form>
            </Col>            
          </Row>
          </div>
        </div>

        

        <div className="location-section">
        <div className="container">
          <Card.Title className="text-center">
            <span className="light-text">{"SAME-DAY DELIVERY"} </span>
            <span>WITHIN YOUR REACH</span>
          </Card.Title>
          <Card.Text>
            <div className="register-subtitle text-center">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin professor
            </div>
          </Card.Text>
        
          <Row className="text-center mt-5">
            <Col sm={4}>
              <h1 className="title_rate">
                75 <span className="plus_sign">+</span>{" "}
              </h1>
              <p>North American<br/>
              Locations</p>
            </Col>

            <Col sm={4}>
              <h1 className="title_rate">
                6k <span className="plus_sign">+</span>{" "}
              </h1>
              <p>Professional Service<br/>
              providers</p>
            </Col>

            <Col sm={4}>
              <h1 className="title_rate">
                90 <span className="plus_sign">+</span>{" "}
              </h1>
              <p>Percent of Population<br/>
              Covered</p>
            </Col>

            </Row>
            <div className="globe mt-5">
              <img src={Globe} width="100%" height="100%" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
