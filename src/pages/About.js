import React from "react";
import { Button, Jumbotron } from "react-bootstrap";

const About = (props) => {
	return (
		
		<Jumbotron className="text-center no-background-color">
			<h1>About Page</h1>
			<p>
				This is a simple hero unit, a simple jumbotron-style component for calling
				extra attention to featured content or information.
			</p>
			<p>
				<Button variant="primary">Learn more</Button>
			</p>
		</Jumbotron>
		
	)
}

export default About;
