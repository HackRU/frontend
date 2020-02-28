import React from "react";
import './styling.css'
import { Container } from "reactstrap";

const LandingPage = (props) => {
  console.log(props)
  return (
    <Container className="page-view">
      <div>
      <h1> LandingPage Component</h1>
      </div>
    </Container>
  );
};

export default LandingPage;
