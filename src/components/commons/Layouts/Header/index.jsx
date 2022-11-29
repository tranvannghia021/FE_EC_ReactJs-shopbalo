// @flow
import * as React from "react";
import { Navbar } from "react-bootstrap";
import "./style.css";
export default function Header(props) {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="#home">TRESOR</Navbar.Brand> */}
        <h5 className="font-weight-black text-white pb-2 ml-3 logo">TRESOR</h5>
        {/* <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Features</Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
        </Nav> */}
      </Navbar>
    </div>
  );
}
