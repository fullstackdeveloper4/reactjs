import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import trans8 from "../assets/hero-logo.png";
import { Nav } from "react-bootstrap";
import user from "../assets/place.png";
import { useSelector } from "react-redux";
export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });
  const selector = useSelector((state) => state.auth.userDetail);
  const usertoken = sessionStorage.getItem("token");
  const toggleDrawer = (anchor, open) => (event) => {
    sessionStorage.removeItem("last_route")
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <Nav className="justify-content-center website-width rightmenuside" activeKey="/">
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
                  marginBottom: "10px",
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
              {/* <Nav.Item>
                <Nav.Link>
                  <Link to="/order-history">Order History</Link>
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link>
                  <Link to="/update-info">Manage Account</Link>
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
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <>
          <div>
            <Button className="burgermenu-btn" onClick={toggleDrawer(anchor, true)}><span className="fulltop"><span className="bm-burger-bars"></span><span className="bm-burger-bars"></span><span className="bm-burger-bars"></span></span></Button>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </>
      ))}
    </div>
  );
}
