import React, { Component } from "react";
import favicon from "../Images/favicon.ico";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src={favicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Ícone"
            />
            {" "}Brandi
          </a>
        </nav>
        <br></br>
      </div>
    );
  }
}

export default Header;
