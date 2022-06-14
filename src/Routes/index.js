import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

import Registration from "../pages/Registration";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Logout from "../components/Logout";
import Quote from "../pages/Quote";
import MyOrder from "../pages/MyOrder";
import PaymentOptions from "../pages/PaymentOptions";
import About from "../pages/About";
import MainDashboard from "../pages/MainDashboard";
import TrackOrder from "../pages/TrackOrder";
import PaymentMethod from "../pages/PaymentMethod";
import ProtectedRoute  from "../layout/ProtectedRoute";
import PublicRoute  from "../layout/PublicRoute";
import  Dashboard  from "../pages/LandingPage";
import ViewOrderDetails from "../pages/ViewOrderDetails";
import Industries from "../pages/Industries";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import Contact from "../pages/Contact";
import Alert from "../pages/Alertify";
import CommonRoute from "../layout/CommonRoute";
import OrderHistory from "../pages/OrderHistory";
export default function Routes() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/" component={Dashboard} exact/>        
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PublicRoute path="/registration" component={Registration} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/reset-password" component={ResetPasswordPage} />

        <CommonRoute path="/quotes" component={Quote} exact/>
        <CommonRoute path="/alert" component={Alert} exact/>

        <ProtectedRoute path="/dashboard" component={MainDashboard} exact/>
        <ProtectedRoute path="/update-info" component={PaymentOptions} />
        <ProtectedRoute path="/quotes" component={Quote} />
        {/* <ProtectedRoute path="/my-order" component={MyOrder} /> */}
        <ProtectedRoute path="/about" component={About} />
        <ProtectedRoute path="/my-order" component={OrderHistory} />
        <ProtectedRoute path="/track-order" component={TrackOrder} />
        <ProtectedRoute path="/current-order" component={PaymentMethod} />
        <ProtectedRoute path="/order-details/:id" component={ViewOrderDetails} />
        <ProtectedRoute path="/industries" component={Industries} />
        <ProtectedRoute path="/contact" component={Contact} />
        <ProtectedRoute path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}
