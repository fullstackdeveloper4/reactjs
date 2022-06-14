import React from "react";
import { Row } from "react-bootstrap";
import './../styles/home.css';

const HeroBanner = (props) => {
	let { label = "View your order details" } = props;
	if (window.location.pathname === "" || window.location.pathname === "/") {
		label = (<>
			<h1>The <b>final</b> mile  Gets the <b>smile</b></h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor<br /> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis<br /> nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br /> Duis aute irure dolor in reprehenderit.</p>
		</>
		)
	}
	else if( window.location.pathname === "/quotes"){
		label = 'Calculate shipping rates'

	}
	else if( window.location.pathname === "/my-order"){
		label = 'Check your order details'

	}
	else if( window.location.pathname === "/order-history"){
		label = 'Check your order history details'

	}
	else if( window.location.pathname === "/track-order"){
		label = 'Track your shipment details'

	}
	else if( window.location.pathname === "/update-info"){
		label = 'Update your account details'

	}
	else if( window.location.pathname === "/registration"){
		label = 'Register your account'

	}
	else if( window.location.pathname === "/login"){
		label = 'Login to your account'

	}
	else if( window.location.pathname === "/about"){
		label = 'Details about your trans8'

	}
	else if( window.location.pathname === "/contact"){
		label = 'Contact  our trans8 executive'

	}
	else if( window.location.pathname === "/industries"){
		label = 'Contact  our trans8 executive'

	}
	else if( window.location.pathname === "/forgot-password"){
		label = 'Forgot password'

	}
	else if(window.location.pathname.split("/")[1]==="reset-password"){
		label = 'Reset password'
	}

	return (
		<div className={(window.location.pathname === "" || window.location.pathname === "/") ? `logged-in-honme-container` : `home-container`}>
			<div className="container">
			<div className="banner-aligmnent">
				{label}
			</div>
			</div>
		</div>
	)
}

export default HeroBanner;
