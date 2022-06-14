import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutCustomer } from "../api/authApi";
import { setQuoteDetails } from "../redux/Actions/authAction";

const Logout = (props) => {
    const dispatch=useDispatch()
    useEffect(() => {
        logoutCustomer()
        dispatch(setQuoteDetails({}))
		props.history.push('/');
		// eslint-disable-next-line
	}, [])

    return (
        <>
        </>
    )
}

export default withRouter(Logout);
