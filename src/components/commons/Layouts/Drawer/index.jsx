import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

import "./style.css";

export default function Drawer(props) {
  const { slot } = props;

  return (
    <aside id="drawer" className="drawer">
      <Container className="py-3">
        <div>{slot}</div>
      </Container>
    </aside>
  );
}

Drawer.propTypes = {
  slot: PropTypes.element.isRequired,
};
