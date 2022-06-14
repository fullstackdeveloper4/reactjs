import React from "react";
import { Row, Col } from "react-bootstrap";
import Icon from "../assets/Image 1.png";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
import "./../styles/footer.css";

const Footer = (props) => {
  return (
    <div className="footer-section">
      <div className="container">
        <div
          className={
            !(
              window.location.pathname === "" ||
              window.location.pathname === "/"
            ) && `container`
          }
        >
          <Row className="">
            <Col sm={12}>
              <div className="footer-firstpart">
                <button className="footer_button">
                  <Link to="/quotes" style={{ color: "white" }}>
                    GET A QUOTE
                  </Link>
                </button>
                <div className="second">
                  <div>
                  <MailIcon className="icon2"></MailIcon>
                  <p className="para2">
                    <a href="mailto:Hello@trans8.com">Hello@trans8.com</a>
                  </p>
                  </div>
                  <div>
                  <PhoneIcon className="icon2"></PhoneIcon>
                  <p className="para2">
                    <a href="tel:5545454">9354831687</a>
                  </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="footer-social mt-3">
            <Col sm={12}>
              <ul className="ul-items">
                <li className="li-item">
                 <a href="https://facebook.com" target="_blank">
                 <FacebookIcon
                    sx={{ fontSize: "35px" }}
                    style={{ color: "white" }}
                  />
                 </a>
                </li>
                <li>
              <a href="https://twitter.com" target="_blank">
              <TwitterIcon
                    sx={{ fontSize: "35px" }}
                    style={{ color: "white" }}
                  />
              </a>
                </li>
                <li>
                 <a href="https://instagram.com" target="_blank">
                 <InstagramIcon
                    sx={{ fontSize: "35px" }}
                    style={{ color: "white" }}
                  />
                 </a>
                </li>
                <li>
                <a href="https://www.linkedin.com" target="_blank">
                  <LinkedInIcon
                    sx={{ fontSize: "35px" }}
                    style={{ color: "white" }}
                  />
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr style={{ background: "#272727" }} />
          <Row className="mt-3">
            <Col md={5} lg={5} sm={12}>
              <h6 style={{ color: "white" }}>
                @2021 Trans8 Logistics. All rights reserved
              </h6>
            </Col>
            <Col md={7} lg={7} sm={12}>
              <div
                className="footer_link"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  flexShrink: "3",
                }}
              >
                <div className="link_f1">
                <Link to="/">Home</Link>
                </div>
                <div className="link_f1">
                <Link to="/about">About</Link>
                </div>
                <div className="link_f1">
                <Link to="/industries">Industries</Link>
                </div>
                <div className="link_f1">
                <Link to="/contact">Contact</Link>
                </div>
                <div className="link_f1">
                <Link to="/track-order">Tracking</Link>
                
                </div>
                </div>
            </Col>
          </Row>

          <Row className="footerBottom mt-4">
            <Col className="paragraph" md={10} lg={10} sm={10}>
              <p style={{ color: "white" }}>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature,
              </p>
            </Col>
            <Col md={2} lg={2} sm={2} className="text-right ">
              <img src={Icon} height="60" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Footer;
