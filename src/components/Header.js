import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav } from "react-bootstrap";
import { slide as Menu } from "react-burger-menu";
import Logo from "../assets/Group937.png";
import Logo2 from "../assets/Logo2.png";
import Shipping from "../assets/shipping-fast-solid-svgrepo-com.png";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import trans8 from "../assets/hero-logo.png";
import user from "../assets/place.png";
import { user_detail } from "../api/userUpdate";
import { useDispatch, useSelector } from "react-redux";
import SwipeableTemporaryDrawer from "../pages/Drawer";
const BurgerMenu = (props) => {
  const selector = useSelector((state) => state.auth.userDetail);
  const usertoken = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      user_detail(dispatch);
    }
  }, []);
  return (
    <>
      <div className="men" style={{ background: "transparent !important" }}>
        <Menu right {...props} isOpen={false}>
          <Nav className="justify-content-end website-width" activeKey="/">
            {usertoken ? (
              <>
                <Nav.Item className="menu-logo">
                  <img src={trans8} alt="trans-8" />
                </Nav.Item>
                <Nav.Item className="user-img">
                  <img src={user} alt="user" />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <Avatar vkontakteId="1" size="150" /> */}
                    {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                  </div>
                </Nav.Item>
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: "30px",
                  }}
                >
                  <h4 style={{ color: "white" }}>
                    {selector?.first_name} {selector?.last_name}
                  </h4>
                </div>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/dashboard">Dashboard</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/quotes">Get Quote</Link>
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link>
                    <Link to="/dashboard">Dashboard</Link>
                  </Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/my-order"> My Orders</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/track-order">Track Your Shipment</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/order-history">Order History</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/update-info">Update User Info</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link>
                      <Link to="/about">About</Link>
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Link>
                    <Link to="/logout">Logout</Link>
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="menu-logo">
                  <img src={trans8} alt="trans-8" />
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/quotes">Quote</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/login">login</Link>
                  </Nav.Link>
                </Nav.Item>

                {/* <Nav.Item>
							<Nav.Link>
								<Link to="/forgot-password">forgot Password</Link>
							</Nav.Link>
						</Nav.Item> */}
                {/* <Nav.Item>
                  <Nav.Link>
                    <Link to="/registration">Registration</Link>
                  </Nav.Link>
                </Nav.Item> */}
              </>
            )}
          </Nav>
        </Menu>
      </div>
    </>
  );
};

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const usertoken = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      user_detail(dispatch);
    }
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);
  return (
    <div
      className={
        window.location.pathname === "" || window.location.pathname === "/"
          ? `header-section trans-header ${scroll && `scroll`}`
          : `header-section innerpages-hdr`
      }
    >
      <div className="container">
        <div className="all-flex">
          <div className="truck">
            {(window.location.pathname === "" ||
              window.location.pathname === "/") && (
              <div className="hdr-info">
                <MailIcon className="icon2"></MailIcon>
                <span style={{ color: "white" }}>
                  <a href="mailto:Hello@trans8.com">Hello@trans8.com</a>
                </span>
              </div>
            )}
            <div className="phn-info">
              <PhoneIcon className="icon2"></PhoneIcon>
              {!(
                window.location.pathname === "" ||
                window.location.pathname === "/"
              ) && <img src={Shipping} height="25" />}
              <span
                className="number"
                style={{
                  color:
                    (window.location.pathname === "" ||
                      window.location.pathname === "/") &&
                    "white",
                }}
              >
                <a href="tel:5545454">9354831687</a>
              </span>
            </div>
          </div>
          <div className="brand-logo">
            <Link to="/">
              {" "}
              <img
                src={
                  window.location.pathname === "" ||
                  window.location.pathname === "/"
                    ? scroll
                      ? Logo
                      : Logo2
                    : Logo
                }
                height="30"
              />
            </Link>
          </div>
          <div className="burger-bar">
            {/* <BurgerMenu /> */}
            <SwipeableTemporaryDrawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
